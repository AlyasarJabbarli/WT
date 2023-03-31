import { Link, NavLink } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import "./style.css";
import { useNavigate  } from 'react-router-dom';


const Header = () => {
  const [products, setproducts] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const navigate = useNavigate();


  const handleSearchValueChange = (event) => {
    setsearchValue(event.target.value);
  };
  useEffect(() => {
    const getBrand = async () => {
      if (searchValue != "") {
        try {
          const response = await axios.get(
            `http://ec2-18-183-121-110.ap-northeast-1.compute.amazonaws.com:9999/products/searchByDescription?search=${searchValue}`
          );
          setproducts(response.data);
          console.log(products);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getBrand();
  }, []);
  const handleWishlistClick = () => {
    if(localStorage.getItem('customerId')){
      navigate('/wishlist');
    }else{
      navigate('/sign');
    }
  }
  console.log(products);
  return (
    <header>
      <div className="header_top">
        <div className="container">
          <div className="header_top_all">
            <div className="header_top_left">
              <NavLink to="/">
                <p>
                   N&M
                </p>
              </NavLink>
            </div>
            <div className="header_top_right">
              <NavLink>Korporativ satışlar</NavLink>
              <NavLink>Mağazalarımız</NavLink>
              <NavLink>Bloq</NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="header_bottom">
        <div className="container">
          <div className="header_bottom_all">
            <div className="header_bottom_left">
              <div className="categories">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 28 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.833 11.359H1.167c-.642 0-1.167-.394-1.167-.875 0-.482.525-.875 1.167-.875h25.666c.642 0 1.167.393 1.167.875 0 .48-.525.875-1.167.875zM26.833 4.648H1.167C.525 4.648 0 4.255 0 3.773c0-.48.525-.875 1.167-.875h25.666c.642 0 1.167.394 1.167.875 0 .482-.525.875-1.167.875zM26.833 18.063H1.167C.525 18.063 0 17.67 0 17.188c0-.481.525-.875 1.167-.875h25.666c.642 0 1.167.394 1.167.875 0 .482-.525.875-1.167.875z"
                    fill="#fff"
                  ></path>
                </svg>
                <p>Kateqoriyalar</p>
                <div className="navbar_header">
                  <Navbar />
                </div>
              </div>
              <div className="search">
                <input
                  type="text"
                  placeholder="Məhsul axtar..."
                  onChange={handleSearchValueChange}
                />
                <button>
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M23.478 4c10.74 0 19.476 8.736 19.476 19.476 0 5.067-1.945 9.689-5.127 13.157l6.261 6.248c.586.586.588 1.534.002 2.12a1.501 1.501 0 0 1-2.122.004l-6.337-6.319a19.381 19.381 0 0 1-12.153 4.268C12.738 42.954 4 34.216 4 23.476 4 12.736 12.738 4 23.478 4zm0 3C14.392 7 7 14.39 7 23.476c0 9.086 7.392 16.478 16.478 16.478 9.084 0 16.476-7.392 16.476-16.478C39.954 14.39 32.562 7 23.478 7z"
                      fill="#ADADAD"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="header_bottom_right">
              <div className="header_bottom_icons">
                <div className="header_bottom_icon_user">
                  <NavLink to="/sign" replace>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#fff"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.84 18.193c0 3.296-4.52 3.677-7.92 3.677h-.242C9.512 21.864 4 21.728 4 18.173c0-3.229 4.338-3.66 7.711-3.677h.453c2.165.005 7.676.142 7.676 3.697zm-7.92-2.197c-4.26 0-6.42.732-6.42 2.177 0 1.458 2.16 2.197 6.42 2.197s6.42-.732 6.42-2.177c0-1.458-2.16-2.197-6.42-2.197zM11.92 2a5.315 5.315 0 0 1 5.31 5.31 5.314 5.314 0 0 1-5.31 5.308h-.031a5.3 5.3 0 0 1-5.28-5.311A5.316 5.316 0 0 1 11.922 2zm0 1.428A3.887 3.887 0 0 0 8.039 7.31a3.873 3.873 0 0 0 3.854 3.881l.029.714v-.713A3.886 3.886 0 0 0 15.8 7.31a3.886 3.886 0 0 0-3.88-3.882z"
                        fill="#fff"
                      ></path>
                    </svg>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 14 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 11.645c3.616 0 6.667.587 6.667 2.854 0 2.268-3.071 2.834-6.667 2.834-3.615 0-6.667-.587-6.667-2.854 0-2.268 3.072-2.834 6.667-2.834zM7 .667a4.394 4.394 0 0 1 4.412 4.409A4.395 4.395 0 0 1 7 9.486a4.396 4.396 0 0 1-4.412-4.41A4.395 4.395 0 0 1 7 .666z"
                        fill="#fff"
                      ></path>
                    </svg>
                  </NavLink>
                  <div className="login_register_div">
                    <p>Daha yaxşı təkliflər üçün hesabınıza giriş edin.</p>
                    <NavLink>Giriş</NavLink>
                    <NavLink>Qeydiyyat</NavLink>
                  </div>
                </div>

                <div onClick={handleWishlistClick}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.235 4.04c1.626-1.029 3.786-1.313 5.652-.715 4.059 1.31 5.319 5.734 4.192 9.255-1.74 5.53-9.166 9.655-9.481 9.828a.743.743 0 0 1-.72.002c-.312-.17-7.685-4.235-9.482-9.829h-.001c-1.128-3.523.128-7.949 4.183-9.256a6.729 6.729 0 0 1 5.657.714zm-5.197.713c-3.281 1.058-4.105 4.587-3.214 7.37 1.402 4.362 6.94 7.89 8.413 8.762 1.477-.882 7.056-4.448 8.413-8.758.89-2.786.064-6.315-3.222-7.374-1.592-.51-3.45-.2-4.731.792a.75.75 0 0 1-.91.006 5.234 5.234 0 0 0-4.75-.798z"
                      fill="#fff"
                    ></path>
                  </svg>
                </div>
                <NavLink to="/bucket">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.058 26.602c.952 0 1.727.774 1.727 1.726s-.775 1.726-1.727 1.726a1.726 1.726 0 0 1 0-3.452zm15.04 0c.954 0 1.729.774 1.729 1.726a1.728 1.728 0 0 1-3.453 0c0-.952.773-1.726 1.725-1.726zM4.358 4.012l2.773.48c.447.08.787.45.826.903l.313 3.735h1.729l2.14.002h.505l2.362.001h.44l1.655.002H18.944l.34.001 1.27.001h.295l.834.001h.262l.966.002h.222l.816.001h.186l.518.001h.16l.578.002h.484l.108.001.381.001h.084l.223.002h.067l.226.001h.048l.123.001h.035l.089.002h.024l.06.001h.017l.038.001h.01l.027.002h.005l.017.002a2.777 2.777 0 0 1 1.841 1.093c.446.596.632 1.33.526 2.067l-1.266 8.744a3.416 3.416 0 0 1-3.364 2.918H10.633a3.415 3.415 0 0 1-3.385-3.123L6.026 6.33l-2.009-.346a1.002 1.002 0 0 1-.816-1.158c.096-.545.623-.9 1.156-.814zm4.81 7.118h-.73l.804 9.562a1.39 1.39 0 0 0 1.395 1.288h14.556c.694 0 1.288-.517 1.386-1.204l1.267-8.745a.783.783 0 0 0-.15-.584.774.774 0 0 0-.517-.308l-.068.001-.145.001h-.1l-.755.002h-2.278l-2.027-.002h-.368l-1.147-.001h-.395l-1.214-.001h-.414l-.837-.002h-.422l-1.277-.001h-.427l-.854-.001h-.426l-.847-.002h-1.661l-.405-.001-1.568-.001h-.376zm13.883 2.928a1 1 0 0 1 0 2h-3.696a1 1 0 1 1 0-2h3.696z"
                      fill="#fff"
                    ></path>
                  </svg>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
