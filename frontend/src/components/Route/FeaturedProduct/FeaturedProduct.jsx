import React from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading} flex justify-between items-center`}>
          <h1>Sản phẩm nổi bật</h1>
          <Link
            to="/products"
            className="text-[#000] font-[700] text-[16px] underline hover:text-[#009b49] ease-linear duration-100 mr-5"
          >
            Xem thêm
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {allProducts && allProducts.length !== 0 && (
            <>
              {allProducts &&
                allProducts.map((i, index) => (
                  <ProductCard data={i} key={index} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
