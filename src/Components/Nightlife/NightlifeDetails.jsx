import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ZomatoNav } from '../Navbar/ZomatoNav';
// import "./A.Details.css"
import { Footer } from '../Footer/Footer';

export const NightDetails = () => {
  const { id } = useParams();
  const [NightData, setNightData] = useState({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const GetNightData = () => {
    axios
      .get(`https://zomato-api-486r.onrender.com/restaurants/${id}`)
      .then((res) => setNightData(res.data));
  };
  useEffect(() => {
    GetNightData();
  }, [GetNightData]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  console.log(id);

  return (
    <>
      <ZomatoNav />

      <div className="FoodDetails">
        <div>
          <img alt="" src={NightData.imgUrl} />
        </div>

        <div id="FlexBoxis">
          <h1>{NightData.name}</h1>
          <span> Rs . {NightData.price}</span>
        </div>

        <p>{NightData.variety}</p>

        <div id="keyPair">
          <span>Location : </span>
          <p>{NightData.place}</p>
        </div>

        <div id="keyPair">
          <span>Rating : </span>
          <p>{NightData.rating}</p>
        </div>
      </div>

      <div className="footerDiv">
        <Footer />
      </div>
    </>
  );
};
