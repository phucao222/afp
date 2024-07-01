import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";
import logo from "../../Assests/PhotoType/logo.png";
import styles from "../../styles/styles";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu đặt lại mật khẩu tới email đã nhập
      await axios.post(`${server}/user/forgot-password`, {
        email
      });

      // Hiển thị thông báo cho người dùng
      toast.success("Yêu cầu đặt lại mật khẩu đã được gửi qua email.");
      navigate("/login");
    } catch (error) {
      // Xử lý lỗi nếu có
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <Link to="">
            <img
              src={logo}
              alt="logo"
              className="max-w-[180px] max-h-[100px] object-contain"
            />
          </Link>
        </div>
      </div>
      <div
        className="bg-[url(https://images.unsplash.com/photo-1681919313941-080179983d9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80)] 
        min-h-screen g-6 flex h-full flex-wrap items-center justify-center lg:justify-between"
      >
        <div class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="w-full"
            alt="Sample image"
          />
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Quên mật khẩu
                </h2>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className={`${styles.noramlFlex} justify-between`}>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  GỬI YÊU CẦU ĐẶT LẠI MẬT KHẨU
                </button>
              </div>
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Quay lại trang đăng nhập?</h4>
                <Link to="/login" className="text-blue-600 pl-2">
                  Đăng nhập
                </Link>
              </div>
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Quay lại trang chủ?</h4>
                <Link to="/" className="text-blue-600 pl-2">
                  Trang chủ
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
