import { useEffect, useState } from 'react';
import './Cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

export const CartPage = ({ foodData }) => {
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [remove, setRemove] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const addFoodData = () => {
      delete foodData.id;
      let data = { ...foodData, quantity: 1 };
      //console.log(data)

      axios
        .post('https://zomato-api-486r.onrender.com/cart', data)
        .then(() => getCartData());
    };
    //console.log(cartData)

    //----------------------------------- Get Food Data -----------------------------------------------------
    addFoodData();
  }, [foodData]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const totalPrice = () => {
    let totalSum = 0;

    // eslint-disable-next-line array-callback-return
    cartData.map((el) => {
      totalSum += el.quantity * el.price;
    });
    setTotal(totalSum);
  };
  useEffect(() => {
    totalPrice();
  }, [quantity, remove, totalPrice]);

  //---------------------------------- Post Food Data -----------------------------------------------------

  const getCartData = () => {
    axios
      .get('https://zomato-api-486r.onrender.com/cart')
      .then((res) => setCartData(res.data));
  };

  //----------------------------------- Delete Food Data ---------------------------------------------------

  const cartDelete = (id) => {
    setRemove(!remove);
    axios
      .delete(`https://zomato-api-486r.onrender.com/cart/${id}`)
      .then(() => getCartData());
  };

  //----------------------------------- Update Food Data ---------------------------------------------------

  const incrementCounter = (id, el) => {
    let quantity = el.quantity + 1;
    setQuantity(quantity);

    let data = {
      ...el,
      quantity: quantity,
    };
    axios
      .put(`https://zomato-api-486r.onrender.com/cart/${id}`, data)
      .then(() => getCartData());
  };

  const decrementCounter = (id, el) => {
    let quantity = el.quantity - 1;
    setQuantity(quantity);

    let data = {
      quantity: quantity,
    };
    axios
      .patch(`https://zomato-api-486r.onrender.com/cart/${id}`, data)
      .then(() => getCartData());
  };

  const finalAmount = () => {
    localStorage.setItem('total', JSON.stringify(total));
    navigate('/payment');
  };

  return (
    <>
      {cartData.map((el) => (
        <div className="cartBox">
          <img src={el.imgUrl} alt="food" />
          <p>{el.name}</p>

          <div>
            <button
              disabled={el.quantity === 1}
              onClick={() => decrementCounter(el.id, el)}
            >
              -
            </button>
            <h1>{el.quantity}</h1>
            <button onClick={() => incrementCounter(el.id, el)}>+</button>
          </div>

          <p>Rs.{el.price * el.quantity} /-</p>

          <button onClick={() => cartDelete(el.id)}>Remove</button>
        </div>
      ))}

      <hr />

      <div className="totalDiv">
        <p>Total -</p>
        <p>Rs.{total} /-</p>
        <button onClick={finalAmount}>Buy Now</button>
      </div>
    </>
  );
};
