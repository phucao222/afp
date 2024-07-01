import currency from "currency-formatter";
import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart
} from "react-icons/ai";
import { VscLocation } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist
} from "../../../redux/actions/wishlist";
import styles from "../../../styles/styles";
import Ratings from "../../Products/Ratings";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Sản phẩm đã có trong giỏ hàng!");
    } else {
      if (data.stock < 1) {
        toast.error("Sản phẩm số lượng có giới hạn!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Đã thêm vào giỏ hàng!");
      }
    }
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer border">
        <div className="flex justify-end"></div>
        <Link to={`/product/${data._id}`} onClick={handleClick}>
          <img
            src={`${data.images && data.images[0]}`}
            alt=""
            className="w-[auto] block mr-[auto] ml-[auto] h-[155px] object-contain rounded-[4px]"
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>
            {" "}
            {data.shop.name.length > 20
              ? data.shop.name.slice(0, 15) + "..."
              : data.shop.name}
          </h5>
        </Link>
        <Link to={`/product/${data._id}`} onClick={handleClick}>
          <h4 className="pb-3 font-[500] ">
            {data.name.length > 35 ? data.name.slice(0, 27) + "..." : data.name}
          </h4>

          <div className="flex">
            <Ratings rating={data?.ratings} />
          </div>

          {/* <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? `${currency.format(data.originalPrice, { code: "VND" })}`
                  : `${currency.format(data.discountPrice, { code: "VND" })}`}
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice
                  ? `${currency.format(data.originalPrice, { code: "VND" })}`
                  : null}
              </h4>
            </div>

            {/* <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out} sold
            </span> */}

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              {data.discountPrice > 0 ? ( // Kiểm tra nếu có giá khuyến mãi
                <>
                  <h5 className={`${styles.productDiscountPrice}`}>
                    {`${currency.format(data.discountPrice, { code: "VND" })}`}
                  </h5>
                  <h4 className={`${styles.price}`}>
                    <del>{`${currency.format(data.originalPrice, {
                      code: "VND"
                    })}`}</del>
                  </h4>
                </>
              ) : (
                <h5 className={`${styles.productDiscountPrice}`}>
                  {`${currency.format(data.originalPrice, { code: "VND" })}`}
                </h5>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <VscLocation className=" text-red-400 h-6 w-6 mr-2" />
            <p className="text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {data?.shop?.address}
            </p>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Xóa khỏi giỏ hàng yêu thích"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Thêm vào giỏ hàng yêu thích"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Xem nhanh"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Thêm vào giỏ hàng"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
