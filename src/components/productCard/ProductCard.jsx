import "./style.css";
import { useState, useEffect } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import axios from "axios";


const ProductCard = ({ product }) => {
  const [display, setDisplay] = useState("none");
  const [basketItems, setBasketItems] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  let customer = null
  let perProduct = null
  let size = {"sizeName" : "XL"}
  let count = 1



  const Wishlist = async (product, productId) => {
    if(localStorage.getItem('customerId')){
      try {
        const response = await axios.post(
          `http://ec2-18-183-121-110.ap-northeast-1.compute.amazonaws.com:9999/wishlist/add-to-wishlist/${localStorage.getItem('customerId')}/${product.products[0].id}`, 
          {customer, perProduct, size , count}
        );
      } catch (error) {
        console.log(error);
      }
    }else{
      navigate('/sign');
    }   
  };
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          "http://ec2-18-183-121-110.ap-northeast-1.compute.amazonaws.com:9999/products"
        )
        .then((response) => setData(response.data))
        .catch((error) => console.log(error));
    }

    fetchData();
  }, []);

  useEffect(() => {
    const storedBasketItems = JSON.parse(localStorage.getItem("basketItems"));
    if (storedBasketItems) {
      setBasketItems(storedBasketItems);
    }
  }, []);

  const handleClick = (product, id) => {
    if (display == "block") {
      setDisplay("none");
    } else {
      setDisplay("block");
    }
    Wishlist(product, id)
  };

  // const basket = basketItems
  
  // const handleAddToBasket = (product) => {
  //   const checkBasket = basketItems?.find(basketItem => basketItem.id == product.id)
  //   const checkBasketIndex = basketItems?.findIndex(basketItem => basketItem.id == product.id)
  //   console.log(basketItems);
  //   if(checkBasket){
  //     checkBasket.count +=1
  //     basket.splice(checkBasketIndex, 1, checkBasket)
  //     setBasketItems(basket)
  //   }else{
  //     const newItem = { ...product, count: 1 }
  //     setBasketItems([...basketItems, newItem])
  //   }
  //   localStorage.setItem("basketItems", JSON.stringify(basket))
  // };

  const handleAddToBasket = (product) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    // проверяем, есть ли уже элемент в корзине
    const itemInCart = currentCart.find((item) => item.id === product.id);
    if (itemInCart) {
      // если элемент уже есть в корзине, увеличиваем его количество на 1
      itemInCart.quantity++;
    } else {
      // если элемента еще нет в корзине, добавляем его со значением quantity = 1
      currentCart.push({ ...product,  quantity: 1 });
    }
    // сохраняем изменения в LocalStorage
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }
  return (
    <div className="card">
      <div className="card_img">
        <button className="favorite" onClick={() => handleClick(product ,product.id)}>
          <svg
            width="20"
            style={{ display: display === "none" ? "block" : "none" }}
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.4 4.89l.6.804.6-.803a3.874 3.874 0 0 1 3.1-1.558c2.14 0 3.883 1.744 3.883 3.909 0 .91-.145 1.749-.397 2.527l-.001.005c-.605 1.913-1.848 3.467-3.206 4.634-1.361 1.17-2.795 1.914-3.704 2.224l-.008.002a.921.921 0 0 1-.267.033.921.921 0 0 1-.267-.033l-.008-.002c-.909-.31-2.343-1.054-3.704-2.224-1.358-1.167-2.601-2.72-3.206-4.634l-.001-.005a8.149 8.149 0 0 1-.397-2.527c0-2.165 1.742-3.909 3.883-3.909 1.26 0 2.393.613 3.1 1.558z"
              stroke="#DADADA"
              strokeWidth="1.5"
            ></path>
          </svg>
          <svg
            width="20"
            style={{ display: display }}
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.4 4.891l.6.803.6-.803a3.874 3.874 0 0 1 3.1-1.558c2.14 0 3.883 1.744 3.883 3.909 0 .91-.145 1.749-.397 2.527l-.001.005c-.605 1.913-1.848 3.467-3.206 4.634-1.361 1.17-2.795 1.914-3.704 2.224l-.008.002a.925.925 0 0 1-.267.033.925.925 0 0 1-.267-.033l-.008-.002c-.909-.31-2.343-1.054-3.704-2.224-1.358-1.167-2.601-2.72-3.206-4.634l-.001-.005a8.149 8.149 0 0 1-.397-2.527c0-2.165 1.742-3.909 3.883-3.909 1.26 0 2.393.613 3.1 1.558z"
              fill="#E34F4F"
              stroke="#E34F4F"
              strokeWidth="1.5"
            ></path>
            <path
              d="M13.777 5c.965.259 2.742 1.356 2.12 3.674"
              stroke="#fff"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
        <NavLink to={`/productDetail/${product.id}`}>
          <img src={product.products[0].photos[0].link} alt="" />
        </NavLink>
      </div>
      <div className="card_text">
        <div className="card_category">
          <svg
            width="4"
            height="4"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ADADAD"
          >
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <p>{product.sub_categories.name}</p>
        </div>
        <h3>{product.productName}</h3>

        <div className="prices">
          <div className="price">
            <p>
              {product.products[0].price}
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.422 2.88C16.272 3.636 20 8.2 20 13.716c0 .783-.076 1.547-.219 2.284h-2.714c.195-.724.3-1.49.3-2.284 0-3.921-2.557-7.188-5.945-7.913v7.612l-2.697 1.484V5.773c-3.46.66-6.093 3.966-6.093 7.943 0 .794.105 1.56.3 2.284H.22A12 12 0 0 1 0 13.716C0 8.143 3.805 3.543 8.726 2.858V1.483L11.422 0v2.88z"
                  fill="#8DC63F"
                ></path>
              </svg>
            </p>
          </div>
          {/* <div className="price_with_discount">
            <p>12 ay</p>
            <p>
              {(product.products[0].price / 12).toFixed(2)}
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="#9F82F2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.996 1.8c3.396.472 5.304 3.324 5.304 6.773 0 .49-.053.967-.153 1.427h-1.901c.137-.452.21-.931.21-1.427 0-2.451-1.087-4.493-3.46-4.946v4.757l-1.889.928V3.608c-2.424.413-3.564 2.479-3.564 4.965 0 .496.074.974.21 1.427h-1.9A6.72 6.72 0 0 1 .7 8.573c0-3.484 1.961-6.359 5.408-6.787V.927L7.996 0v1.8z"
                ></path>
              </svg>
            </p>
          </div> */}
        </div>
        <div className="buy_buttons">
          <button className="btn">Indi Al</button>
          <button onClick={() => handleAddToBasket(product)}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.667 1.667h1.45c.9 0 1.608.774 1.533 1.666l-.692 8.3a2.33 2.33 0 0 0 2.325 2.525h8.875c1.2 0 2.25-.983 2.342-2.175l.45-6.25c.1-1.383-.95-2.508-2.342-2.508H4.85"
                fill="#8DC63F"
              ></path>
              <path
                d="M1.667 1.667h1.45c.9 0 1.608.774 1.533 1.666l-.692 8.3a2.33 2.33 0 0 0 2.325 2.525h8.875c1.2 0 2.25-.983 2.342-2.175l.45-6.25c.1-1.383-.95-2.508-2.342-2.508H4.85M13.542 18.333a1.042 1.042 0 1 0 0-2.083 1.042 1.042 0 0 0 0 2.083zM6.875 18.333a1.042 1.042 0 1 0 0-2.083 1.042 1.042 0 0 0 0 2.083z"
                stroke="#8DC63F"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M7.5 6.667h10"
                stroke="#fff"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
