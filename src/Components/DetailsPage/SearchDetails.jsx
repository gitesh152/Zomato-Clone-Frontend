import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ZomatoNav } from '../Navbar/ZomatoNav';
import './A.Details.css';
import { Footer } from '../Footer/Footer';

export const SearchDetails = () => {
  const { id } = useParams();
  const [searchData, setSearchData] = useState({});
  useEffect(() => {
    const GetSearchData = () => {
      axios
        .get(`https://zomato-api-486r.onrender.com/global/${id}`)
        .then((res) => setSearchData(res.data));
    };
    //console.log(searchData)
    GetSearchData();
  }, [id]);

  return (
    <>
      <ZomatoNav />

      <div className="FoodDetails">
        <div>
          <img alt="" src={searchData.imgUrl} />
        </div>

        <div id="FlexBoxis">
          <h1>{searchData.name}</h1>
          <span> Rs . {searchData.price} /-</span>
        </div>

        <p>{searchData.variety}</p>

        <div id="keyPair">
          <span>Location : </span>
          <p>{searchData.place}</p>
        </div>

        <div id="keyPair">
          <span>Rating : </span>
          <p>{searchData.rating}</p>
        </div>

        <button id="cartBtn">ADD TO CART</button>
      </div>

      <div className="footerDiv">
        <Footer />
      </div>
    </>
  );
};
