import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
// import EventCard from "./EventCard";
import EventCard from "./EventSuggestCard";
import { Link } from "react-router-dom";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      {!isLoading && (
        <>
          {allEvents.length !== 0 && (
            <>
              <div className={`${styles.section}`}>
                <div
                  className={`${styles.heading} flex justify-between items-center`}
                >
                  <h1>Sự kiện khuyến mãi, giảm giá nổi bật</h1>
                  <Link
                    to={`/events`}
                    className="text-[#fff] font-[700] text-[1rem] hover:text-[#000] ease-linear duration-100 mr-5 bg-[#009b49] py-2 px-3 rounded-3xl"
                  >
                    Xem thêm
                  </Link>
                </div>
              </div>

              {/* <div className="w-full bg-[#f0f6f6] grid h-[55vh] overflow-x-auto hover:overflow-scroll">
                <div className={`${styles.section}`}>
                  <div className="">
                    {" "}
                    {allEvents &&
                      allEvents.map((allEvents, index) => (
                        <EventCard key={index} data={allEvents} />
                      ))}
                  </div>
                </div>
              </div> */}
              <div className={`${styles.section}`}>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12">
                  {allEvents.slice(0, 4).map((allEvents, index) => (
                    // <EventCard key={index} data={allEvents} />
                    <EventCard key={index} data={allEvents} />
                  ))}{" "}
                </div>
              </div>
            </>
          )}
          <h4>{allEvents?.length === 0 && null}</h4>
        </>
      )}
    </div>
  );
};

export default Events;
