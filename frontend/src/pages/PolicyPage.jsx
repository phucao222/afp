import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";

const PolicyPage = () => {
  return (
    <div>
      <Header />
      <Policy />
      <Footer />
    </div>
  );
};

export default PolicyPage;

const Policy = () => {
  return (
    <div className="flex items-center bg-[#efefef]">
      <div
        className={`${styles.section} 800px:w-[80%] mx-auto bg-white rounded-lg my-4 shadow-md`}
      >
        <div className="w-full flex items-center flex-col">
          <h1
            className={`${styles.productTitle} text-[30px] text-center my-4 mt-8 uppercase`}
          >
            CHÀO MỪNG QUÝ KHÁCH ĐẾN VỚI WEBSITE CHÍNH THỨC CỦA AGRISTORE
          </h1>

          <div className="mx-auto flex items-center">
            <div className="p-8 pt-0">
              {/* <p className="text-[18px] text-[#1b4462] text-justify leading-8"></p> */}
              <p className="mt-0 mb-4">
                AGRISTORE – CHUỖI SIÊU THỊ NÔNG NGHIỆP HÀNG ĐẦU VIỆT NAM
                Agristore ra đời từ mong muốn phục vụ được nhu cầu về vật tư
                nông nghiệp – Tư vấn kỹ thuật cho người nông dân làm nông nghiệp
                .
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  <strong>
                    <span>1. Tư vấn trước và sau bán hàng</span>
                  </strong>
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  Đội ngũ nhân viên tư vấn&nbsp;của AGRISTORE luôn hoạt động
                  24/7 (cả cả chủ nhật và ngày lễ)&nbsp;để đáp ứng nhu cầu tư
                  vấn, khiếu nại của khách hàng .&nbsp;&nbsp;
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  <span>
                    <strong>2. Thanh toán an toàn và tiện lợi</strong>
                  </span>
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  <span>
                    Người mua có thể tham khảo các phương thức thanh toán sau
                    đây và lựa chọn áp dụng phương thức phù hợp:
                  </span>
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  <span>
                    <strong>
                      <u>Cách 1</u>
                    </strong>
                    : Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ
                    người bán)
                  </span>
                  <br></br>
                  <span>
                    <strong>
                      <u>Cách 2</u>
                    </strong>
                    <strong>:</strong>&nbsp;Thanh toán sau (COD – giao hàng và
                    thu tiền tận nơi)
                  </span>
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  <strong>
                    <span class="wysiwyg-font-size-medium">
                      3. Bảo hành và đổi trả linh hoạt
                    </span>
                  </strong>
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  <span class="wysiwyg-font-size-medium">
                    Chính sách bảo hành và đổi trả dài hạn&nbsp;giúp quý khách
                    an tâm sử&nbsp;dụng sản phẩm .&nbsp;
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
