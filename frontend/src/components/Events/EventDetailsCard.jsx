import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { server } from "../../server";
import styles from "../../styles/styles";
import SuggestedEvent from "./SuggestedEvent";
const EventDetailsCard = ({ setOpen }) => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const { allEvents } = useSelector((state) => state.events);

  useEffect(() => {
    async function fetchEventData() {
      try {
        const response = await axios.get(`${server}/event/get-event/${id}`);
        const event = response.data.event;
        setEventData(event);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    }

    fetchEventData();
  }, [id]);

  const filteredSuggestEvents = allEvents?.filter((event) => event._id !== id);

  // const formatDate = (date) => {
  //   const inputDate = typeof date === "string" ? new Date(date) : date;

  //   if (
  //     Object.prototype.toString.call(inputDate) !== "[object Date]" ||
  //     isNaN(inputDate.getTime())
  //   ) {
  //     return "Invalid Date";
  //   }

  //   const day = inputDate.getUTCDate();
  //   const month = inputDate.getUTCMonth() + 1;
  //   const year = inputDate.getUTCFullYear();

  //   const formattedDate = `${day < 10 ? "0" : ""}${day}-${
  //     month < 10 ? "0" : ""
  //   }${month}-${year}`;

  //   return formattedDate;
  // };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };
  return (
    <div className="flex items-center bg-[#efefef]">
      {eventData ? (
        <div
          className={`${styles.section} 800px:w-[80%] mx-auto bg-white rounded-lg my-4 shadow-md`}
        >
          <div className="w-full flex items-center flex-col">
            <h1
              className={`${styles.productTitle} text-[30px] text-center my-4 mt-8 uppercase`}
            >
              {eventData.name}
            </h1>

            <div className="w-full flex items-center flex-col gap-2 p-4 px-8">
              <div className="font-semibold text-[#1b4462]">
                Sự kiện được tạo bởi:
                <Link
                  to={`/shop/preview/${eventData?.shop._id}`}
                  className="text-[#c96665]"
                >
                  {" " + eventData.shop.name}
                </Link>
              </div>

              <div className="font-semibold">
                Ngày đăng:
                <span className="text-[#c96665]">
                  {/* {" " + eventData.createdAt.slice(0, 10)} */}
                  {" " + formatDate(eventData.createdAt)}
                </span>
              </div>
            </div>

            <div className="mx-auto flex items-center">
              <div className="p-8 pt-0">
                <p
                  className="text-[18px] text-[#1b4462] text-justify leading-8"
                  dangerouslySetInnerHTML={{ __html: eventData.description }}
                ></p>
              </div>
            </div>
          </div>
          {allEvents && <SuggestedEvent data={filteredSuggestEvents} />}
        </div>
      ) : null}
    </div>
  );
};

export default EventDetailsCard;
