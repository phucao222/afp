import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState, useRef } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import currency from "currency-formatter";
import { AiFillFileExcel } from "react-icons/ai";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import ChartComponentAdmin from "./ChartComponentAdmin";

const AllProducts = () => {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [valStartDay, setValStartDay] = useState("");
  const [valEndDay, setValEndDay] = useState("");
  const [statistic, setStatistic] = useState(false);
  const dispatch = useDispatch();

  const clearRef = useRef();

  useEffect(() => {
    axios
      .get(`${server}/product/admin-all-products`, { withCredentials: true })
      .then((res) => {
        setData(res.data.products);
      });
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
  const getAllProducts = data?.filter((item) => {
    const orderDate = new Date(item.createdAt.slice(0, 10));
    return (
      orderDate >= new Date(valStartDay) && orderDate <= new Date(valEndDay)
    );
  });
      //chart;
      const deliveredProductsInfo = getAllProducts?.map((product) => {
        return {
          day: product.createdAt.slice(0, 10),
          total: 1,
        };
      });
  
      console.log("deliveredProductsInfo", deliveredProductsInfo);
      console.log("getAllProducts", getAllProducts);  
  

  const totalProducts = getAllProducts?.length;

  const allProducts = data?.map((allProduct) => {
    const formattedOriginalPrice = allProduct.originalPrice
    ? allProduct.originalPrice.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    : "";


  const formattedDiscountPrice = allProduct.discountPrice
    ? allProduct.discountPrice.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    : "";
    return {
      ["ID sản phẩm"]: allProduct._id,
      ["Tên sản phẩm"]: allProduct.name,
      ["Loại sản phẩm"]: allProduct.category,
      ["Giá gốc"]: formattedOriginalPrice,
      ["Giá khuyến mãi"]: formattedDiscountPrice,
      ["Ngày tạo sản phẩm"]: new Date(allProduct.createdAt).toLocaleString("vi-VN", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
      ["Số lượng"]: allProduct.stock,
      ["Đã bán"]: allProduct.sold_out,
      ["Đánh giá"]: allProduct.ratings,
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
 
    const fileName = `admin-all-product-${formattedDate}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };
  const columns = [
    { field: "id", headerName: "ID sản phẩm", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      minWidth: 180,
      flex: 1.4
    },
    //{
    //   field: "price",
    //   headerName: "Giá",
    //   minWidth: 100,
    //   flex: 0.6
    // },
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
      minWidth: 80,
      flex: 0.5
    },


    {
      field: "sold",
      headerName: "Đã bán",
      type: "number",
      minWidth: 130,
      flex: 0.6
    },


    {
      field: "Xem",
      flex: 0.8,
      minWidth: 100,
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
    }
  ];


  const row = [];


  data &&
    data.forEach((item) => {
      row.push({
      //   id: item._id,
      //   name: item.name,
      //   price: `${currency.format(item.discountPrice, {
      //     code: "VND"
      //   })}`,
      //   Stock: item.stock,
      //   sold: item?.sold_out
      // });
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
        minute: "numeric",
      }),
      Stock: item.stock,
      sold: item?.sold_out,
    });
    });


  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={8}
          disableSelectionOnClick
          autoHeight
        />
                    <button
              onClick={handleExport}
              className="text-green-500 px-4 py-2 rounded-lg hover:text-red-500 flex items-center ml-auto">
              <AiFillFileExcel className="mr-2" /> {/* Thêm biểu tượng Excel */}
              Export Excel
            </button>
            <br/>
            <div
              style={{
                padding: "20px",
                background: "#F5F5DC",
              }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                <h1 style={{
                  fontSize: '25px',
                  fontFamily: 'Roboto',
                  color: ' #ccc',
                  lineHeight: '1.25', 
                  fontSize: '18px', 
                  fontWeight: '500',
                  color: '#00000085',
                }}>
                  Thống kê sản phẩm 
                </h1>
                <div>
                  <label>Ngày bắt đầu: </label>
                  <input
                    style={{ border: "1px solid black" }}
                    value={valStartDay}
                    ref={clearRef}
                    type="date"
                    onChange={handleStartDayChange}></input>
                  <label style={{ marginLeft: "50px" }}>Ngày kết thúc: </label>
                  <input
                    style={{ border: "1px solid black" }}
                    className="border border-solid border-red-500"
                    type="date"
                    value={valEndDay}
                    ref={clearRef}
                    onChange={handleEndDayChange}></input>
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
                  }}>
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
                  }}>
                  Thống kê
                </button>
              ) : (
                <></>
              )}
            </div>
  
            { statistic && (
              <>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    padding: "50px",
                    float: "right",
                  }}>
                  <span>Tổng sản phẩm: </span>
                  <span style={{ color: "#294fff" }}>{totalProducts}</span>
                </div>
              </>
            )}
             {statistic && (
            <ChartComponentAdmin
              arrData={deliveredProductsInfo && deliveredProductsInfo}
              name="sản phẩm"></ChartComponentAdmin>
          )}
      </div>
    </>
  );
};


export default AllProducts;