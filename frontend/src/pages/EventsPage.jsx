import React from "react";
import { useSelector } from "react-redux";
// import EventCard from "../components/Events/EventCard";
import EventCard from "../components/Events/EventSuggestCard";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Loader from "../components/Layout/Loader";
import PageNotfound from "./PageNotfound";
import styles from "../styles/styles";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  console.log(allEvents.length);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allEvents && allEvents?.length === 0 ? (
            <PageNotfound />
          ) : (
            <>
              <div className={`${styles.section} my-8`}>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12">
                  {allEvents.map((allEvents, index) => (
                    // <EventCard key={index} data={allEvents} />
                    <EventCard key={index} data={allEvents} />
                  ))}{" "}
                </div>
              </div>
            </>
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default EventsPage;
