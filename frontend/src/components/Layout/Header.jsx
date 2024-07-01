import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser
} from "react-icons/ai";
import { IoIosArrowForward, IoIosNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import Wishlist from "../Wishlist/Wishlist";
import Cart from "../cart/Cart";
import Navbar from "./Navbar";
import logo from "../../Assests/PhotoType/logo.png";

import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { categoriesData } from "../../static/data";
import DropDown from "./DropDown";

import { BiMenu } from "react-icons/bi";
import { TbArrowBarLeft } from "react-icons/tb";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import NotificationBar from "../Notification/NotificationBar";
const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { orders } = useSelector((state) => state.order);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, isAuthenticated, user]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  const handleDocumentClick = (event) => {
    // Kiểm tra nếu người dùng không click vào searchBox hoặc searchResult, thì ẩn kết quả tìm kiếm
    if (
      !searchInputRef.current?.contains(event.target) &&
      !searchResultsRef.current?.contains(event.target)
    ) {
      setSearchData(null);
    }
  };

  // Sử dụng useEffect để lắng nghe sự kiện "click" trên toàn tài liệu
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    // Clean up khi component unmount
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const isAdmin = user?.role === "Admin";

  return (
    <>
      <div className={`w-full bg-[#009b49] ${styles.section}`}>
        <div className="w-11/12 mx-auto">
          <div className="mx-auto null transition hidden 800px:flex items-center justify-between w-full bg-[#009b49] h-[70px]">
            <div>
              <Link to="/">
                <img
                  src={logo}
                  alt="logo"
                  className="max-w-[150px] max-h-[50px] object-contain"
                />
              </Link>
            </div>
            {/* search box */}
            <div className="w-[40%] relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[40px] w-full px-2 border-[#009b49] border-[1px] rounded-md"
                ref={searchInputRef}
              />
              <AiOutlineSearch
                size={30}
                className="absolute right-2 top-1.5 cursor-pointer"
              />
              {searchTerm && searchData && searchData.length === 0 ? (
                <div
                  className="absolute min-h-[6vh] bg-slate-50 shadow-sm-2 z-[2] p-4 w-[100%]"
                  ref={searchResultsRef}
                >
                  <p className="text-red-500">Không tìm thấy sản phẩm</p>
                </div>
              ) : searchData && searchData.length !== 0 ? (
                <div
                  className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 w-[100%]"
                  ref={searchResultsRef}
                >
                  {searchData.map((i, index) => (
                    <Link to={`/product/${i._id}`} key={i._id}>
                      <div className="w-full flex items-start py-3">
                        <img
                          src={`${i.images[0]}`}
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="flex items-center">
              {!isAuthenticated && (
                <div className="p-3 flex items-center text-black">
                  {!isSeller ? (
                    <React.Fragment>
                      <Link
                        to="/login"
                        className="text-black flex items-center"
                      >
                        <AiOutlineUser className="text-black mr-1 text-xl" />
                        <h1 className="whitespace-nowrap self-center text-sm lg:text-base">
                          Đăng nhập
                        </h1>
                      </Link>
                      <span className="text-black mx-2">/</span>
                      <Link to="/sign-up" className="text-black">
                        <h1 className="whitespace-nowrap self-center text-sm lg:text-base">
                          Đăng ký
                        </h1>
                      </Link>
                    </React.Fragment>
                  ) : (
                    <div className={`${styles.button}`}>
                      <Link to="/dashboard">
                        <h1 className="text-[#fff] flex items-center">
                          Quản lý <IoIosArrowForward className="ml-1" />
                        </h1>
                      </Link>
                    </div>
                  )}
                </div>
              )}
              {isAuthenticated && (
                <div className={`${styles.noramlFlex}`}>
                  <div className="relative cursor-pointer mr-[20px]">
                    {isSeller ? (
                      <div className={`${styles.button}`}>
                        <Link to="/dashboard">
                          <h1 className="text-[#fff] flex items-center">
                            Quản lý <IoIosArrowForward className="ml-1" />
                          </h1>
                        </Link>
                      </div>
                    ) : (
                      <Link to="/profile">
                        <img
                          src={`${user.avatar}`}
                          className="w-[50px] h-[50px] rounded-full"
                          alt=""
                        />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full text-sm bg-[#e4e4e4] h-[40px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* navitems */}
          <div className="mt-4 h-full">
            <div onClick={() => setDropDown(!dropDown)}>
              <div className="relative flex items-center h-8 w-auto mb-7 hidden md:block">
                <button
                  // className={`whitespace-nowrap self-center inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg hover:bg-green-200 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
                  className={`whitespace-nowrap self-center inline-flex items-center p-2 text-sm font-medium text-center hover:text-[#009b49]`}
                >
                  <BiMenuAltLeft size={30} className="mr-2" />
                  Danh mục
                  <IoIosArrowDown
                    size={20}
                    className="ml-2 cursor-pointer"
                    onClick={() => setDropDown(!dropDown)}
                  />
                </button>
                {dropDown ? (
                  <>
                    <div className="absolute top-full left-0 mt-[10px] bg-white shadow-lg rounded-lg">
                      <DropDown
                        categoriesData={categoriesData}
                        setDropDown={setDropDown}
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div className="h-full whitespace-nowrap self-center block mx-auto 800px:w-full 800px:flex 800px:justify-center">
            <Navbar active={activeHeading} />
          </div>
          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              {/* notification */}
              {user?.role === "user" && (
                <div
                  className="relative cursor-pointer mr-[15px]"
                  onMouseEnter={handleMouseEnter}
                  // onMouseLeave={handleMouseLeave}
                >
                  <IoIosNotificationsOutline size={35} color="#333333" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#fff] w-4 h-4 top right p-0 m-0 text-[#009b49] font-mono text-[12px] leading-tight text-center">
                    {orders ? orders.length : 0}
                  </span>

                  {isHovered ? (
                    <div onMouseLeave={handleMouseLeave}>
                      <NotificationBar openNotification={isHovered} />
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={35} color="#333333" />
                <span className="absolute right-0 top-0 rounded-full bg-[#fff] w-4 h-4 top right p-0 m-0 text-[#009b49] font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>
          </div>

          <div className="flex text-sm">
            <div className={`${styles.noramlFlex} `}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={35} color="#333333" />
                <span className="absolute right-0 top-0 rounded-full bg-[#fff] w-4 h-4 top right p-0 m-0 text-[#009b49] font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            {/* <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[20px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar}`}
                      className="w-[50px] h-[50px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={35} color="#de650a" />
                  </Link>
                )}
              </div>
            </div> */}

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-auto py-1 bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenu size={40} className="ml-4" onClick={() => setOpen(true)} />
          </div>
          <div>
            <Link to="">
              <img
                src={logo}
                alt="logo"
                className="max-w-[150px] max-h-[50px] object-contain"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#db3f59] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#db3f59] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <TbArrowBarLeft
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="h-[40px] w-full px-2 border-[#009b49] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchTerm && searchData && searchData.length === 0 ? (
                  <div
                    className="absolute min-h-[6vh] bg-slate-50 shadow-sm-2 z-[2] p-4 w-[100%]"
                    ref={searchResultsRef}
                  >
                    <p className="text-red-500">Không tìm thấy sản phẩm</p>
                  </div>
                ) : searchData && searchData.length !== 0 ? (
                  <div
                    className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 w-[100%]"
                    ref={searchResultsRef}
                  >
                    {searchData.map((i, index) => (
                      <Link to={`/product/${i._id}`} key={i._id}>
                        <div className="w-full flex items-start py-3">
                          <img
                            src={`${i.images[0]}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Tạo cửa hàng <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Đăng nhập /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
