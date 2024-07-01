import React from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

import {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  // const { isSeller } = useSelector((state) => state.seller);

  const slideData = [
    {
      imageUrl:
        "url(https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
      title: "HOANG PHAN AFP",
      description:
        "Chào mừng bạn đến với chúng tôi! Ở đây, chúng tôi mang đến một trải nghiệm độc đáo liên quan đến nông nghiệp hiện đại, kết hợp công nghệ và tình yêu đối với việc trồng trọt, chăm sóc cây trồng và nuôi dưỡng động vật. Hãy khám phá cùng chúng tôi!",
    },
    {
      imageUrl:
        "url(https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      title: "HOANG PHAN AFP",
      description:
        "Sản phẩm đa dạng, nhiều loại khác nhau trên thị trường, chúng tôi mang đến một thiên đường sản phẩm về nông nghiệp hiện đại. Hãy khám phá cùng chúng tôi!",
    },
    {
      imageUrl:
        "url(https://images.unsplash.com/photo-1565102127622-df163cfbdaa4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      title: "HOANG PHAN AFP",
      description:
        "Chính sách bảo hành hợp lý, chăm sóc khách hàng tuyệt vời, 24/7 mỗi khi khách cần đến. Đó là những tiêu chí hàng đầu của hệ thống chúng tôi. Hãy trải nghiệm mua sắm cùng chúng tôi!",
    },
  ];

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        cssMode
        navigation
        pagination={{
          clickable: true,
        }}
        mousewheel
        keyboard
        autoplay
        className="mySwiper"
      >
        {slideData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              key={index}
              className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex} bg-center bg-cover`}
              style={{
                backgroundImage: slide.imageUrl,
              }}
            >
              <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
                <h1
                  className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#fff] font-[600] capitalize`}
                >
                  {slide.title}
                  <br />
                </h1>
                <p className="pt-5 text-[18px] font-[Poppins] font-[500] text-[#fff]">
                  {slide.description}
                </p>
                <div className="flex justify-evenly">
                  <Link to="/products">
                    <div
                      className={`${styles.button} mt-5 relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0`}
                    >
                      <span className="text-[#fff] font-[Poppins] text-[18px]">
                        Mua ngay
                      </span>
                    </div>
                  </Link>
                  {/* {isSeller && isSeller ? null : (
                    <Link to="/shop-create">
                      <div
                        className={`${styles.button} mt-5 relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0`}
                      >
                        <span className="text-[#fff] font-[Poppins] text-[18px]">
                          Seller
                        </span>
                      </div>
                    </Link>
                  )} */}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Hero;
