import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";

const Bucket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const storedBasketItems = JSON.parse(localStorage.getItem("cart"));
    if (storedBasketItems) {
    setBasketItems(storedBasketItems);
    let count = 0
    basketItems.map(basketItem => {
        count += basketItem.products[0].price * basketItem.quantity
        setTotalPrice(count)
    })
    localStorage.setItem('count', count)
    }
  }, [totalPrice]);

  const handleRemoveFromBasket = (item) => {
    const updatedBasketItems = basketItems.filter((basketItem) => basketItem.id !== item.id);
    setBasketItems(updatedBasketItems);
    localStorage.setItem('cart', JSON.stringify(updatedBasketItems));
  }

  const handleClick = () =>{
    if(localStorage.getItem('token')){
      navigate('/purchase')
    }else{
      navigate('/sign')
    }
  }
  


  return (
    <section>
      <div className="container">
        <div className="basket-name">
          <h2>Səbətim</h2>
        </div>
        <div className="basket-home">
          <div className="basket-all-left col-lg-9">
            {basketItems.map((basketItem, index) => {
              return (
                <div className="basket-body" key={index}>
                  <div className="basket-product">
                    <div className="delete-product" onClick={() => handleRemoveFromBasket(basketItem)}>X</div>
                    <NavLink to={`/productDetail/${basketItem.id}`} replace>
                      <img src={basketItem.products[0].photos[0].link} alt="" />
                    </NavLink>
                    <div className="basket-product-info">
                      <div className="info-name">
                        <p>{basketItem.productName}</p>
                      </div>
                      <div className="info-price">
                        <span>
                          {basketItem.products[0].price}
                          <img src="./assets/img/manatgreen.svg" alt="" />
                        </span>
                      </div>
                      <div className="info-total">
                        <div className="it-right">
                          <p>
                            Cəmi: {basketItem.quantity * basketItem.products[0].price}
                            <img src="./assets/img/manatgreen.svg" alt="" />
                          </p>
                        </div>
                      </div>
                      <div className="info-bottom">
                        <div className="ib-left">
                            {basketItem.products[0].color.colorName == null ? null : <div className="ibl-color">
                            <p>Reng</p>
                            <div className="card-color">
                               {basketItem.products[0].color.colorName}
                            </div>
                          </div>}
                          
                          <div className="ibl-memory">
                            <p>Ölçü</p>
                            <p> {basketItem.products[0].productSizes[0].size.sizeName}</p>
                          </div>
                        </div>
                        <div className="ib-right number">
                          <span className="ibr-minus">-</span>
                          <input
                            className="ibr-count"
                            type="ibr-text"
                            value={basketItem.quantity}
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
                   {
                    totalPrice
                   } <img src="./assets/img/manatgreen.svg" alt="" />
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
                  {
                    totalPrice
                   } 
                   <img src="./assets/img/manatgreen.svg" alt="" />
                  </p>
                </div>
              </div>
              <div className="basket-price-bottom2">
                <div onClick={handleClick}>
                  <h2>Sifarisi Tamamla</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bucket;
