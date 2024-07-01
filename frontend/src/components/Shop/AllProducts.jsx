import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import currency from "currency-formatter";
import React, { useEffect, useRef, useState } from "react";
import {
  AiFillFileExcel,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import ChartComponentShop from "./ChartComponentShop";
import CreateProduct from "./CreateProduct";
import { toast } from "react-toastify";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const [valStartDay, setValStartDay] = useState("");
  const [valEndDay, setValEndDay] = useState("");
  const [statistic, setStatistic] = useState(false);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const clearRef = useRef();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState("");

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const handleDelete = async () => {
    await dispatch(deleteProduct(productIdToDelete));
    toast.success("Xoá sản phẩm thành công!");
    // window.location.reload();
    dispatch(getAllProductsShop(seller._id));
  };

  const handleUpdate = (id) => {
    const productToUpdate = products.find((product) => product._id === id);
    setSelectedProduct(productToUpdate);
  };
  // Export Excel
  // Tạo dữ liệu cho danh sách đơn hàng với các cột sản phẩm động
  const allProducts = products?.map((allProduct) => {
    const formattedOriginalPrice = allProduct.originalPrice
      ? allProduct.originalPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND"
        })
      : "";

    const formattedDiscountPrice = allProduct.discountPrice
      ? allProduct.discountPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND"
        })
      : "";

    return {
      ["ID sản phẩm"]: allProduct._id,
      ["Tên sản phẩm"]: allProduct.name,
      ["Loại sản phẩm"]: allProduct.category,
      ["Giá gốc"]: formattedOriginalPrice,
      ["Giá khuyến mãi"]: formattedDiscountPrice,
      ["Ngày tạo sản phẩm"]: new Date(allProduct.createdAt).toLocaleString(
        "vi-VN",
        {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric"
        }
      ),
      ["Số lượng"]: allProduct.stock,
      ["Đã bán"]: allProduct.sold_out,
      ["Đánh giá"]: allProduct.ratings
    };
  });

  const handleExport = () => {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString("vi-VN")
      .replaceAll("/", "-"); // Chuyển ngày thành chuỗi có dạng MM-DD-YYYY

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(allProducts);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const fileName = `shop-all-product-${formattedDate}.xlsx`;
    XLSX.writeFile(wb, fileName);
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

  const getAllProducts = products?.filter((item) => {
    const orderDate = new Date(item.createdAt.slice(0, 10));
    return (
      orderDate >= new Date(valStartDay) && orderDate <= new Date(valEndDay)
    );
  });

  const totalProducts = getAllProducts?.length;

  //chart;
  const deliveredProductsInfo = getAllProducts?.map((product) => {
    return {
      day: product.createdAt.slice(0, 10),
      total: 1
    };
  });

  console.log("deliveredProductsInfo", deliveredProductsInfo);
  console.log("getAllProducts", getAllProducts);

  const columns = [
    { field: "id", headerName: "ID sản phẩm", minWidth: 40, flex: 0.6 },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      minWidth: 100,
      flex: 1.0
    },
    {
      field: "originalPrice",
      headerName: "Giá",
      minWidth: 100,
      flex: 0.6
    },
    {
      field: "discountPrice",
      headerName: "Giá khuyến mãi",
      minWidth: 120,
      flex: 0.6
    },
    {
      field: "Stock",
      headerName: "Số lượng",
      type: "number",
      minWidth: 100,
      flex: 0.5
    },
    {
      field: "sold",
      headerName: "Đã bán",
      type: "number",
      minWidth: 100,
      flex: 0.5
    },
    // {
    //   field: "created",
    //   headerName: "Ngày thêm",
    //   type: "number",
    //   minWidth: 100,
    //   flex: 0.8,
    // },
    {
      field: "Xem",
      flex: 0.4,
      minWidth: 50,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      }
    },
    {
      field: "Cập nhật", // New column for Update button
      flex: 0.4,
      minWidth: 50,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard-update-product/${params.id}`}>
              {" "}
              {/* Thay đổi đường dẫn */}
              <Button onClick={() => handleUpdate(params.id)}>
                <AiOutlineEdit size={20} />
              </Button>
            </Link>
          </>
        );
      }
    },
    {
      field: "Xóa",

      flex: 0.4,

      minWidth: 50,

      headerName: "",

      type: "number",

      sortable: false,

      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() =>
                setProductIdToDelete(params.id) || setOpenModal(true)
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
  const row1 = [];
  products &&
    products.forEach((item) => {
      row.unshift({
        id: item._id,
        name: item.name,
        originalPrice: `${currency.format(item.originalPrice, {
          code: "VND"
        })}`,
        discountPrice: `${currency.format(item.discountPrice, {
          code: "VND"
        })}`,
        created: new Date(item?.createdAt).toLocaleString("vi-VN", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric"
        }),
        Stock: item.stock,
        sold: item?.sold_out
      });
    });
  products &&
    getAllProducts.forEach((item) => {
      row1.push({
        id: item._id,
        name: item.name,
        originalPrice: `${currency.format(item.originalPrice, {
          code: "VND"
        })}`,
        discountPrice: `${currency.format(item.discountPrice, {
          code: "VND"
        })}`,
        Stock: item.stock,
        sold: item?.sold_out
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
              onClick={() => setOpen(true)}
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3 bg-[#f61d1deb]`}
            >
              <span className="text-white">Thêm sản phẩm</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && <CreateProduct openForm={open} setOpen={setOpen} />}
          <button
            onClick={handleExport}
            className="text-green-500 px-4 py-2 rounded-lg hover:text-red-500 flex items-center ml-auto"
          >
            <AiFillFileExcel className="mr-2" /> {/* Thêm biểu tượng Excel */}
            Export Excel
          </button>
          <br />
          <div
            style={{
              padding: "20px",
              background: "#F5F5DC"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <h1
                style={{
                  fontSize: "25px",
                  fontFamily: "Roboto",
                  color: " #ccc",
                  lineHeight: "1.25",
                  fontWeight: "500"
                }}
              >
                Thống kê sản phẩm
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
                  width: "100%"
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
                  width: "100%"
                }}
              >
                Thống kê
              </button>
            ) : (
              <></>
            )}
          </div>

          {row1 && statistic && (
            <>
              <DataGrid
                rows={row1}
                columns={columns}
                pageSize={4}
                disableSelectionOnClick
                autoHeight
              />
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  padding: "50px",
                  float: "right"
                }}
              >
                <span>Tổng sản phẩm: </span>
                <span style={{ color: "#294fff" }}>{totalProducts}</span>
              </div>
            </>
          )}

          {statistic && (
            <ChartComponentShop
              arrData={deliveredProductsInfo && deliveredProductsInfo}
              name=" sản phẩm"
            ></ChartComponentShop>
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
              Bạn có chắc chắn muốn xóa sản phẩm này?
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

export default AllProducts;
