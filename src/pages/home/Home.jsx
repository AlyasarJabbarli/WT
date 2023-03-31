import Navbar from "../../components/navbar/Navbar";
import Carousel from "../../components/carousel/Carousel";
import ProductsSection from "../../components/productsSection/ProductsSection";

import "./style.css"
import Partners from "../../components/partners/Partners";
const Home = () => {
    

  return (
    <main>
      <div className="container">
        <div className="homeAll">
          <div className="left">
            <div className="sticky_navbar">
                <Navbar />
            </div>
          </div>
          <div className="right">
            <Carousel />
            <ProductsSection title={"Ən çox satılanlar"}/>
            <Partners />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
