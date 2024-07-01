import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineUser } from "react-icons/ai";
import { addTocart } from "../../redux/actions/cart";
import styles from "../../styles/styles";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  return (
    <div className={`w-8/12 mx-auto mt-6 block ${active ? "unset" : "mb-12"}`}>
      {/* <div className="text-center my-12">
        <h1 className="text-4xl font-bold">Sự kiện</h1>
      </div> */}
      <div className="mx-auto">
        <img
          src={`${data.images[0]}`}
          alt=""
          className="w-full h-[450px] object-cover rounded-lg"
        />
      </div>
      <div className="w-full mt-6 lg:[w-50%] flex flex-col justify-center">
        <div className={`${styles.productTitle}`}>{data.name}</div>
        <div className="flex items-center p-1 border-b border-gray-300">
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <img
            src={`${data?.shop?.avatar}`}
            alt=""
            className="w-[20px] h-[20px] rounded-full mr-2"
          />
        </Link>
        <div className="pr-4 pl-2">
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <h3
              className={`${styles.shop_name} pb-1 pt-1 !text-black font-[600]`}
            >
              {data.shop.name}
            </h3>
          </Link>
        </div>
        </div>
        {/* <p>{data.description}</p> */}
        {data.description.length > 200 ? (
          <p className="mt-4 font-[300] text-[13px]"
            dangerouslySetInnerHTML={{
              __html: data.description.slice(0, 400) + "...",
            }}
          ></p>
        ) : (
          <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
        )}
        {/* <p dangerouslySetInnerHTML={{ __html: data.description }}></p> */}

        {/* <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {`${currency.format(data.originalPrice, { code: "VND" })}`}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {`${currency.format(data.discountPrice, { code: "VND" })}`}
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} Đã bán
          </span>
        </div>
        <CountDown data={data} /> */}
        <br />
        <div className="flex items-center">
          {/* <Link to={`/product/${data._id}?isEvent=true`}> */}
          <Link to={`/event/${data._id}`}>
            <div className={`${styles.button} text-[#fff]`}>Xem chi tiết</div>
          </Link>
          {/* <div
            className={`${styles.button} text-[#fff] cursor-pointer`}
            onClick={() => {
              window.location.href = `/event/${data._id}`;
            }}
          >
            Xem chi tiết
          </div> */}
          {/* <div className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler(data)}>Add to cart</div> */}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
