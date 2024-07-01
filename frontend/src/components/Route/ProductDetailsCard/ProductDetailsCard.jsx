import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
// import { backend_url } from "../../../server";
import axios from "axios";
import currency from "currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { server } from "../../../server";
import styles from "../../../styles/styles";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  //   const [select, setSelect] = useState(false);
  const [currentImage, setCurrentImage] = useState(0); // Added state for tracking the current image index

  const nextImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === data.images.length - 1 ? 0 : prevImage + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? data.images.length - 1 : prevImage - 1
    );
  };

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      // const groupTitle = data._id + user._id;
      const groupTitle = `${user._id}_${data.shop._id}`; // Sử dụng id của người dùng và người bán để tạo groupTitle

      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Sản phẩm đã có trong giỏ hàng!");
    } else {
      if (data.stock < count) {
        toast.error("Sản phẩm số lượng có giới hạn!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Sản phẩm đã thêm vào giỏ hàng!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img src={`${data.images && data.images[0]}`} alt="" />

                {/* <div className="flex mt-3">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                    <img
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name} text-[18px] text-[#830000ea] font-medium`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[16px] font-normal">(4.5) Đánh giá</h5>
                    </div>
                  </Link>
                </div> */}
                <div class="flex flex-row justify-center mt-4">
                  <div class="relative flex flex-row md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-[#ffeee8]">
                    <div class="w-full md:w-1/3 bg-[#ffeee8] grid place-items-center">
                      <img
                        src={`${data?.shop?.avatar}`}
                        alt=""
                        class=" w-[90%] h-[90%] rounded-full object-cover"
                      />
                    </div>
                    <div class="w-full md:w-2/3 bg-[#ffeee8] flex flex-col space-y-2 p-3">
                      <div class="flex justify-between item-center">
                        <p class="text-gray-500 font-medium hidden md:block">
                          Đánh giá
                        </p>
                        <div class="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <p class="text-gray-600 font-bold text-sm ml-1">
                            4.5
                            <span class="text-gray-500 font-normal">
                              {/* (76 reviews) */}
                            </span>
                          </p>
                        </div>

                        <div class="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                          Chất lượng
                        </div>
                      </div>
                      <Link to={`/shop/preview/${data.shop._id}`}>
                        <h3 class="font-black text-gray-800 md:text-2xl text-xl">
                          {data.shop.name}
                        </h3>
                      </Link>

                      {/* <div
                          className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                          onClick={handleMessageSubmit}
                        >
                          <span className="text-[#fff] flex items-center">
                            Gửi tin nhắn <AiOutlineMessage className="ml-1" />
                          </span>
                        </div> */}
                    </div>
                  </div>
                </div>

                <h5 className="text-[16px] text-[red] mt-5"></h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[22px] px-5`}>
                  {data.name}
                </h1>

                {/* <div className="flex pt-3 px-5">
                  <h4 className={`${styles.productDiscountPrice} text-2xl`}>
                    {currency.format(data.discountPrice, { code: "VND" })}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice
                      ? `${currency.format(data.originalPrice, {
                          code: "VND",
                        })}`
                      : null}
                  </h3>
                </div> */}
                <div className="flex pt-3 px-5">
                  {data.discountPrice ? (
                    <>
                      <h4 className={`${styles.productDiscountPrice} text-2xl`}>
                        {currency.format(data.discountPrice, { code: "VND" })}
                      </h4>
                      <del className={`${styles.price} ml-2`}>
                        {currency.format(data.originalPrice, { code: "VND" })}
                      </del>
                    </>
                  ) : (
                    <h4 className={`${styles.productDiscountPrice} text-2xl`}>
                      {currency.format(data.originalPrice, { code: "VND" })}
                    </h4>
                  )}
                </div>
                {
                  /* <p className="py-2 text-[18px] leading-8 pb-10 px-5 whitespace-pre-line">
                  {data.description.length > 200
                    ? data.description.slice(0, 130) + "..." + <Link to={`/product/${data._id}`}> <p>Nhấn để xem thêm</p></Link>
                    : data.description}
                </p> */
                  // <p className="py-2 text-[18px] leading-8 pb-10 px-5 whitespace-pre-line">
                  //   {data.description.length > 200 ? (
                  //     <>
                  //       {data.description.slice(0, 130)} ...
                  // <Link to={`/product/${data._id}`}>
                  //   {" "}
                  //   <p className="text-[#0054c3f5]">Nhấn để xem thêm</p>
                  // </Link>
                  //     </>
                  //   ) : (
                  //     data.description
                  //   )}
                  // </p>
                  // <div className="py-2 text-[18px] leading-8 pb-10 px-5 whitespace-pre-line">
                  //   {data.description.length > 200 ? (
                  //     <>
                  //       <div
                  //         dangerouslySetInnerHTML={{
                  //           __html: data.description.slice(0, 200),
                  //         }}
                  //       />
                  //       {""}
                  //       <Link to={`/product/${data._id}`}>
                  //         <p className="text-[#0054c3f5]">Nhấn để xem thêm</p>
                  //       </Link>
                  //     </>
                  //   ) : (
                  //     <div
                  //       dangerouslySetInnerHTML={{ __html: data.description }}
                  //     />
                  //   )}
                  // </div>
                }
                {/* <p className="py-2 text-[18px] leading-8 pb-10 px-5 whitespace-pre-line">
                  <div dangerouslySetInnerHTML={{ __html: data.description }} />
                  {data.description.length > 200 ? (
                    <Link to={`/product/${data._id}`}>
                      <p className="text-[#0054c3f5]">Nhấn để xem thêm</p>
                    </Link>
                  ) : null}
                </p> */}
                <div className="flex items-center mt-12 justify-between px-5 pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div className="px-4">
                  <div
                    className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <span className="text-[#fff] flex items-center">
                      Thêm vào giỏ <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                  <Link to={`/product/${data._id}`}>
                    {" "}
                    <p className="text-[#0054c3f5]">Nhấn để xem thêm</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
