import { DataGrid } from "@material-ui/data-grid";
import currency from "currency-formatter";
import React, { useEffect, useState } from "react";
import {
  AiOutlineDollar,
  AiOutlineShop,
  AiOutlineShopping,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import { getAllSellers } from "../../redux/actions/sellers";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import ChartComponentAdmin from "./ChartComponentAdmin";

const AdminDashboardMain = () => {
  const [valStartDay, setValStartDay] = useState("");
  const [valEndDay, setValEndDay] = useState("");
  const [statistic, setStatistic] = useState(false);

  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );
  const { sellers } = useSelector((state) => state.seller);
  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, []);

  const handleStartDayChange = (e) => {
    setValStartDay(e.target.value);
  };
  const handleEndDayChange = (e) => {
    setValEndDay(e.target.value);
  };
  const handleStartDayClick = () => {
    setValEndDay("");
    setValStartDay("");
    setStatistic(false);
  };
  const handleStatistic = () => {
    setStatistic(true);
  };

  const getAllProducts = adminOrders?.filter((item) => {
    const orderDate = new Date(item.deliveredAt?.slice(0, 10));
    return (
      orderDate >= new Date(valStartDay) &&
      orderDate <= new Date(valEndDay) &&
      item.status === "Đã giao hàng"
    );
  });

  //chart
  console.log("getAllProducts", getAllProducts);

  const deliveredOrdersInfo = getAllProducts
    ?.map((order) => {
      const products = order.cart.map((item) => {
        const itemPrice =
          item.discountPrice !== 0 ? item.discountPrice : item.originalPrice;

        return {
          day: order.deliveredAt.slice(0, 10),
          total: itemPrice * item.qty,
        };
      });

      return products;
    })
    .flat();
  console.log("deliveredOrdersInfo", deliveredOrdersInfo);

  const arrProductDelivered = adminOrders?.filter((item) => {
    return item.status === "Đã giao hàng";
  });

  console.log("adminOrders", adminOrders);

  // Tiền ship đơn hàng
  const calculateShopTotalPrice = (order) => {
    // Lấy giá trị của totalPrice và shopShip từ shopTotal
    const product = order.cart[0]; // Chọn sản phẩm đầu tiên trong đơn hàng
    const shopTotal =
      order.shopTotal && order.shopTotal[product.shopId]
        ? order.shopTotal[product.shopId]
        : {};
    // const totalPrice = shopTotal.totalPrice || 0;
    const shopShip = shopTotal.shopShip || 0;

    // Tính tổng của totalPrice và shopShip
    const totalAmount = shopShip;

    return totalAmount;
  };
  const totalShopShip = getAllProducts?.reduce((total, order) => {
    const shopTotalPrice = calculateShopTotalPrice(order);
    return total + shopTotalPrice;
  }, 0);
  console.log("tien ship", totalShopShip);

  // Tổng doanh thu
  const sumOder = getAllProducts?.reduce((total, order) => {
    const orderTotal = order.cart.reduce((orderTotal, item) => {
      const shopTotal = order.shopTotal[item.shopId] || {};
      const totalPrice = shopTotal.totalPrice || 0;
      const shopShip = shopTotal.shopShip || 0;
      const totalAmount = totalPrice + shopShip;

      return totalAmount;
    }, 0);

    return total + orderTotal;
  }, 0);

  console.log("Tổng doanh thu", sumOder);

  const totalOrder = getAllProducts?.length;

  const sumOdertotalrevenue = getAllProducts?.reduce((total, order) => {
    const orderTotal = order.cart.reduce((orderTotal, item) => {
      const shopTotal = order.shopTotal[item.shopId] || {};
      const totalPrice = shopTotal.totalPrice || 0;
      const totalAmount = totalPrice;

      return totalAmount;
    }, 0);

    return total + orderTotal;
  }, 0);

  const totalRevenue = sumOdertotalrevenue * 0.05 + totalShopShip;

  console.log("Tổng tiền kiếm được", totalRevenue);

  // tiền kiếm được
  //  const adminEarning =
  //    adminOrders &&
  //    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.05, 0);
  // const adminEarning =
  //   adminOrders &&
  //   adminOrders.reduce((acc, order) => {
  //     // Calculate shopTotal for the first product in the order's cart
  //     const product = order.cart[0];
  //     const shopTotal = order.shopTotal && order.shopTotal[product.shopId] ? order.shopTotal[product.shopId] : {};
  //     const totalPrice = shopTotal.totalPrice || 0;
  //     const shopShip = shopTotal.shopShip || 0;

  //     // Add shopTotal * 0.05 + shopShip to the accumulator
  //     return acc + (totalPrice * 0.05 + shopShip);
  //   }, 0);

  const adminEarning =
    adminOrders &&
    adminOrders.reduce((acc, order) => {
      // Check if the order has status "Delivered"
      if (order.status === "Đã giao hàng") {
        // Calculate shopTotal for the first product in the order's cart
        const product = order.cart[0];
        const shopTotal =
          order.shopTotal && order.shopTotal[product.shopId]
            ? order.shopTotal[product.shopId]
            : {};
        const totalPrice = shopTotal.totalPrice || 0;
        const shopShip = shopTotal.shopShip || 0;
        // const shopTotail = totalPrice;
        // Add shopTotal * 0.05 + shopShip to the accumulator
        return acc + (totalPrice * 0.05 + shopShip);
      }

      return acc; // If status is not "Delivered", return the accumulator unchanged
    }, 0);
  const adminBalance = adminEarning?.toFixed(2);

  const columns = [
    { field: "id", headerName: "ID đơn hàng", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Tình trạng",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã giao hàng"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "ShopName",
      headerName: "Tên của hàng",
      type: "number",
      minWidth: 130,
      flex: 0.8,
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
      headerName: "Tổng tiền",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Ngày đặt",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];

  // adminOrders &&
  //   adminOrders.forEach((order) => {
  //     order.cart.forEach((item) => {
  //       row.push({
  //         id: item._id,
  //         itemsQty: item.qty,
  //         total: item.totalPrice.toLocaleString("vi-VN", {
  //           style: "currency",
  //           currency: "VND",
  //         }),
  //         status: order.status,
  //         createdAt: new Date(order.createdAt).toLocaleString("vi-VN", {
  //           year: "numeric",
  //           month: "numeric",
  //           day: "numeric",
  //           hour: "numeric",
  //           minute: "numeric",
  //         }),
  //         ShopName: item.shop?.name,
  //       });
  //     });
  //   });

  //  adminOrders &&
  //    adminOrders.forEach((item) => {
  //      row.push({
  //        id: item._id,
  //        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
  //        // total:
  //        //   item?.totalPrice?.toLocaleString("vi-VN", {
  //        //     style: "currency",
  //        //     currency: "VND",
  //        //   }) + "",
  //        total: `${currency.format(calculateShopTotalPrice(item.cart), {
  //          code: "VND",
  //        })}`,
  //        status: item?.status,
  //        createdAt: new Date(item?.createdAt).toLocaleString("vi-VN", {
  //          year: "numeric",
  //          month: "numeric",
  //          day: "numeric",
  //          hour: "numeric",
  //          minute: "numeric",
  //        }),
  //        ShopName: item?.cart?.[0]?.shop?.name,
  //      });
  //    });
  adminOrders &&
    adminOrders.forEach((item) => {
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
      console.log("tiền ship shop", shopShip);

      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),

        total: totalAmount,
        status: item?.status,
        createdAt: new Date(item?.createdAt).toLocaleString("vi-VN", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
        ShopName: item?.cart?.[0]?.shop?.name,
      });
    });

  return (
    <>
      {adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4">
          <h3 className="text-[22px] font-Poppins pb-2">Tổng quan</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-[#17a2b8] shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineDollar size={30} className="mr-2" fill="white" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-white`}
                >
                  Tổng thu nhập
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] text-white">
                {currency.format(adminBalance, {
                  code: "VND",
                })}
              </h5>
              <h5 className="pt-4 pl-2 text-[#000000]">
                <span className="invisible">a</span>
              </h5>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-[#28A745] shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineShop size={30} className="mr-2" fill="white" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-white`}
                >
                  Quản lý người bán hàng
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] text-white">
                {sellers && sellers.length}
              </h5>
              <Link to="/admin-sellers">
                <h5 className="pt-4 pl-2 text-[#000000]">
                  Xem danh sách cửa hàng
                </h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-[#f6960b] shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineShopping size={30} className="mr-2" fill="white" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-white`}
                >
                  Đơn hàng
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] text-white">
                {adminOrders && adminOrders.length}
              </h5>
              <Link to="/admin-orders">
                <h5 className="pt-4 pl-2 text-[#000000]">
                  Xem danh sách đơn hàng
                </h5>
              </Link>
            </div>
          </div>
          <br />
          <h3 className="text-[22px] font-Poppins pb-2">Thống kê</h3>
          <div
            style={{
              padding: "20px",
              background: "#F5F5DC",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h1
                style={{
                  fontSize: "25px",
                  fontFamily: "Roboto",
                  color: " #ccc",
                  lineHeight: "1.25",
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "#00000085",
                }}
              >
                Thống kê doanh thu
              </h1>
              <div>
                <label>Ngày bắt đầu: </label>
                <input
                  style={{ border: "1px solid black" }}
                  value={valStartDay}
                  type="date"
                  onChange={handleStartDayChange}
                ></input>

                <label style={{ marginLeft: "50px" }}>Ngày kết thúc: </label>
                <input
                  style={{ border: "1px solid black" }}
                  className="border border-solid border-red-500"
                  type="date"
                  value={valEndDay}
                  onChange={handleEndDayChange}
                ></input>
              </div>
            </div>
            {statistic && (
              <>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    padding: "20px",
                    display: "inline-block",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span>Tổng đơn hàng: </span>
                    <span style={{ color: "#294fff" }}>{totalOrder}</span>
                  </div>
                  <div>
                    <span>Tổng doanh thu: </span>
                    <span style={{ color: "#294fff" }}>
                      {sumOder?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }) + ""}
                    </span>
                  </div>
                  <div>
                    <span>Tổng tiền kiếm được: </span>
                    <span style={{ color: "#294fff" }}>
                      {totalRevenue?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }) + ""}
                    </span>
                  </div>
                </div>
              </>
            )}
            {statistic ? (
              <button
                onClick={handleStartDayClick}
                style={{
                  color: "#294fff",
                  fontSize: "20px",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                Tiếp tục thống kê
              </button>
            ) : (
              <></>
            )}
            {valEndDay ? (
              <button
                onClick={handleStatistic}
                style={{
                  color: "#294fff",
                  fontSize: "20px",
                  display: statistic ? "none" : "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                Thống kê
              </button>
            ) : (
              <></>
            )}
          </div>
          {statistic && (
            <ChartComponentAdmin
              arrData={deliveredOrdersInfo && deliveredOrdersInfo}
              name="doanh thu"
            ></ChartComponentAdmin>
          )}
          <br />
          <h3 className="text-[22px] font-Poppins pb-2">Đơn hàng gần nhất</h3>

          <div className="w-full min-h-[45vh] bg-white rounded">
            <DataGrid
              rows={row} // Sử dụng danh sách đã sắp xếp
              columns={columns}
              pageSize={4}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
};
export default AdminDashboardMain;
