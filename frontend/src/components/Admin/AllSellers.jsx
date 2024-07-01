import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@material-ui/core";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios, { all } from "axios";
import { backend_url, server } from "../../server";
import { toast } from "react-toastify";
import { getAllSellers } from "../../redux/actions/sellers";
import { Link } from "react-router-dom";
import ChartComponentAdmin from "./ChartComponentAdmin";
import { AiFillFileExcel } from "react-icons/ai";
import * as XLSX from "xlsx";

const AllSellers = () => {
  const [valStartDay, setValStartDay] = useState("");
  const [valEndDay, setValEndDay] = useState("");
  const [statistic, setStatistic] = useState(false);
  const dispatch = useDispatch();
  const { sellers } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/shop/delete-seller/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });

    dispatch(getAllSellers());
  };
  //Thống kê doanh thu

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

// excel 

const allSellers = sellers?.map((allSeller) => {
  // const sellerColumns = generateSellerColumns(allSeller);
  return {
    ["ID người bán"]: allSeller._id,
    ["Tên người bán"]: allSeller.name,
    ["Email"]: allSeller.email,
    ["Địa chỉ"]: allSeller.address,
    ["Tổng tiền"]: allSeller.availableBalance.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    }) + "",
    ["Ngày tham gia"]: new Date(allSeller.createdAt).toLocaleString("vi-VN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }),
  };
});

const handleExport = () => {
  const currentDate = new Date();
  const formattedDate = currentDate
    .toLocaleDateString("vi-VN")
    .replaceAll("/", "-"); // Chuyển ngày thành chuỗi có dạng MM-DD-YYYY

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(allSellers);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const fileName = `admin-all-seller-${formattedDate}.xlsx`;
  XLSX.writeFile(wb, fileName);
};



  const getAllSeller = sellers?.filter((item) => {
    const orderDate = new Date(item.createdAt.slice(0, 10));
    return (
      orderDate >= new Date(valStartDay) && orderDate <= new Date(valEndDay)
    );
  });
  //chart;
  const deliveredOrdersInfo = getAllSeller?.map((order) => {
    return {
      day: order.createdAt.slice(0, 10),
      total: 1,
    };
  });
  const totalSeller = getAllSeller?.length;
  console.log("getAllSeller", getAllSeller);

  const columns = [

    { field: "id", headerName: "ID người bán", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "Tên cửa hàng",
      minWidth: 90,
      flex: 0.8,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 1.2,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "availableBalance",
      headerName: "Tổng tiền",
      type: "Number",
      minWidth: 120,
      flex: 0.6,
    },
    {
      field: "joinedAt",
      headerName: "Ngày tham gia",
      type: "text",
      minWidth: 120,
      flex: 0.6,
    },
    {
      field: "  ",
      flex: 0.5,
      minWidth: 80,
      headerName: "Xem",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/shop/preview/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: " ",
      flex: 0.5,
      minWidth: 80,
      headerName: "Xóa",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];
  const row = [];
  const row1 = [];
  sellers &&
    sellers.forEach((item) => {
      row.push({
        id: item._id,
        name: item?.name,
        email: item?.email,
        availableBalance: item.availableBalance.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }) + "",
        joinedAt: new Date(item?.createdAt).toLocaleString("vi-VN", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
        
        address: item.address,

      });
    });
  getAllSeller &&
    getAllSeller.forEach((item) => {
      row1.push({
        id: item._id,
        name: item?.name,
        email: item?.email,
        availableBalance: item.availableBalance.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }) + "",
        joinedAt: new Date(item?.createdAt).toLocaleString("vi-VN", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
        address: item.address,
      });
    });

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">Danh sách người bán</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
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
          {/* Thống kê */}
          <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                    background: "#F5F5DC",
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
                Thống kê người bán
              </h1>
 
                  <div>
                    <label>Ngày bắt đầu: </label>
                    <input
                      style={{ border: "1px solid black" }}
                      value={valStartDay}
                      type="date"
                      onChange={handleStartDayChange}></input>
                    <label style={{ marginLeft: "50px" }}>Ngày kết thúc: </label>
                    <input
                      style={{ border: "1px solid black" }}
                      className="border border-solid border-red-500"
                      type="date"
                      value={valEndDay}
                      onChange={handleEndDayChange}></input>
                    {/* <button onClick={handleSubmit}>Thống kê</button> */}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "30px",
                    background:"#F5F5DC",
                  }}>
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
          {statistic && (
            <DataGrid
              rows={row1}
              columns={columns}
              pageSize={5}
              disableSelectionOnClick
              autoHeight
            />
          )}
          <div
            style={{
              fontSize: "20px",
              fontWeight: "700",
              padding: "50px",
              float: "right",
            }}>
            {statistic && (
              <div>
                <span>Tổng số lượng người bán: </span>
                <span style={{ color: "#294fff" }}>{totalSeller}</span>
              </div>
            )}
          </div>

          {statistic && (
            <ChartComponentAdmin
              arrData={deliveredOrdersInfo && deliveredOrdersInfo}
              name="người bán"></ChartComponentAdmin>
          )}
        </div>
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Bạn có chắc muốn xóa người bán này?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}>
                  Không
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() => setOpen(false) || handleDelete(userId)}>
                  Có
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSellers;