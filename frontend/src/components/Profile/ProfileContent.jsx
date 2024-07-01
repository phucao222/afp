import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { Country, State } from "country-state-city";
import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { server } from "../../server";
import styles from "../../styles/styles";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate phoneNumber format
    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      toast.error("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại!");
      return;
    }

    dispatch(updateUserInformation(name, email, phoneNumber, password));
    toast.success("Thông tin cá nhân đã được cập nhật thành công!");
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(loadUser());
        toast.success("Cập nhật avatar thành công!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Họ và tên:</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Số điện thoại: (+84)</label>

                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    placeholder="+84"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="whitespace-nowrap overflow-hidden overflow-ellipsis block pb-2">
                    Nhập mật khẩu để thay đổi thông tin{" "}
                  </label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border text-center text-[#eeeeee] font-bold rounded-[8px] mt-8 bg-[#2374e1] cursor-pointer`}
                required
                value="Cập nhật"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const columns = [
    { field: "id", headerName: "ID đơn hàng", minWidth: 150, flex: 0.7 },
    {
      field: "image",
      headerName: "Hình ảnh",
      minWidth: 150,
      flex: 0.7,
      sortable: false,
      renderCell: (params) => {
        const order = orders.find((order) => order._id === params.id);
        const firstProductImage = order?.cart[0]?.images[0];
        return (
          <img
            src={`${firstProductImage}`}
            alt="Product"
            style={{ width: "50px", height: "50px" }}
          />
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã giao hàng"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => {
        const order = orders.find((order) => order._id === params.id);
        const totalItemsQty = order?.cart.reduce(
          (total, product) => total + product.qty,
          0
        );
        return totalItemsQty || 0; // Trả về 0 nếu không có sản phẩm
      },
    },
    {
      field: "shopTotal",
      headerName: "Tổng cộng",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 50,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  orders &&
    orders.forEach((item) => {
      const product = item.cart[0]; // Chọn sản phẩm đầu tiên trong đơn hàng

      // Lấy giá trị của totalPrice và shopShip từ shopTotal
      const shopTotal =
        item.shopTotal && item.shopTotal[product.shopId]
          ? item.shopTotal[product.shopId]
          : {};
      const totalPrice = shopTotal.totalPrice || 0;
      const shopShip = shopTotal.shopShip || 0;

      // Tính tổng của totalPrice và shopShip
      const totalAmount = totalPrice + shopShip;

      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        status: item.status,
        shopTotal: totalAmount,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const eligibleOrders =
    orders &&
    orders.filter(
      (item) =>
        item.status === "Đang xử lý hoàn tiền" ||
        item.status === "Hoàn tiền thành công"
    );
  // const eligibleOrders =
  //   orders && orders.filter((item) => item.status === "Processing refund");
  const columns = [
    { field: "id", headerName: "ID đơn hàng", minWidth: 150, flex: 0.7 },
    {
      field: "image",
      headerName: "Hình ảnh",
      minWidth: 150,
      flex: 0.7,
      sortable: false,
      renderCell: (params) => {
        const order = orders.find((order) => order._id === params.id);
        const firstProductImage = order?.cart[0]?.images[0];
        return (
          <img
            src={`${firstProductImage}`}
            alt="Product"
            style={{ width: "50px", height: "50px" }}
          />
        );
      },
    },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã giao hàng"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Tổng cộng",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  // eligibleOrders &&
  //   eligibleOrders.forEach((item) => {
  //     row.push({
  //       id: item._id,
  //       itemsQty: item.cart.length,
  //       // total: "US$ " + item.totalPrice,
  //       total: `${currency.format(item.totalPrice, { code: "VND" })}`,
  //       status: item.status,
  //     });
  //   });
  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      const product = item.cart[0]; // Chọn sản phẩm đầu tiên trong đơn hàng

      // Lấy giá trị của totalPrice và shopShip từ shopTotal
      const shopTotal =
        item.shopTotal && item.shopTotal[product.shopId]
          ? item.shopTotal[product.shopId]
          : {};
      const totalPrice = shopTotal.totalPrice || 0;
      const shopShip = shopTotal.shopShip || 0;

      // Tính tổng của totalPrice và shopShip
      const totalAmount = totalPrice;

      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        status: item.status,
        total: totalAmount,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    { field: "id", headerName: "ID đơn hàng", minWidth: 150, flex: 0.7 },
    {
      field: "image",
      headerName: "Hình ảnh",
      minWidth: 150,
      flex: 0.7,
      sortable: false,
      renderCell: (params) => {
        const order = orders.find((order) => order._id === params.id);
        const firstProductImage = order?.cart[0]?.images[0];
        return (
          <img
            src={`${firstProductImage}`}
            alt="Product"
            style={{ width: "50px", height: "50px" }}
          />
        );
      },
    },
    // {
    //   field: "status",
    //   headerName: "Trạng thái",
    //   minWidth: 130,
    //   flex: 0.7,
    //   cellClassName: (params) => {
    //     return params.getValue(params.id, "status") === "Delivered"
    //       ? "greenColor"
    //       : "redColor";
    //   }

    // },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã giao hàng"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Tổng cộng",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  // orders &&
  //   orders.forEach((item) => {
  //     row.push({
  //       id: item._id,
  //       itemsQty: item.cart.length,
  //       // total: "US$ " + item.totalPrice,
  //       total: `${currency.format(item.totalPrice, { code: "VND" })}`,
  //       status: item.status,
  //     });
  //   });
  // orders &&
  //   orders.forEach((item) => {
  //     const product = item.cart[0]; // Chọn sản phẩm đầu tiên trong đơn hàng
  //     const price = product.discountPrice !== 0 ? product.discountPrice : product.originalPrice;

  //     row.push({
  //       id: item._id,
  //       itemsQty: item.cart.length,
  //       total: currency.format(price * product.qty, { code: "VND" }),
  //       status: item.status,
  //     });
  //   });
  orders &&
    orders.forEach((item) => {
      const product = item.cart[0]; // Chọn sản phẩm đầu tiên trong đơn hàng

      // Lấy giá trị của totalPrice và shopShip từ shopTotal
      const shopTotal =
        item.shopTotal && item.shopTotal[product.shopId]
          ? item.shopTotal[product.shopId]
          : {};
      const totalPrice = shopTotal.totalPrice || 0;
      const shopShip = shopTotal.shopShip || 0;

      // Tính tổng của totalPrice và shopShip
      const totalAmount = totalPrice + shopShip;

      row.push({
        id: item._id,
        itemsQty: item.cart.length,

        total: totalAmount,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        // toast.success(res.data.success);
        toast.success("Đổi mật khẩu thành công!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Đổi mật khẩu
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Nhập mật khẩu cũ</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Nhật mật khẩu mới</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Nhập lại mật khẩu mới</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("VN");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const addressTypeData = [
    {
      name: "Mặc định",
    },
    {
      name: "Nhà, nơi thường trú",
    },
    {
      name: "Văn phòng, nơi làm việc",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Vui lòng điền vào tất cả các mục!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          // address2,
          // zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      // setAddress2("");
      // setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Thêm địa chỉ
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Khu vực:</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        chọn khu vực
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Thành phố, tỉnh thành:</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        chọn thành phố, tỉnh thành
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">
                      Địa chỉ 1 (Điền đầy đủ: số nhà, tên đường, phường, xóm,
                      huyện, xã, phường thành phố)
                    </label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  {/* <div className="w-full pb-2">
                    <label className="block pb-2">Địa chỉ dự phòng (Điền đầy đủ: số nhà, tên đường, phường, xóm, huyện, xã, phường thành phố)</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div> */}

                  {/* <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div> */}

                  <div className="w-full pb-2">
                    <label className="block pb-2">Loại địa chỉ</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Chọn loại địa chỉ
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Địa chỉ của tôi
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Thêm địa chỉ mới</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1}
              </h6>
            </div>
            {/* <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div> */}
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          Bạn chưa cập nhật địa chỉ nào!!!
        </h5>
      )}
    </div>
  );
};
export default ProfileContent;
