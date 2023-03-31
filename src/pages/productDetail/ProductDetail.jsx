import "./style.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [productAll, setProductAll] = useState(null);
  const [mainPhoto, setMainPhoto] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`http://ec2-18-183-121-110.ap-northeast-1.compute.amazonaws.com:9999/products/${id}`);

        setProductAll(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
    if(product == null){
      setProduct(productAll?.products[0]);
    }

  }, [id, productAll]);

  useEffect(() => {
    setMainPhoto(product?.photos[0]?.link);
  },[product])

  function handleClick(link) {
    setMainPhoto(link);
  }

  const handleColorClick = (id) => {
    let prod = productAll.products.filter(pr => pr.id === id)
    setProduct(prod[0])
  }

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
  // console.log(productAll);
  // console.log(product?.photos);
  console.log(product);
  return (
    <main>
      <div className="container">
        <div className="productDetail_breadCrump">
          <ul>
            <li>Ana Səhifə</li>
            <li>{productAll?.sub_categories?.name}</li>
            <li>{productAll?.brand?.brandName}</li>
            <li>{productAll?.productName}</li>
          </ul>
        </div>
        <div className="productDetail_title">
          <h1>{productAll?.productName}({product?.code})</h1>
        </div>
        <div className="productDetail_all">
          <div className="productDetail_info">
            <div className="productDetail_info_top">
              <div className="productDetail_info_top_left">
                <div className="product_photos">
                  {product?.photos?.map((obj, index) => {
                    return (
                      <div
                        className="product_photo_div"
                        key={index}
                        onClick={() => handleClick(obj?.link)}
                      >
                        <img src={obj?.link} alt="" />
                      </div>
                    );
                  })}
                </div>
                <div className="product_selected_photo">
                  <img src={mainPhoto} alt="" />
                </div>
              </div>
              <div className="productDetail_info_top_right">
                <div className="productDetail_info_top_right_top">
                  <p>
                    {product?.stockNumber > 1
                      ? "Stokda var"
                      : "Stokda Yoxdur"}
                  </p>
                  <p>Pulsuz çatdırılma</p>
                </div>
                <div className="productDetail_info_top_right_center">
                  <div className="description">
                    <h2>Məhsul Haqqında</h2>
                    <p>{product?.description}</p>
                  </div>
                  <div className="colors">
                    <h2>Rəng</h2>
                    <div className="all_colors">
                      {
                        productAll?.products.map((pr, index) => {
                          return(
                          <p className="color" key={index} onClick={() => handleColorClick(pr?.id)}>{pr.color.colorName}</p>
                          )
                        })
                       }
                    </div>
                  </div>
                  <div className="storages">
                    <h2>Ölçü</h2>
                    <div className="all_colors">
                      {
                        product?.productSizes.map((size, index) => {
                          return (
                            <div className="storage" key={index}>
                              <span>{size.size.sizeName}</span>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>
                <div className="productDetail_info_top_right_bottom">
                  <button className="order_whatsapp">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.653 7.607a6.67 6.67 0 0 0-7.786-6.18c-2.787.46-5.02 2.72-5.454 5.506a6.678 6.678 0 0 0 .807 4.4l-.593 2.207c-.134.5.326.953.82.813l2.173-.6c.987.58 2.14.914 3.373.914 3.76 0 6.88-3.314 6.66-7.06zm-3.4 2.873a1.518 1.518 0 0 1-.773.733c-.2.087-.42.127-.653.127-.34 0-.707-.08-1.087-.247a6.11 6.11 0 0 1-1.147-.66A9.632 9.632 0 0 1 6.5 9.5a9.533 9.533 0 0 1-.933-1.093 5.864 5.864 0 0 1-.654-1.14c-.16-.38-.24-.747-.24-1.094 0-.226.04-.446.12-.646.08-.207.207-.394.387-.56.213-.214.447-.314.693-.314.094 0 .187.02.274.06.086.04.166.1.226.187l.774 1.093c.06.087.106.16.133.234.033.073.047.14.047.206 0 .08-.027.16-.074.24-.046.08-.106.16-.186.24l-.254.267a.171.171 0 0 0-.053.133c0 .027.007.054.013.08a.46.46 0 0 1 .027.067c.06.113.167.253.313.427.154.173.314.353.487.526.18.18.353.34.533.494.174.146.32.246.434.306.02.007.04.02.06.027a.183.183 0 0 0 .086.013c.06 0 .1-.02.14-.06l.254-.253c.086-.087.166-.147.24-.187a.46.46 0 0 1 .446-.026c.074.033.154.073.234.133l1.106.787c.087.06.147.133.187.213a.698.698 0 0 1 .053.26c-.04.113-.066.24-.12.36z"
                        fill="#8DC63F"
                      ></path>
                    </svg>
                    Whatsapp ilə sifariş
                  </button>
                  <button className="add_to_cart" onClick={() => handleAddToBasket(productAll)}>
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
                    Səbətə Əlavə Et
                  </button>
                  <div className="add_to_favorite">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.44 3.1c-1.81 0-3.43.88-4.44 2.23A5.549 5.549 0 0 0 7.56 3.1C4.49 3.1 2 5.6 2 8.69c0 1.19.19 2.29.52 3.31 1.58 5 6.45 7.99 8.86 8.81.34.12.9.12 1.24 0 2.41-.82 7.28-3.81 8.86-8.81.33-1.02.52-2.12.52-3.31 0-3.09-2.49-5.59-5.56-5.59z"
                        fill="#DADADA"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product_detail_price">
            <div className="product_price_right">
              <div className="price_button_div">
                <div className="price_div">
                  <p>
                    {product?.price}
                    <svg
                      width="27.89px"
                      height="19.93px"
                      viewBox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.422 2.88C16.272 3.636 20 8.2 20 13.716c0 .783-.076 1.547-.219 2.284h-2.714c.195-.724.3-1.49.3-2.284 0-3.921-2.557-7.188-5.945-7.913v7.612l-2.697 1.484V5.773c-3.46.66-6.093 3.966-6.093 7.943 0 .794.105 1.56.3 2.284H.22A12 12 0 0 1 0 13.716C0 8.143 3.805 3.543 8.726 2.858V1.483L11.422 0v2.88z"
                        fill="#000"
                      ></path>
                    </svg>
                  </p>
                </div>
                <div className="button">
                  <button className="btn">Indi Al</button>
                </div>
              </div>
              <div className="buy_now_div">
                <button className="clickToOpen">
                  <svg
                    width="14"
                    height="23"
                    viewBox="0 0 14 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.152 0C5.62 0 5.19.43 5.19.961v.958a.961.961 0 1 0 1.923 0V.96c0-.53-.43-.961-.961-.961zM6.13 9.136c.345-.009.668.123.91.372.24.244.37.572.37.922l-.006 2.507.004-.006a1.29 1.29 0 0 1 .913-.417c.345-.009.668.123.911.372.109.111.194.24.255.38a1.29 1.29 0 0 1 1.033-.567c.345-.008.668.124.911.372.239.245.37.572.37.922l-.001.079.004-.005a1.29 1.29 0 0 1 .913-.418c.708-.018 1.282.563 1.28 1.295l-.007 2.985a5.133 5.133 0 0 1-1.028 3.07c-.865 1.154-2.199 1.914-3.69 1.951a4.43 4.43 0 0 1-2.705-.831l-4.466-3.163c-.57-.404-.708-1.225-.308-1.83.201-.303.502-.506.85-.574.336-.065.673.007.949.202l1.233.873.018-7.133c0-.35.133-.684.374-.94a1.29 1.29 0 0 1 .913-.418zm2.676-7.467a.962.962 0 0 1 1.36 0 .959.959 0 0 1 0 1.357l-.68.68a.962.962 0 0 1-1.36 0 .959.959 0 0 1 0-1.358l.68-.68zm3.441 3.073a.961.961 0 0 0-1.231-.574l-.905.329a.96.96 0 1 0 .657 1.804l.906-.329a.96.96 0 0 0 .573-1.23zM.632 5.972a.96.96 0 1 1 .657-1.803l.906.329a.96.96 0 1 1-.658 1.804l-.905-.33zM2.13 1.67a.959.959 0 0 0 0 1.357l.68.68a.962.962 0 0 0 1.36 0 .959.959 0 0 0 0-1.358l-.68-.68a.962.962 0 0 0-1.36 0z"
                      fill="#000"
                    ></path>
                  </svg>
                  Bir kliklə al
                </button>
                <form action="">
                  <div className="phone_div">
                    <p>+994</p>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      required
                    />
                  </div>
                  <div className="line"></div>
                  <button className="btn">Təsdiq et</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
