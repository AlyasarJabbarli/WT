import axios from "axios";
import { useState, useEffect } from "react";
import "./style.css";


const Navbar = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          "http://ec2-18-183-121-110.ap-northeast-1.compute.amazonaws.com:9999/categories"
        )
        .then((response) => setData(response.data))
        .catch((error) => console.log(error));
    }

    fetchData();
  }, []);


  return (
    <nav>
      <div className="category_all">
        <ul className="categoryList">
          {data &&
            data.map((category) => (
              <li key={category.id}>
                <div className="visible_part">
                <div className="svg_container">
                  <img src={category.iconLink} alt="" />
                </div>
                <h4>{category.categoryName}</h4>
                </div>
                <div className="sub_category_div">
                    <ul className="subCategory_list">
                        {
                          category.sub_categories.map((subcat, index) =>(
                            <li key={index} ><h3>{subcat.name}</h3>
                                <ul className="ssCategory_list">
                                  {
                                    subcat?.genders.map((gender,index) => (
                                      <li key={index}>
                                        {gender?.name}
                                      </li>
                                    ))
                                  }  
                                </ul>
                            </li>
                          ))
                        }
                    </ul>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
