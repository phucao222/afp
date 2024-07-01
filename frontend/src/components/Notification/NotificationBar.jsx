import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotificationBar = ({ openNotification }) => {
  const { orders } = useSelector((state) => state.order);

  return (
    <>
      {openNotification && (
        <div
          className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-x-hidden [&::-webkit-scrollbar]:hidden z-20"
          style={{ width: "35rem", maxHeight: "20rem" }}
        >
          <div className="py-2">
            {orders?.map((order) => (
              <div key={order._id}>
                <Link
                  to={`/user/order/${order._id}`}
                  className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"
                >
                  <p className="text-gray-600 text-sm mx-2">
                    <span>Đơn hàng:</span>
                    <span>
                      {order.cart.map((item, index) => (
                        <div key={item._id} className="font-bold">
                          <img
                            src={item.images[0]}
                            alt={`Product ${index + 1}`}
                            className="h-8 w-8 rounded-full object-cover mx-1"
                          />
                          <span>
                            {index > 0 ? ", " : ""}
                            <span className="font-bold">{item.name}</span>
                          </span>
                        </div>
                      ))}
                    </span>
                    <span>của bạn hiện đang </span>
                    <span className="font-bold text-blue-500" href="#">
                      {order.status}
                    </span>
                  </p>
                </Link>
              </div>
            ))}
          </div>
          <Link
            to={`/profile`}
            className="block bg-gray-800 text-white text-center font-bold py-2"
          >
            Xem tất cả thông báo
          </Link>
        </div>
      )}
    </>
  );
};

export default NotificationBar;
