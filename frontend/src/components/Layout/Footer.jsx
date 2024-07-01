import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Assests/PhotoType/logo.png";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";

const Footer = () => {
  return (
    <div className="bg-[#009b49] text-white">
      <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center lg:text-start flex lg:block flex-col items-center">
          <div>
            <Link to="">
              <img
                src={logo}
                alt="logo"
                className="max-w-[180px] max-h-[100px] object-contain"
              />
            </Link>
          </div>
          <br />
          <p></p>
        </ul>

        <ul className="text-center lg:text-start">
          <h1 className="mb-1 font-semibold text-[20px]">AgriStore</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-white hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center lg:text-start">
          <h1 className="mb-1 font-semibold text-[20px]">Danh mục</h1>
          {footercompanyLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-white hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={`/${link.link}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center lg:text-start">
          <h1 className="mb-1 font-semibold text-[20px]">Hỗ trợ</h1>
          {footerSupportLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-white hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-3 px-0 text-center text-white bg-black">
        Copyright © 2024 HOANGPHANAFP
      </div>

      {/* <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2023 Becodemy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
