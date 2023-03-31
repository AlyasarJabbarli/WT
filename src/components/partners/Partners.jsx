import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";


const Partners = () => {
  const [brands, setbrand] = useState([]);
  useEffect(() => {
    const getBrand = async () => {
      try {
        const response = await axios.get(
          `http://ec2-18-183-121-110.ap-northeast-1.compute.amazonaws.com:9999/brands`
        );
        setbrand(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBrand();
  }, []);
  return (
    <section id="partnerSection">
      <div className="container">
        <div className="pr_sect_title">
          <h2>Partnyorlar</h2>
        </div>
        <div className="partners">
          {brands.map((brand, index) => {
            return (
              <div className="partnerDiv" key={index}>
                <NavLink
                  to={`/products/${brand.brandId}`}
                  >
                  <img src={brand.iconLink} alt="" />
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default  Partners;
