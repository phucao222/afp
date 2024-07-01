import React from "react";
import {
  AiOutlineContacts,
  AiOutlineCreditCard,
  AiOutlineForm,
  AiOutlineInbox,
  AiOutlineSetting,
  AiOutlineTags,
  AiOutlineTeam,
} from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";

const AdminSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll [&::-webkit-scrollbar]:hidden sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/admin/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[#009b49]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-orders" className="w-full flex items-center">
          <AiOutlineForm
            size={30}
            color={`${active === 2 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[#009b49]" : "text-[#555]"
            }`}
          >
            Đơn hàng
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-sellers" className="w-full flex items-center">
          <AiOutlineContacts
            size={30}
            color={`${active === 3 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[#009b49]" : "text-[#555]"
            }`}
          >
            Quản lý người bán
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-users" className="w-full flex items-center">
          <AiOutlineTeam
            size={30}
            color={`${active === 4 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[#009b49]" : "text-[#555]"
            }`}
          >
            Người dùng
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-products" className="w-full flex items-center">
          <AiOutlineInbox
            size={30}
            color={`${active === 5 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[#009b49]" : "text-[#555]"
            }`}
          >
            Sản phẩm
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-events" className="w-full flex items-center">
          <AiOutlineTags
            size={30}
            color={`${active === 6 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[#009b49]" : "text-[#555]"
            }`}
          >
            Sự kiện
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-withdraw-request" className="w-full flex items-center">
          <AiOutlineCreditCard
            size={30}
            color={`${active === 7 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[#009b49]" : "text-[#555]"
            }`}
          >
            Yêu cầu rút tiền
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/profile" className="w-full flex items-center">
          <AiOutlineSetting
            size={30}
            color={`${active === 8 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[#009b49]" : "text-[#555]"
            }`}
          >
            Sửa thông tin
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
