import ProductCard from "../productCard/ProductCard";
import "./style.css";
import axios from "axios";
import { useState, useEffect } from "react";

const ProductsSection = ({ title }) => {
  const [data, setData] = useState([]);
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


  return (
    <section>
        <div className="container">
            <div className="pr_sect_title">
                <h2>
                    {title}
                </h2>
            </div>
            <div className="products">
                {
                  data && data.map((product, index) =>(
                      <ProductCard product={product} key={index}/>
                  ))
                }
            </div>
        </div>
    </section>
  );
};

export default ProductsSection;
