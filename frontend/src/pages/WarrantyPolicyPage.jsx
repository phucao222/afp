import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import warrantyImage from "../Assests/img/warrantyImage/warrantyImage.png";
const WarrantyPolicyPage = () => {
  return (
    <div>
      <Header />
      <Warranty />
      <Footer />
    </div>
  );
};

export default WarrantyPolicyPage;

const Warranty = () => {
  return (
    <div className="flex items-center bg-[#efefef]">
      <div
        className={`${styles.section} 800px:w-[80%] mx-auto bg-white rounded-lg my-4 shadow-md`}
      >
        <div className="w-full flex items-center flex-col">
          <h1
            className={`${styles.productTitle} text-[30px] text-center my-4 mt-8 uppercase`}
          >
            CHÍNH SÁCH BẢO HÀNH
          </h1>

          <div className="mx-auto flex items-center">
            <div className="p-8 pt-0">
              <p className="mt-0 mb-4">
                <strong>1. MỤC ĐÍCH:</strong>
              </p>
              <p className="mt-0 mb-4">
                Quy định các trường hợp bảo hành và không được bảo hành của sản
                phẩm máy nông nghiệp do AGRISTORE cung cấp
              </p>
              <p className="mt-0 mb-4">
                <strong>2. ÁP DỤNG:</strong>
              </p>
              <p className="mt-0 mb-4">
                Quy định này áp dụng cho các sản phẩm của AGRISTORE có ngày sản
                xuất trên tem bảo hành từ tháng 1/2023.
              </p>
              <p className="mt-0 mb-4">
                <strong>3. THỜI GIAN BẢO HÀNH:</strong>
              </p>
              <img src={warrantyImage} alt="warranty" />
              <p className="mt-0 mb-4">
                <strong>4. ĐIỀU KIỆN BẢO HÀNH SẢN PHẨM:</strong>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  - Sản phẩm còn thời gian bảo hành ( Căn cứ theo tem bảo hành )
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  - Tem bảo hành còn nguyên vẹn không rách nát, không có dấu
                  hiệu tẩy xóa , thay thế .
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  - Sản phẩm còn nguyên vẹn, không bị tác động bởi ngoại lực bên
                  ngoài .
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  - Sản phẩm được sử dụng đúng mục đích, theo hướng dẫn .
                </span>
              </p>
              <p className="mt-0 mb-4">
                <strong>LƯU Ý: </strong>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  <strong>
                    <em>Đối với phí vận chuyển</em>
                  </strong>
                  &nbsp;: Khách hàng&nbsp;vui lòng thanh toán cước phí khi gửi
                  sản phẩm đến AGRISTORE&nbsp;. Sau khi đã sửa chữa và thay thế
                  sản phẩm bảo hành xong, chúng tôi sẽ gửi trả sản phẩm đến tận
                  tay khách hàng (phí gửi trả hàng chúng tôi sẽ thanh
                  toán)&nbsp;.
                </span>
              </p>
              <p className="mt-0 mb-4">
                <span className="text-[14px]">
                  <strong>Xin chân thành cảm ơn quý khách.</strong>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
