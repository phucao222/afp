import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (category) => {
    navigate(`/products?category=${category.title}`);
    setDropDown(false);
    // window.location.reload();
  };
  const submitAllProduct = (i) => {
    navigate(`/products`);
    setDropDown(false);
    // window.location.reload();
  };
  return (
    <div className="pb-4 w-[370px] bg-[#f9f9f9] absolute z-30 rounded-b-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div
        className={`${styles.noramlFlex}`}
        onClick={() => submitAllProduct()}
      >
        <h3 className="m-3 cursor-pointer select-none font-medium">
          🌟 Tất cả sản phẩm ✨✨✨
        </h3>
      </div>

      {categoriesData &&
        categoriesData.map((category, index) => (
          <div
            key={index}
            className={`${styles.noramlFlex}`}
            onClick={() => submitHandle(category)}
          >
            <img
              src={category.image_Url}
              style={{
                width: "35px",
                height: "35px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none"
              }}
              alt=""
            />
            <h3 className="m-3 cursor-pointer select-none ">
              {category.title}
            </h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
