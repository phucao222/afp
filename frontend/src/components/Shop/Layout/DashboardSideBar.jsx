import React from "react";
import { 
  AiOutlineTags,
  AiOutlineInbox,
  AiOutlineForm,
} from "react-icons/ai";
import { RiCoupon2Line } from "react-icons/ri";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";

const DashboardSideBar = ({ active }) => {
  return (
    // <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
    <div className="w-full h-[100vh] bg-white shadow-sm sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[#009b49] font-bold" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-orders" className="w-full flex items-center">
          <AiOutlineForm
            size={30}
            color={`${active === 2 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[#009b49] font-bold" : "text-[#555]"
            }`}
          >
            Quản lý đơn hàng
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-products" className="w-full flex items-center">
          <AiOutlineInbox size={30} color={`${active === 3 ? "#009b49" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[#009b49] font-bold" : "text-[#555]"
            }`}
          >
            Quản lý sản phẩm
          </h5>
        </Link>
      </div>

      {/* <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-create-product"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 4 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[#009b49] font-bold" : "text-[#555]"
            }`}
          >
            Thêm sản phẩm
          </h5>
        </Link>
      </div> */}

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-events" className="w-full flex items-center">
          <AiOutlineTags
            size={30}
            color={`${active === 5 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[#009b49] font-bold" : "text-[#555]"
            }`}
          >
            Quản lý sự kiện,tin tức
          </h5>
        </Link>
      </div>

      {/* <div className="w-full flex items-center p-4">
        <Link to="/dashboard-create-event" className="w-full flex items-center">
          <VscNewFile
            size={30}
            color={`${active === 6 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[#009b49] font-bold" : "text-[#555]"
            }`}
          >
            Tạo sự kiện
          </h5>
        </Link>
      </div> */}

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-withdraw-money"
          className="w-full flex items-center"
        >
          <CiMoneyBill
            size={30}
            color={`${active === 7 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[#009b49] font-bold" : "text-[#555]"
            }`}
          >
            Rút tiền
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-messages" className="w-full flex items-center">
          <AiOutlineInbox
            size={30}
            color={`${active === 8 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[#009b49] font-bold" : "text-[#555]"
            }`}
          >
            Tin nhắn
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-coupouns" className="w-full flex items-center">
          <RiCoupon2Line
            size={30}
            color={`${active === 9 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[#009b49] font-bold" : "text-[#555]"
            }`}
          >
            Quản lý mã giảm giá
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-refunds" className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 10 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 10 ? "text-[#009b49] font-bold" : "text-[#555]"
            }`}
          >
            Xử lý hoàn tiền
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/settings" className="w-full flex items-center">
          <CiSettings
            size={30}
            color={`${active === 11 ? "#009b49" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? "text-[#009b49] font-bold" : "text-[#555]"
            }`}
          >
            Sửa thông tin
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
