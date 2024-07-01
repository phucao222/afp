import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";

import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import DropDown from "../components/Layout/DropDown";
import { categoriesData } from "../static/data";

import Lottie from "react-lottie";
import animationData from "../Assests/animations/searchNotFound.json";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  const [sortBy, setSortBy] = useState("default");
  const [dropDown, setDropDown] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const sortProducts = (sortBy, data) => {
    switch (sortBy) {
      case "priceAsc":
        return data.slice().sort((a, b) => a.originalPrice - b.originalPrice);
      case "priceDesc":
        return data.slice().sort((a, b) => b.originalPrice - a.originalPrice);
      case "newest":
        return data
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return data;
    }
  };

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [allProducts, categoryData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className="flex md:justify-end md:flex-row flex-col pb-2">
            <div className="mr-[3vw]">
              <div onClick={() => setDropDown(!dropDown)}>
                {/* <div className="relative h-[60px] mt-[10px] w-[370px] mb-7 hidden 
                1000px:block"> */}
                <div className="relative h-[60px] mt-[10px] w-[370px] mb-7">
                  <BiMenuAltLeft size={30} className="absolute top-4 left-2" />
                  <button
                    className={`h-[60px] w-full flex justify-between items-center pl-11 border border-gray-300 rounded-md bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
                  >
                    Danh mục
                  </button>

                  <IoIosArrowDown
                    size={20}
                    className="absolute right-2 top-5 cursor-pointer"
                    onClick={() => setDropDown(!dropDown)}
                  />
                  {dropDown ? (
                    <>
                      <DropDown
                        categoriesData={categoriesData}
                        setDropDown={setDropDown}
                      />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="mr-[3vw] mt-4">
              <select
                className="h-[50px] w-[250px] bg-white border border-gray-300 rounded-md px-3 outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sắp xếp mặc định</option>
                <option value="priceAsc">Giá tăng dần</option>
                <option value="priceDesc">Giá giảm dần</option>
                <option value="newest">Hàng mới</option>
              </select>
            </div>
          </div>
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {sortProducts(sortBy, data)?.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
            </div>
            {data && data.length === 0 ? (
              <div>
                <Lottie options={defaultOptions} width={300} height={300} />
                <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
                  Không tìm thấy sản phẩm 🥲
                </h5>
                <br />
                <br />
              </div>
            ) : null}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
