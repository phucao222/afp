import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { server } from "../../server";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { Link } from "react-router-dom";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupouns, setCoupouns] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [couponIdToDelete, setCouponIdToDelete] = useState("");
  // const [minAmount, setMinAmout] = useState(null);
  // const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [value, setValue] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  // const [quantity, setQuantity] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true
      })
      .then((res) => {
        setIsLoading(false);
        setCoupouns(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch, seller._id]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/coupon/delete-coupon/${couponIdToDelete}`, {
        withCredentials: true
      })
      .then((res) => {
        toast.success("Xóa mã giảm giá thành công!");
      });
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          // minAmount,
          // maxAmount,
          selectedProducts,
          value,
          quantity,
          shopId: seller._id
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Đã tạo mã giảm giá thành công!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "ID mã giảm giá", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Mã giảm giá",
      minWidth: 180,
      flex: 1.4
    },
    {
      field: "price",
      headerName: "Giá trị",
      minWidth: 100,
      flex: 0.6
    },
    {
      field: "quantity",
      headerName: "Số lượng mã",
      minWidth: 120,
      flex: 0.8
    },
    {
      field: "remainingQuantity",
      headerName: "Số lượng đã dùng",
      minWidth: 150,
      flex: 0.8
    },
    {
      field: "Xem sản phẩm",
      flex: 0.4,
      minWidth: 50,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const productName = params.row.nameProduct; 
        return (
          <>
            <Link to={`/product/${productName}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      }
    },
    {
      field: "Xóa",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() =>
                setCouponIdToDelete(params.id) || setOpenModal(true)
              }
            >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      }
    }
  ];

  const row = [];

  coupouns &&
  coupouns.forEach((item) => {
    
    row.push({
      id: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.value + " %",
      nameProduct: item.selectedProducts,
      remainingQuantity: item.remainingQuantity,
    });
  });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3]`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Thêm mã giảm giá</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] h-[80vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden bg-white rounded-md shadow p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Thêm mã giảm giá
                </h5>
                {/* create coupoun code */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Thêm tên mã giảm giá..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Phần trăm giảm (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="value"
                      value={value}
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Nhập % giảm giá (% < 100%)..."
                    />
                  </div>
                  <br />
                  {/* Số lượng mã giảm giá */}
                  <div>
                    <label className="pb-2">
                      Số lượng mã giảm giá{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={quantity}
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Nhập số lượng mã giảm giá..."
                    />
                  </div>
                  <br />
                  {/* <div>
                    <label className="pb-2">Số tiền tổi thiểu</label>
                    <input
                      type="number"
                      name="value"
                      value={minAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMinAmout(e.target.value)}
                      placeholder="Nhập số tiền tối thiểu có thể giảm giá..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Số tiền tối đa</label>
                    <input
                      type="number"
                      name="value"
                      value={maxAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Nhập số tiền tối đa có thể giảm giá..."
                    />
                  </div> */}
                  {/* <br /> */}
                  <div>
                    <label className="pb-2">
                      Chọn sản phẩm có thể áp dụng mã giảm giá
                    </label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      name="selectedProduct"
                      value={selectedProducts}
                      required
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="Choose your selected products">
                        Chọn sản phẩm
                      </option>
                      {products &&
    products.map((i) => (
      <option value={i._id} key={i._id}>
        {i.name}
      </option>
    ))}

                      {/* {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))} */}
                    </select>
                  </div>
                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Tạo mã giảm giá"
                      className="mt-2 appearance-none block w-full px-3 h-[35px] bg-[#050505bd] text-[#fff] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      {openModal && (
        <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
          <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
            <div className="w-full flex justify-end cursor-pointer">
              <RxCross1 size={25} onClick={() => setOpenModal(false)} />
            </div>
            <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
              Bạn có chắc chắn muốn xóa mã giảm giá này?
            </h3>
            <div className="w-full flex items-center justify-center">
              <div
                className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                onClick={() => setOpenModal(false)}
              >
                Không
              </div>
              <div
                className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                onClick={() => setOpenModal(false) || handleDelete()}
              >
                Có
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllCoupons;
