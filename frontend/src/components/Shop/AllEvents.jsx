import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import CreateEvent from "./CreateEvent";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
const AllEvents = () => {
  const [open, setOpen] = useState(false);
  const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState("");

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);

  const handleDelete = async () => {
    await dispatch(deleteEvent(eventIdToDelete));
    toast.success("Xoá sự kiện thành công!");
    dispatch(getAllEventsShop(seller._id));
  };

  const columns = [
    { field: "id", headerName: "ID sự kiện", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Tên bài viết",
      minWidth: 180,
      flex: 1.4
    },
    {
      field: "created",
      headerName: "Ngày đăng",
      minWidth: 100,
      flex: 0.6
    },
    // {
    //   field: "Stock",
    //   headerName: "Số lượng",
    //   type: "number",
    //   minWidth: 80,
    //   flex: 0.5,
    // },

    // {
    //   field: "sold",
    //   headerName: "Đã bán",
    //   type: "number",
    //   minWidth: 130,
    //   flex: 0.6,
    // },
    {
      field: "Xem",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // const d = params.row.name;
        // const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            {/* <Link to={`/product/${product_name}`}> */}
            <Link to={`/event/${params.id}`}>
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
                setOpenModal(true) || setEventIdToDelete(params.id)
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

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        // price: `${currency.format(item.discountPrice, {
        //   code: "VND",
        // })}`,
        created: new Date(item?.createdAt).toLocaleString("vi-VN", {
          year: "numeric",
          month: "numeric",
          day: "numeric"
          // hour: "numeric",
          // minute: "numeric",
        })
        // Stock: item.stock,
        // sold: item.sold_out,
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
              <span className="text-white">Tạo sự kiện, khuyến mãi</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {/* create event form */}
          {open && <CreateEvent openForm={open} setOpen={setOpen} />}
        </div>
      )}
      {openModal && (
        <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
          <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
            <div className="w-full flex justify-end cursor-pointer">
              <RxCross1 size={25} onClick={() => setOpenModal(false)} />
            </div>
            <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
              Bạn có chắc chắn muốn xóa sự kiện này?
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

export default AllEvents;
