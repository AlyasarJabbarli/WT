import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [data, setData] = useState([]);
  const [products , setProducts] = useState([])
  let customer = null;
  let perProduct = null;
  let size = { sizeName: "XL" };
  let count = 1;

  const customerId = localStorage.getItem("customerId");
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
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://ec2-18-183-121-110.ap-northeast-1.compute.amazonaws.com:9999/wishlist/${customerId}`
        );
        setWishlist(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [customerId]);

//   useEffect(() => {
//     const Wishlist = async (product) => {
//       try {
//         const response = await axios.post(
//           `http://ec2-18-183-121-110.ap-northeast-1.compute.amazonaws.com:9999/wishlist/add-to-wishlist/${customerId}/${product.products[0].id}`,
//           { customer, perProduct, size, count }
//         );
//       } catch (error) {
//         console.log(error);
//       }
//     };
//   });

    
    let prods = []
    wishlist.map(prod => {
        prods.push(data.filter(prod=> prod.products.filter(pr => pr.id == prod.id)))
    })

    useEffect(()=>{
        setProducts(prods)
    }, [data, wishlist])
 
  const handleRemoveFromBasket = (item) => {
    Wishlist(item);
  };

  console.log(products);
//   console.log(data);
//   console.log(prods);

  return (
    <section>
      <div className="container">
        <div className="basket-name">
          <h2>Sevimlilər</h2>
        </div>
        <div className="basket-home">
          <div className="basket-all-left col-lg-9">
            {products.map((basketItem, index) => {
              return (
                <div className="basket-body" key={index}>
                  <div className="basket-product">
                    <div
                      className="delete-product"
                      onClick={() => handleRemoveFromBasket(basketItem)}
                    >
                      X
                    </div>
                    <NavLink to={`/productDetail/${basketItem.id}`} replace>
                      {/* <img src={basketItem?.products[0]?.photos[0]?.link} alt="" /> */}
                    </NavLink>
                    <div className="basket-product-info">
                      <div className="info-name">
                        <p>{basketItem.productName}</p>
                      </div>
                      <div className="info-price">
                        <span>
                          {/* {basketItem?.products[0].price} */}
                          <img src="./assets/img/manatgreen.svg" alt="" />
                        </span>
                      </div>
                      <div className="info-total">
                        <div className="it-right">
                          <p>
                            Cəmi:{" "}
                            {/* {basketItem.count * basketItem.products[0].price} */}
                            <img src="./assets/img/manatgreen.svg" alt="" />
                          </p>
                        </div>
                      </div>
                      <div className="info-bottom">
                        <div className="ib-left">
                          {/* {basketItem.products[0].color.colorName ==
                          null ? null : (
                            <div className="ibl-color">
                              <p>Reng</p>
                              <div className="card-color">
                                {basketItem.products[0].color.colorName}
                              </div>
                            </div>
                          )} */}

                          <div className="ibl-memory">
                            <p>Ölçü</p>
                            <p>
                              {" "}
                              {/* {
                                basketItem.products[0].productSizes[0].size
                                  .sizeName
                              } */}
                            </p>
                          </div>
                        </div>
                        <div className="ib-right number">
                          <span className="ibr-minus">-</span>
                          <input
                            className="ibr-count"
                            type="ibr-text"
                            // value={basketItem.quantity}
                          />
                          <span className="ibr-plus">+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="basket-price col-lg-2 col-lg-3">
            <h3>Mehsullar</h3>
            <div className="total-price-br">
              <div className="tpbr-left">
                <p>Toplam qiymet:</p>
              </div>
              <div className="tbr-right">
                <p>
                  {/* {
                      totalPrice
                     }  */}
                  <img src="./assets/img/manatgreen.svg" alt="" />
                </p>
              </div>
            </div>
            {/* <div className="total-endirim-br">
                <div className="tpbr-left">
                  <p>Toplam qiymet:</p>
                </div>
                <div className="tbr-right">
                  <p>
                    0 <img src="./assets/img/manatgreen.svg" alt="" />
                  </p>
                </div>
              </div> */}

            <div className="basket-price-bottom">
              <div className="basket-price-bottom1">
                <div className="tpbr-left">
                  <p>Toplam qiymet:</p>
                </div>
                <div className="tbr-right">
                  <p>
                    {/* {
                      totalPrice
                     }  */}
                    <img src="./assets/img/manatgreen.svg" alt="" />
                  </p>
                </div>
              </div>
              <div className="basket-price-bottom2">
                <NavLink to={"/purchase"}>
                  <h2>Sifarisi Tamamla</h2>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
