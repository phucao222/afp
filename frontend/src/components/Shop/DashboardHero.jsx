import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GiMoneyStack } from "react-icons/gi";
import { IoFileTrayStackedOutline } from "react-icons/io5";
import { RiBillLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";
import ChartComponentShop from "./ChartComponentShop";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const [valStartDay, setValStartDay] = useState("");
  const [valEndDay, setValEndDay] = useState("");
  const [statistic, setStatistic] = useState(false);
  const targetRef = useRef();
  const clearRef = useRef();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const availableBalance =
    seller?.availableBalance.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    }) + "";

  console.log("availableBalance", availableBalance);

  const scrollToTarget = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };

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

  // tổng cộng
  // const calculateShopTotalPrice = (cartItems) => {

  //   return cartItems.reduce(
  //     (total, item) => total + item.discountPrice * item.qty,
  //     0
  //   );
  // };
  const calculateShopTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => {
      const itemPrice =
        item.discountPrice === 0 ? item.originalPrice : item.discountPrice;
      return total + itemPrice * item.qty;
    }, 0);
  };

  const getAllProducts = orders?.filter((item) => {
    const orderDate = new Date(item.createdAt.slice(0, 10));
    return (
      orderDate >= new Date(valStartDay) &&
      orderDate <= new Date(valEndDay) &&
      item.status === "Đã giao hàng"
    );
  });
  console.log("getAllProducts", getAllProducts);

  //chart

  const deliveredOrdersInfo = getAllProducts
    ?.map((order) => {
      const products = order.cart.map((item) => {
        const itemPrice =
          item.discountPrice !== 0 ? item.discountPrice : item.originalPrice;
        return {
          day: order.deliveredAt.slice(0, 10),
          total: itemPrice * item.qty - itemPrice * item.qty * 0.05,
        };
      });

      return products;
    })
    .flat();

  console.log("deliveredOrdersInfo", deliveredOrdersInfo);

  //Tổng doanh thu
  const sumOder = getAllProducts?.reduce((total, order) => {
    const orderTotal = order.cart.reduce((orderTotal, item) => {
      const itemPrice =
        item.discountPrice !== 0 ? item.discountPrice : item.originalPrice;
      return orderTotal + itemPrice * item.qty;
    }, 0);

    return total + orderTotal;
  }, 0);

  const totalRevenue = sumOder - sumOder * 0.05;

  console.log("sumOder", sumOder);

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
      //thêm
      // valueGetter: (params) => {
      //   const orderId = params.getValue(params.id, "id");
      //   const order = orders.find((item) => item._id === orderId);
      //   return `${currency.format(calculateShopTotalPrice(order.cart), {
      //     code: "VND"
      //   })}`;
      // }
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
            <Link to={`/order/${params.id}`}>
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
  // orders &&
  //   orders.forEach((item) => {
  //     row.push({
  //       id: item._id,
  //       itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
  //       status: item.status
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
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: totalPrice,
        status: item?.status,
      });
    });

  return (
    <div className="w-full p-8 bg-[#f1f5f9]">
      <h3 className="text-[22px] font-Poppins pb-2">Tổng quan</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 bg-[#17a2b8] text-white 800px:w-[30%] min-h-[20vh] shadow rounded px-2 py-5">
          <div className="flex items-center">
            <GiMoneyStack size={30} className="mr-2" fill="white" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-white`}
            >
              Thu nhập (5% phí dịch vụ) <span className="text-[16px]"></span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] text-white">
            {availableBalance}
          </h5>

          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#000000]">Yêu cầu rút tiền</h5>
          </Link>
        </div>

        <div className="w-full mb-4 bg-[#28A745] 800px:w-[30%] min-h-[20vh] shadow rounded px-2 py-5">
          <div className="flex items-center">
            <RiBillLine size={30} className="mr-2" fill="white" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-white`}
            >
              Đơn hàng
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] text-white">
            {orders && orders.length}
          </h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#000000]">Danh sách đơn hàng</h5>
          </Link>
        </div>

        <div className="w-full mb-4 bg-[#f6960b] 800px:w-[30%] min-h-[20vh] shadow rounded px-2 py-5">
          <div className="flex items-center">
            <IoFileTrayStackedOutline
              size={30}
              className="mr-2 text-white"
              fill="white"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-white`}
            >
              Sản phẩm
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] text-white">
            {products && products.length}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#000000]">Danh sách sản phẩm</h5>
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
              ref={clearRef}
              type="date"
              onChange={handleStartDayChange}
            ></input>
            <label style={{ marginLeft: "50px" }}>Ngày kết thúc: </label>
            <input
              style={{ border: "1px solid black" }}
              className="border border-solid border-red-500"
              type="date"
              value={valEndDay}
              ref={clearRef}
              onChange={handleEndDayChange}
            ></input>
            {/* <button onClick={handleSubmit}>Thống kê</button> */}
          </div>
        </div>
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
        {statistic && (
          <>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "700",
                padding: "50px",
                float: "right",
              }}
            >
              <span>Tổng doanh thu: </span>
              <span style={{ color: "#294fff" }}>
                {totalRevenue
                  ? totalRevenue?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }) + ""
                  : "0 đ"}
              </span>
            </div>
          </>
        )}
      </div>
      {statistic && deliveredOrdersInfo && (
        <ChartComponentShop
          arrData={deliveredOrdersInfo && deliveredOrdersInfo}
          name="doanh thu"
        ></ChartComponentShop>
      )}
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Đơn hàng mới nhất</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={6}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default DashboardHero;
