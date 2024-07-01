import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";

const CategoryProduct = ({ category }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (category === null) {
      setData(allProducts);
    } else {
      setData(
        allProducts &&
          allProducts.filter((i) => i.category === category).slice(0, 5)
      );
    }
  }, [allProducts, category]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading} flex justify-between items-center`}>
          <h1>{category}</h1>
          <Link
            to={`/products?category=${category}`}
            className="text-[#fff] font-[700] text-[1rem] hover:text-[#000] ease-linear duration-100 mr-5 bg-[#009b49] py-2 px-3 rounded-3xl"
          >
            Xem thêm
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {allProducts && allProducts.length !== 0 && (
            <>
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
