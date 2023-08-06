import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ZomatoNav } from '../Navbar/ZomatoNav';
import './A.Details.css';
import { Footer } from '../Footer/Footer';
import { CartPage } from '../CartPage/CartPage';

export const ShakeDetails = () => {
  const { id } = useParams();
  const [shakeData, setShakeData] = useState({});

  const [isCheck, setIsCheck] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const GetShakeData = () => {
    axios
      .get(`https://zomato-api-486r.onrender.com/shake/${id}`)
      .then((res) => setShakeData(res.data));
  };
  //console.log(shakeData)
  useEffect(() => {
    GetShakeData();
  }, [GetShakeData]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <ZomatoNav />

      {!isCheck ? (
        <div className="FoodDetails">
          <div>
            <img alt="" src={shakeData.imgUrl} />
          </div>

          <div id="FlexBoxis">
            <h1>{shakeData.name}</h1>
            <span> Rs . {shakeData.price} /-</span>
          </div>

          <p>{shakeData.variety}</p>

          <div id="keyPair">
            <span>Location : </span>
            <p>{shakeData.place}</p>
          </div>

          <div id="keyPair">
            <span>Rating : </span>
            <p>{shakeData.rating}</p>
          </div>

          <button onClick={() => setIsCheck(true)} id="cartBtn">
            ADD TO CART
          </button>
        </div>
      ) : (
        <CartPage foodData={shakeData} />
      )}

      <div className="footerDiv">
        <Footer />
      </div>
    </>
  );
};
