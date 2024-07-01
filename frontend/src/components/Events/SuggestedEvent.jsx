import EventCard from "./EventCard";
import EventSuggestCard from "./EventSuggestCard";
import { useSelector } from "react-redux";

import styles from "../../styles/styles";

const SuggestedEvent = ({ data }) => {
  // const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Sự kiện khác
          </h2>
          {/* <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] 
          lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12"> */}
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12">
            {data &&
              data.map((i, index) => <EventSuggestCard data={i} key={index} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedEvent;
