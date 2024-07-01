import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { server } from "../../server";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios
      .get(`${server}/event/admin-all-events`, { withCredentials: true })
      .then((res) => {
        setEvents(res.data.events);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID sự kiện", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Tên sự kiện",
      minWidth: 150,
      flex: 1.4,
    },
    {
      field: "created",
      headerName: "Ngày đăng",
      minWidth: 100,
      flex: 0.6,
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
    //   minWidth: 80,
    //   flex: 0.6,
    // },
    {
      field: "Xem",
      flex: 0.8,
      minWidth: 80,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/event/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,

        created: new Date(item?.createdAt).toLocaleString("vi-VN", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          // hour: "numeric",
          // minute: "numeric",
        }),
      });
    });

  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default AllEvents;
