import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";

const AboutPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <About />
      <Footer />
    </div>
  );
};

export default AboutPage;

const About = () => {
  return (
    <div className="flex items-center bg-[#efefef]">
      <div
        className={`${styles.section} 800px:w-[80%] mx-auto bg-white rounded-lg my-4 shadow-md`}
      >
        <h1
            className={`${styles.productTitle} text-[24px] text-center my-4 mt-8 uppercase`}
          >
            AGRISTORE – HỆ THỐNG CHUYÊN CUNG CẤP CÁC MẶT HÀNG NÔNG NGHIỆP 
          </h1>
          <div className="mx-auto flex items-center">
          <div className="p-8 pt-0">
          <p className="mt-0 mb-4">
          Chào mừng đến với trang web của chúng tôi, nơi mang đến sự tiện lợi và 
          đa dạng cho việc mua sắm đồ dùng và vật tư nông nghiệp. 
          Chúng tôi tự hào cung cấp một loạt các sản phẩm chất lượng cao để hỗ trợ 
          người nông dân, nhà vườn và các nhà làm vườn tự chăm sóc và phát triển nông nghiệp của mình.
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[20px]">
                  <strong>
                    <span>SỨ MỆNH</span>
                  </strong>
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                Chúng tôi hướng đến việc hỗ trợ cộng đồng nông dân, nhà vườn và những người đam mê nông nghiệp
                 thông qua việc cung cấp các sản phẩm chất lượng và dịch vụ tiện ích. Sứ mệnh của chúng tôi là
                  đem lại sự đa dạng, chất lượng và sự thuận tiện cho mọi người trong việc sử dụng các vật tư 
                  và dụng cụ nông nghiệp.
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[20px]">
                  <strong>
                    <span>CAM KẾT</span>
                  </strong>
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  <span>
                    <strong>1. Chất lượng sản phẩm</strong>: 
                    Chúng tôi chỉ cung cấp các sản phẩm chất lượng cao 
                    từ các nhà cung cấp uy tín và được kiểm định.
                  </span>
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  <span>
                    <strong>2. An toàn và hiệu quả</strong>: 
                    Sản phẩm của chúng tôi được kiểm tra để đảm bảo an toàn 
                    khi sử dụng và hiệu quả trong việc áp dụng vào nông nghiệp thực tế.
                  </span>
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  <span>
                    <strong>3. Sự đa dạng</strong>: 
                    Chúng tôi cung cấp một loạt các sản phẩm đa dạng, từ hạt giống đến đất trồng 
                    và dụng cụ, để phục vụ nhu cầu đa dạng của người nông dân và nhà vườn.
                  </span>
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[20px]">
                  <strong>
                    <span>HỔ TRỢ</span>
                  </strong>
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  <span>
                    <strong>1. Tư vấn sản phẩm</strong>: 
                    Đội ngũ chuyên viên của chúng tôi sẵn sàng tư vấn và hỗ trợ 
                    bạn chọn lựa sản phẩm phù hợp với nhu cầu và mục tiêu của bạn.
                  </span>
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  <span>
                    <strong>2. Hướng dẫn sử dụng</strong>:  
                    Chúng tôi cung cấp thông tin chi tiết về cách sử dụng,
                     bảo quản và áp dụng sản phẩm một cách hiệu quả nhất.
                  </span>
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  <span>
                    <strong>3. Dịch vụ hổ trợ khách hàng</strong>: 
                    Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng lắng nghe
                     và giải đáp mọi thắc mắc của bạn, đảm bảo bạn có trải nghiệm mua sắm tốt nhất.
                  </span>
                </span>
              </p>
          </div>
          </div>
      </div>
    </div>
  );
};
