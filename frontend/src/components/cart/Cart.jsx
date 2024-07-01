import currency from "currency-formatter";
import React, { useState } from "react";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import styles from "../../styles/styles";
const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  // const totalPrice = cart.reduce(
  //   (acc, item) => acc + item.qty * item.discountPrice,
  //   0

  // );
  const totalPrice = cart.reduce((acc, item) => {
    const itemPrice =
      item.discountPrice === 0 ? item.originalPrice : item.discountPrice;
    return acc + item.qty * itemPrice;
  }, 0);

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed mt-2 top-0 right-0.5 w-[75%] h-[96%] 800px:w-[30%] md:w-[35%] 700px:w-[80%] rounded-md bg-white flex flex-col overflow-x-auto justify-between shadow-sm">
        {/* <div className="absolute top-2 right-0 mt-2 bg-white rounded-md md:w-[35%] 700px:w-[80%] shadow-lg overflow-x-auto z-20 w-[75%] h-[95%]">      */}
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Giỏ hàng trống !</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} Sản phẩm{" "}
                </h5>
              </div>

              {/* cart Single Items */}

              <div className="w-full border-t">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>
            <br />
            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Mua (
                    {`${
                      " " + currency.format(totalPrice, { code: "VND" }) + " "
                    }`}
                    )
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const itemPrice =
    data.discountPrice !== 0 ? data.discountPrice : data.originalPrice;
  const totalPrice = itemPrice * value;

  const remainingStock = data.stock; // Lấy số lượng sản phẩm còn lại

  const increment = (data) => {
    if (remainingStock < value + 1) {
      toast.error("Sản phẩm không đủ số lượng!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{data.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${data?.images[0]}`}
          alt=""
          className="w-[80px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px] w-[90%]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            {`${currency.format(itemPrice, { code: "VND" })}`} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            {`${currency.format(totalPrice, { code: "VND" })}`}
          </h4>
        </div>
        <TiDeleteOutline
          size={40}
          color="#f00202"
          className="cursor-pointer rounded-[0%]"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
