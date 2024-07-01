import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {" "}
      <>
        {data && data?.status === "Đang xử lý" ? (
          <h1 className="text-[20px]">Đơn hàng đang được xử lý.</h1>
        ) : data?.status === "Đơn hàng đã giao cho đơn vị vận chuyển" ? (
          <h1 className="text-[20px]">
            Đơn hàng của bạn đang trên đường giao cho đối tác giao hàng.
          </h1>
        ) : data?.status === "Đơn hàng đang vận chuyển" ? (
          <h1 className="text-[20px]">
            Đơn đặt hàng của bạn đang được vận chuyển với đối tác giao hàng của
            chúng tôi.
          </h1>
        ) : data?.status === "Đơn hàng đã đến kho gần nhất" ? (
          <h1 className="text-[20px]">
            Đơn hàng đã đến khu vực của bạn và chuẩn bị giao hàng.
          </h1>
        ) : data?.status === "Đơn hàng đang trên đường giao đến" ? (
          <h1 className="text-[20px]">Đang giao hàng.</h1>
        ) : data?.status === "Đã giao hàng" ? (
          <h1 className="text-[20px]">Đơn hàng đã được giao!</h1>
        ) : data?.status === "Đang xử lý hoàn tiền" ? (
          <h1 className="text-[20px]">
            Yêu cầu trả hàng và hoàn tiền đang được xử lý!
          </h1>
        ) : data?.status === "Hoàn tiền thành công" ? (
          <h1 className="text-[20px]">Trả hàng và hoàn tiền thành công!</h1>
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;
