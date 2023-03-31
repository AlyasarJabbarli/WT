import "./style.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Purchase = () => {
  const [totalSum , setTotalSum] = useState(0)
  const bucket = JSON.parse(localStorage.getItem('cart'))
  let total = localStorage.getItem('count')
  let customerId = localStorage.getItem('customerId')
  let navigate= useNavigate()
  useEffect(()=>{
    setTotalSum(total)
  },[])
  const handleBuy = async (e) => {
    e.preventDefault();
    axios
      .post(
        `http://ec2-18-183-121-110.ap-northeast-1.compute.amazonaws.com:9999/bucket/purchase/${customerId}`,
        { bucket },
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Handle successful login
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      })
      .catch((error) => {
        // Handle login error
        console.error(error);
      });
  };
  return (
    <section>
      <div className="container">
        <div className="purchase_all">
          <div className="purchase_left">
            <form action="">
              
            <div>
                  <label htmlFor="uname">
                    <b>Kart Nömrəniz</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="uname"
                    required
                  />
              </div>
              <div>
                  <label htmlFor="uname">
                    <b>Bitmə Tarixi</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="uname"
                    required
                  />
              </div>              
              <div>
                  <label htmlFor="uname">
                    <b>CVV</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="uname"
                    required
                  />
              </div>  
            </form>
            <div className="log-body-in-btn">
              <button>
                <div className="anotherdiv" onClick={handleBuy}>
                  Sifarişi tamamla
                </div>
              </button>
            </div>
          </div>
          <div className="purchase_right">
              <div className="pay">
                <p>Ödəniləcək məbləğ:</p>
                <p>{totalSum }</p>
              </div>
              <div className="products">
           
                <div className="product_All">
                    {bucket.map(product => {
                    return(
                    <div className="product">
                  <div className="product_top">
                    <p>Toplam qiymət:</p>
                    <p>{product.products[0].price * product.quantity}</p>
                  </div>
                  <div className="product_bottom">
                    <div className="product_main">
                      <div className="product_main_photo">
                        <img src={product.products[0].photos[0].link} alt="" />
                      </div>
                      <div className="product_name">
                        <h3>{product.productName}</h3>
                      </div>
                    </div>
                    <div>
                      <p>Ölçü</p>
                      <p>S</p>
                    </div>
                    <div>
                      <p>Rəng</p>
                      <p>Qara</p>
                    </div>
                  </div>
                  <div className="product_price">
                    <p>Qiyməti</p>
                    <p>3099</p>
                  </div>
                </div>
                    )
                })}
                </div>
                
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Purchase;
