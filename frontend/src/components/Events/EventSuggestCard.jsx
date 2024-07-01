import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";

const EventSuggestCard = ({ data, isEvent }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  console.log(data);
  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer overflow-hidden border">
        <div className="flex justify-end"></div>
        <Link to={`/event/${data._id}`} onClick={handleClick}>
          <img
            src={`${data.images && data.images[0]}`}
            alt=""
            className="w-[auto] block mr-[auto] ml-[auto] h-[155px] object-contain rounded-[4px]"
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>
            {" "}
            {data.shop.name.length > 20
              ? data.shop.name.slice(0, 15) + "..."
              : data.shop.name}
          </h5>
        </Link>
        <Link to={`/event/${data._id}`} onClick={handleClick}>
          <h4 className="pb-3 font-[500] ">
            {/* {data.name.length > 35 ? data.name.slice(0, 27) + "..." : data.name} */}
            {data.name}
          </h4>

          {/* <div className="flex items-center">
            <VscLocation className=" text-red-400 h-6 w-6 mr-2" />
            <p className="text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {data?.shop?.address}
            </p>
          </div> */}
        </Link>
        {data.description.length > 200 ? (
          <p
            className="mt-4 font-[300] text-[13px]"
            dangerouslySetInnerHTML={{
              __html: data.description.slice(0, 150) + "..."
            }}
          ></p>
        ) : (
          <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
        )}
      </div>
    </>
  );
};

export default EventSuggestCard;
