import React from "react";
// import {
//   AiOutlineComment,
//   AiOutlineTags,
//   AiOutlineInbox,
//   AiOutlineForm
// } from "react-icons/ai";
// import { RiCoupon2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../Assests/PhotoType/logo.png";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[80px] bg-[#4A5C76] shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="max-w-[150px] max-h-[50px] object-contain"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          {/* <Link to="/dashboard/cupouns" className="800px:block hidden">
            <RiCoupon2Line
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="800px:block hidden">
            <AiOutlineTags
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <AiOutlineInbox
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <AiOutlineForm
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <AiOutlineComment
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link> */}

          <Link to="/profile" className="w-full flex items-center">
            <img
              src={`${user?.avatar}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
