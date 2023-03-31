import ProductCard from "../../components/productCard/ProductCard";
import "./style.css"
import axios from "axios";
import { useState, useEffect,  } from "react";
import { useParams } from "react-router-dom";
const Products = () => {
    const [products, setproducts] = useState([]);
    const { id } = useParams();

    console.log(id);

    useEffect(() => {
        const getBrand = async () => {
          try {
            const response = await axios.get(
              `http://ec2-18-183-121-110.ap-northeast-1.compute.amazonaws.com:9999/products/brand/${id}`
            );
            setproducts(response.data);
            console.log(products);
          } catch (error) {
            console.log(error);
          }
        };
        getBrand();
      }, []);
    
      console.log(products);

    return ( 
        <div className="section">
        <div className="container">
            <div className="products-all">
                <div className="products-all-top">
                    <form>
                        <select>
                          <option value="baha-ucuz">Bahadan ucuza</option>
                          <option value="ucuz-baha">Ucuzdan bahaya</option>
                        </select>                       
                      </form>
                </div>
                <div className="products-all-body col-lg-12">
                    <div className="left-choosing col-lg-3">
                        <div className="choosing-box">
                            <div className="choosing-box-top">
                                <p>Marka</p>
                                <input type="text" placeholder="Axtar"/>
                            </div>
                            <div className="choosing-box-filter">
                                <ul>
                                    <li>
                                        <input type="checkbox"/>
                                        <span>Apple</span>
                                    </li>
                                    <li>
                                        <input type="checkbox"/>
                                        <span>Samsung</span>
                                    </li>
                                    <li>
                                        <input type="checkbox"/>
                                        <span>Xiaomi</span>
                                    </li>
                                    <li>
                                        <input type="checkbox"/>
                                        <span>LG</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="filter-sort">
                            <div className="filter-price">
                                <div className="fp-top">
                                    <p>Qiymet (AZN)</p>
                                </div>
                                <div className="fp-bottom">
                                    <div className="min-price">
                                        <input type="number" placeholder="En az"/>
                                    </div>
                                    <div className="max-price">
                                        <input type="number" placeholder="En cox"/>
                                    </div>
                                    <div className="price-ready-btn">
                                        <img src="./assets/img/readyqalka.svg" alt="hazrdi"/>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="right-products col-lg-9">
                        <div className="home-all-mehsullar">
                            <div className="mehsullar">
                            {/* {
                                products.map((product, index)=> {
                                    <ProductCard product={product} key={index}/>
                                })
                            } */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
 
export default Products;