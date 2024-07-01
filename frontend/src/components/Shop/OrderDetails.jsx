import axios from "axios";
import currency from "currency-formatter";
import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { server } from "../../server";
import styles from "../../styles/styles";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  // Hàm tính tổng giá trị theo cửa hàng
  // const calculateShopTotalPrice = (cartItems) => {
  //   return cartItems.reduce(
  //     (total, item) => total + item.discountPrice * item.qty,
  //     0
  //   );
  // };
  // const calculateShopTotalPrice = (cartItems) => {
  //   return cartItems.reduce((total, item) => {
  //     const itemPrice =
  //       item.discountPrice === 0 ? item.originalPrice : item.discountPrice;
  //     return total + itemPrice * item.qty;
  //   }, 0);
  // };

  const calculateShopTotal = (cart, shopId) => {
    return cart.reduce((total, item) => {
      if (item.shopId === shopId) {
        const itemPrice =
          item.discountPrice === 0 ? item.originalPrice : item.discountPrice;
        return total + itemPrice * item.qty;
      }
      return total;
    }, 0);
  };

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Đơn hàng đã được cập nhật!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Đơn hàng đã được cập nhật!");
        dispatch(getAllOrdersOfShop(seller._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  console.log(status);

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Chi tiết đơn hàng</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !rounded-[4px] text-[#fff] font-[600] !h-[45px] text-[18px]`}
          >
            Quay lại
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          ID đơn hàng: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Ngày đặt:{" "}
          <span>
            {new Date(data?.createdAt).toLocaleString("vi-VN", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </span>
        </h5>
      </div>

      {/* Các mặt hàng trong đơn hàng */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5" key={item._id}>
            <img
              src={`${item.images[0]}`}
              alt=""
              className="w-[80x] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                {/* {currency.format(item.discountPrice, { code: "VND" })} x{" "}
                {item.qty} */}
                {/* {item.discountPrice !== 0 ? (
                  <>
                    {item.name} -{" "}
                    <span className="text-[#00000091]">
                      {currency.format(item.discountPrice, { code: "VND" })} x{" "}
                      {item.qty}
                    </span>
                  </>
                ) : (
                  <>
                    {item.name} -{" "}
                    <span className="text-[#00000091]">
                      {currency.format(item.originalPrice, { code: "VND" })} x{" "}
                      {item.qty}
                    </span>
                  </> */}
                {/* )} */}
                {item.discountPrice === 0 ? (
                  <span>
                    {currency.format(item.originalPrice, { code: "VND" })} x{" "}
                    {item.qty}
                  </span>
                ) : (
                  <span>
                    {currency.format(item.discountPrice, { code: "VND" })} x{" "}
                    {item.qty}
                  </span>
                )}
              </h5>
            </div>
          </div>
        ))}

      {/* <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Tổng tiền:{" "}
          <strong>
            {data
              ? `${currency.format(calculateShopTotalPrice(data.cart), {
                  code: "VND"
                })}`
              : null}
          </strong>
        </h5>
      </div> */}
      <div className="border-t w-full text-right">
        {/* {Object.keys(data?.shopTotal).map((shopId, index) => {
    const shopTotalInfo = data?.shopTotal[shopId];
    if ( shopTotalInfo> 0) {
      return (
        <div key={index}>
          <h5 className="pt-3 text-[18px]">
            Tổng tiền đơn hàng:{" "}
            <strong>
              {shopTotalInfo.totalPrice("vi-VN", {
                style: "currency",
                currency: "VND",
              }) + ""}
            </strong>
          </h5>
        </div>
      );
    }
    return null; // Không hiển thị nếu tổng tiền của cửa hàng là 0 hoặc âm
  })} */}
        {Object.keys(data?.shopTotal).map((shopId, index) => {
          const shopTotalInfo = data?.shopTotal[shopId];

          // Kiểm tra nếu có thông tin totalPrice trong shopTotal
          if (shopTotalInfo && shopTotalInfo.totalPrice > 0) {
            const productsInShop = data.cart.filter(
              (product) => product.shopId === shopId
            );

            // Kiểm tra xem có sản phẩm thuộc shop này không
            if (productsInShop.length > 0) {
              const product = productsInShop[0]; // Chọn sản phẩm đầu tiên trong đơn hàng thuộc shop này
              const shopTotal =
                data.shopTotal && data.shopTotal[product.shopId]
                  ? data.shopTotal[product.shopId]
                  : {};
              const totalPrice = shopTotal.totalPrice || 0;

              return (
                <div key={index}>
                  <h5 className="pt-3 text-[18px]">
                    Tổng tiền hàng:{" "}
                    <strong>
                      {totalPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }) + ""}
                    </strong>
                  </h5>
                </div>
              );
            }
          }

          return null;
        })}
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Thông tin giao hàng:</h4>
          <h4 className="pt-3 text-[20px]">
            Tên khách hàng: {data?.shippingAddress?.name}
          </h4>
          <h4 className="pt-3 text-[20px]">
            Địa chỉ: {data?.shippingAddress.address1},{" "}
            {data?.shippingAddress.city}
          </h4>
          <h4 className=" text-[20px]">
            {" "}
            Số điện thoại: +(84) {data?.shippingAddress?.phoneNumber}
          </h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Thông tin thanh toán:</h4>
          {data?.paymentInfo?.type && (
            <h4>Hình thức thanh toán: {data?.paymentInfo?.type}</h4>
          )}
          <h4>
            Trạng thái:{" "}
            {data?.paymentInfo?.status
              ? data?.paymentInfo?.status
              : "Chưa thanh toán"}
          </h4>
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Trạng thái đơn hàng:</h4>
      {data?.status !== "Đang xử lý hoàn tiền" &&
        data?.status !== "Hoàn tiền thành công" && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {[
              "Đang xử lý",
              "Đơn hàng đã giao cho đơn vị vận chuyển",
              "Đơn hàng đang vận chuyển",
              "Đơn hàng đã đến kho gần nhất",
              "Đơn hàng đang trên đường giao đến",
              "Đã giao hàng",
            ]
              .slice(
                [
                  "Đang xử lý",
                  "Đơn hàng đã giao cho đơn vị vận chuyển",
                  "Đơn hàng đang vận chuyển",
                  "Đơn hàng đã đến kho gần nhất",
                  "Đơn hàng đang trên đường giao đến",
                  "Đã giao hàng",
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )}
      {data?.status === "Đang xử lý hoàn tiền" ||
      data?.status === "Hoàn tiền thành công" ? (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
          {["Đang xử lý hoàn tiền", "Hoàn tiền thành công"]
            .slice(
              ["Đang xử lý hoàn tiền", "Hoàn tiền thành công"].indexOf(
                data?.status
              )
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      ) : null}
      <div
        className={`${styles.button} mt-5 !bg-[#0454ffee] !rounded-[4px] text-[#ffffff] font-[600] !h-[45px] text-[18px]`}
        onClick={
          data?.status !== "Đang xử lý hoàn tiền"
            ? orderUpdateHandler
            : refundOrderUpdateHandler
        }
      >
        Cập nhật
      </div>
    </div>
  );
};

export default OrderDetails;
