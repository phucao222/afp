import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user.role === "Admin";
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      {user && user?.role !== "Admin" && (
        <>
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(1)}
          >
            <RxPerson size={20} color={active === 1 ? "#009b49" : ""} />
            <span
              className={`pl-3 ${
                active === 1 ? "text-[#009b49]" : ""
              } 800px:block hidden`}
            >
              Trang cá nhân
            </span>
          </div>
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(2)}
          >
            <HiOutlineShoppingBag
              size={20}
              color={active === 2 ? "#009b49" : ""}
            />
            <span
              className={`pl-3 ${
                active === 2 ? "text-[#009b49]" : ""
              } 800px:block hidden`}
            >
              Đơn đặt hàng
            </span>
          </div>
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(3)}
          >
            <HiOutlineReceiptRefund
              size={20}
              color={active === 3 ? "#009b49" : ""}
            />
            <span
              className={`pl-3 ${
                active === 3 ? "text-[#009b49]" : ""
              } 800px:block hidden`}
            >
              Đơn hoàn tiền
            </span>
          </div>

          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(4) || navigate("/inbox")}
          >
            <AiOutlineMessage size={20} color={active === 4 ? "#009b49" : ""} />
            <span
              className={`pl-3 ${
                active === 4 ? "text-[#009b49]" : ""
              } 800px:block hidden`}
            >
              Tin nhắn
            </span>
          </div>

          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(5)}
          >
            <MdOutlineTrackChanges
              size={20}
              color={active === 5 ? "#009b49" : ""}
            />
            <span
              className={`pl-3 ${
                active === 5 ? "text-[#009b49]" : ""
              } 800px:block hidden`}
            >
              Theo dõi đơn hàng
            </span>
          </div>

          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(6)}
          >
            <RiLockPasswordLine
              size={20}
              color={active === 6 ? "#009b49" : ""}
            />
            <span
              className={`pl-3 ${
                active === 6 ? "text-[#009b49]" : ""
              } 800px:block hidden`}
            >
              Đổi mật khẩu
            </span>
          </div>

          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(7)}
          >
            <TbAddressBook size={20} color={active === 7 ? "#009b49" : ""} />
            <span
              className={`pl-3 ${
                active === 7 ? "text-[#009b49]" : ""
              } 800px:block hidden`}
            >
              Địa chỉ
            </span>
          </div>
        </>
      )}

      {user && user?.role === "Admin" && (
        <>
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(1)}
          >
            <RxPerson size={20} color={active === 1 ? "#009b49" : ""} />
            <span
              className={`pl-3 ${
                active === 1 ? "text-[#009b49]" : ""
              } 800px:block hidden`}
            >
              Trang cá nhân
            </span>
          </div>
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(6)}
          >
            <RiLockPasswordLine
              size={20}
              color={active === 6 ? "#009b49" : ""}
            />
            <span
              className={`pl-3 ${
                active === 6 ? "text-[#009b49]" : ""
              } 800px:block hidden`}
            >
              Đổi mật khẩu
            </span>
          </div>
          <Link to="/admin/dashboard">
            <div
              className="flex items-center cursor-pointer w-full mb-8"
              onClick={() => setActive(8)}
            >
              <MdOutlineAdminPanelSettings
                size={20}
                color={active === 7 ? "#009b49" : ""}
              />
              <span
                className={`pl-3 ${
                  active === 8 ? "text-[#009b49]" : ""
                } 800px:block hidden`}
              >
                Quản lý
              </span>
            </div>
          </Link>
        </>
      )}
      <div
        className="single_item flex items-center cursor-pointer w-full mb-8"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "#009b49" : ""} />
        <span
          className={`pl-3 ${
            active === 8 ? "text-[#009b49]" : ""
          } 800px:block hidden`}
        >
          Đăng xuất
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
