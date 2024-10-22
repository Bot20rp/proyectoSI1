import { useEffect, useState } from "react";
import {Banner} from "../components/Banner/Banner";
import {ShopList} from "../components/ShopList/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import {ProductDetails} from "../components/ProductDetails//ProductDetails";
/* import ProductReviews from "../components/ProductReviews/ProductReviews"; */
import {useWindowScroll} from "../hooks/useWindowScroll";
import "./product.css"; // Importamos el archivo CSS que crearemos

export  const Product = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(
    products.filter((item) => parseInt(item.id) === parseInt(id))[0]
  );
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedProduct(
      products.filter((item) => parseInt(item.id) === parseInt(id))[0]
    );
    setRelatedProducts(
      products.filter(
        (item) =>
          item.category === selectedProduct?.category &&
          item.id !== selectedProduct?.id
      )
    );
  }, [selectedProduct, id]);

  useWindowScroll();

  return (
    <>
      <Banner title={selectedProduct?.productName} />
      <ProductDetails selectedProduct={selectedProduct} />
    {/*   <ProductReviews selectedProduct={selectedProduct} /> */}
      <section className="related-products">
        <div className="custom-container">
          <h3>PRoducto que te podian interesar</h3>
        </div>
        <ShopList productItems={relatedProducts} />
      </section>
    </>
  );
};

