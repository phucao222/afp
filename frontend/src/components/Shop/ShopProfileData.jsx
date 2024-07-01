import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import { backend_url } from "../../server";
import Ratings from "../Products/Ratings";
import { getAllEventsShop } from "../../redux/actions/event";
// import EventCard from "../Events/EventCard";

import Lottie from "react-lottie";
import animationData from "../../Assests/animations/searchNotFound.json";
import animationData2 from "../../Assests/animations/notHaveEvent.json";
import EventCard from "../Events/EventSuggestCard";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { id } = useParams();
  const dispatch = useDispatch();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const notHaveEvent = {
    loop: false,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch]);

  const [active, setActive] = useState(1);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  console.log(events);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between bg-[#b4b4b463] p-3 rounded-xl">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-[#009b49] font-[650]" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Sản phẩm
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-[#009b49] font-[650]" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Sự kiện của cửa hàng
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-[#009b49] font-[650]" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Đánh giá của cửa hàng
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded-[8px] h-[42px]`}>
                  <span className="text-[#fff]">Trang chủ</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {products &&
            products.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
        </div>
      )}

      {active === 2 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {events &&
              events.map((i, index) => (
                <EventCard
                  data={i}
                  key={index}
                  isShop={true}
                  // isEvent={true}
                />
              ))}
          </div>
          {events && events.length === 0 && (
            <div>
              <Lottie options={notHaveEvent} width={300} height={300} />
              <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
                Chưa có sự kiện nào đang diễn ra 🥲
              </h5>
              <br />
              <br />
            </div>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="w-full flex my-4">
                <img
                  src={`${item.user.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-[600] pr-2">{item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="font-[400] text-[#000000a7]">{item?.comment}</p>
                  <p className="text-[#000000a7] text-[14px]">{"2days ago"}</p>
                </div>
              </div>
            ))}
          {allReviews && allReviews.length === 0 && (
            // <h5 className="w-full text-center py-5 text-[18px]">
            //   Chưa có đánh giá cho cửa hàng này!
            // </h5>
            <div>
              <Lottie options={defaultOptions} width={300} height={300} />
              <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
                Chưa có đánh giá cho cửa hàng này 🥲
              </h5>
              <br />
              <br />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
