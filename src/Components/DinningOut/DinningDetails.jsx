import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ZomatoNav } from '../Navbar/ZomatoNav';
// import "./A.Details.css"
import { Footer } from '../Footer/Footer';

export const DinningDetails = () => {
  const { id } = useParams();
  const [DinningData, setDinningData] = useState({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const GetDinningData = () => {
    axios
      .get(`https://zomato-api-486r.onrender.com/restaurants/${id}`)
      .then((res) => setDinningData(res.data));
  };
  useEffect(() => {
    GetDinningData();
  }, [GetDinningData]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  //console.log(DinningData)

  return (
    <>
      <ZomatoNav />

      <div className="FoodDetails">
        <div>
          <img alt="" src={DinningData.imgUrl} />
        </div>

        <div id="FlexBoxis">
          <h1>{DinningData.name}</h1>
          <span> Rs . {DinningData.price}</span>
        </div>

        <p>{DinningData.variety}</p>

        <div id="keyPair">
          <span>Location : </span>
          <p>{DinningData.place}</p>
        </div>

        <div id="keyPair">
          <span>Rating : </span>
          <p>{DinningData.rating}</p>
        </div>
      </div>

      <div className="footerDiv">
        <Footer />
      </div>
    </>
  );
};
