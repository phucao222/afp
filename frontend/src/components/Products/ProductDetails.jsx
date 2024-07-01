import axios from "axios";
import currency from "currency-formatter";
import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";
import { getAllProductsShop } from "../../redux/actions/product";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { server } from "../../server";
import styles from "../../styles/styles";
import Ratings from "./Ratings";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Hàm xử lý khi click vào danh mục
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist, dispatch]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

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
      if (data.stock < count) {
        toast.error("Sản phẩm có số lượng giới hạn!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Sản phẩm đã thêm vào giỏ hàng!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      // const groupTitle = data._id + data.shop._id; // Sử dụng id của sản phẩm và cửa hàng để tạo groupTitle
      const groupTitle = `${user._id}_${data.shop._id}`; // Sử dụng id của người dùng và người bán để tạo groupTitle

      // console.log(data._id);
      const userId = user._id;
      const sellerId = data.shop._id;
      console.log(groupTitle);
      console.log(userId);
      console.log(sellerId);

      const response = await axios.get(
        `${server}/conversation/get-all-conversation-user/${userId}`,
        { withCredentials: true }
      );

      console.log(response);
      const existingConversation = response.data.conversations.find(
        (conv) =>
          conv.members.includes(userId) && conv.members.includes(sellerId)
      );

      if (existingConversation) {
        // Nếu đã có cuộc hội thoại, chuyển người dùng đến trang cuộc hội thoại
        navigate(`/inbox?${existingConversation._id}`);
      } else {
        // Nếu chưa có cuộc hội thoại, tạo mới cuộc hội thoại
        try {
          const res = await axios.post(
            `${server}/conversation/create-new-conversation`,
            {
              groupTitle,
              userId,
              sellerId,
            }
          );

          // Chuyển người dùng đến trang cuộc hội thoại mới tạo
          navigate(`/inbox?${res.data.conversation._id}`);
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
        }
      }
    } else {
      toast.error("Vui lòng đăng nhập để nhắn tin");
    }
  };
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${data && data.images[select]}`}
                  alt=""
                  className="w-[80%] rounded-[8px]"
                />
                <div className="w-full flex">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        key={index}
                        className={`${
                          select === 0 ? "border" : "null"
                        } cursor-pointer`}
                      >
                        <img
                          src={`${i}`}
                          alt=""
                          className="h-[115px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  ></div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <div className="flex">
                  <p>
                    Danh mục:{" "}
                    <i
                      className="text-[#8a2424] cursor-pointer"
                      onClick={() => handleCategoryClick(data.category)}
                    >
                      {data.category}
                    </i>
                  </p>
                </div>

                <span className="font-[500] text-[17px] text-[#f1055c]">
                  {data?.sold_out} đã bán
                </span>
                <div className="flex pt-3">
                  <h4
                    className={`${styles.productDiscountPrice} mt-5 !text-3xl font-bol `}
                  >
                    {data.discountPrice === 0
                      ? `${currency.format(data.originalPrice, {
                          code: "VND",
                        })}`
                      : `${currency.format(data.discountPrice, {
                          code: "VND",
                        })}`}
                  </h4>
                  {data.discountPrice !== 0 && (
                    <h3 className={`${styles.price}`}>
                      {`${currency.format(data.originalPrice, {
                        code: "VND",
                      })}`}
                    </h3>
                  )}

                  <div className="ml-5">
                    <p
                      className={`${
                        data.stock > 0 ? "text-[#008000]" : "text-[#FF0000]"
                      }`}
                    >
                      {data.stock > 0 ? "Còn hàng" : "Hết hàng"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div className="counter flex items-center text-2xl justify-start">
                    <div className="ml-5 shadow-md flex">
                      <div
                        className="bg-[#0b9780] text-white w-10 flex items-center justify-center rounded-l-lg cursor-pointer"
                        onClick={decrementCount}
                      >
                        -
                      </div>
                      <div className="w-9 flex items-center justify-center border-[1px] border-[#8a4af3]">
                        {count}
                      </div>
                      <div
                        className="bg-[#0b9780] text-white w-10 flex items-center justify-center rounded-r-lg cursor-pointer"
                        onClick={incrementCount}
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center pt-8">
                  {/* {" "} */}
                  {data.stock > 0 ? (
                    <div
                      className={`${styles.button} !mt-6 !rounded !h-11 flex items-center mr-7`}
                      onClick={() => addToCartHandler(data._id)}
                    >
                      <span className="text-white flex items-center">
                        Thêm vào giỏ <AiOutlineShoppingCart className="ml-1" />
                      </span>
                    </div>
                  ) : (
                    <p className="text-[#FF0000] mt-6 !text-lg">
                      Sản phẩm đã hết hàng
                    </p>
                  )}
                  <div className="!mt-3 !h-11 flex items-center ">
                    {click ? (
                      <>
                        <AiFillHeart
                          size={40}
                          className="cursor-pointer"
                          onClick={() => removeFromWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Xóa khỏi mục yêu thích"
                        />
                        <span className="text-xl font-semibold">Đã thích </span>
                      </>
                    ) : (
                      <>
                        <AiOutlineHeart
                          size={40}
                          className="cursor-pointer"
                          onClick={() => addToWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Thêm vào mục yêu thích"
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center pt-8 p-1">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${data?.shop?.avatar}`}
                      alt=""
                      className="w-[60px] h-[60px] rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-6 pl-2">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3
                        className={`${styles.shop_name} pb-1 pt-1 !text-red-700 !text-xl font-[600]`}
                      >
                        {data.shop.name}
                      </h3>
                      <p className="text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {data.shop.address}
                      </p>
                    </Link>
                    <h5 className="pb-3 text-[18px]">
                      ({averageRating}/5 ⭐) Đánh giá
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} !bg-[#0030cc] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Gửi tin nhắn <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Giới thiệu
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Đánh giá
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Cửa hàng
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>

      {active === 1 ? (
        <>
          <p
            className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2 bg-[#cccccc70] rounded-lg p-2">
                <img
                  src={`${item.user.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] text-xl mr-3">
                      {item.user.name}
                    </h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <div className="items-center py-3 p-2 ml-2">
                    {" "}
                    <p className="font-[500] text-base">{item.comment}</p>
                  </div>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>Sản phẩm chưa có đánh giá!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${data?.shop?.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5) đánh giá
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Tham gia:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Số lượng sản phẩm:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Số lượng Review:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              {/* <Link to="/">
               <div
                 className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
               >
                 <h4 className="text-white">Visit Shop</h4>
               </div>
             </Link> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
