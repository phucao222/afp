import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createevent } from "../../redux/actions/event";

const CreateEvent = ({ openForm, setOpen }) => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  // const [originalPrice, setOriginalPrice] = useState();
  // const [discountPrice, setDiscountPrice] = useState();
  // const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate.toISOString.slice(
      0,
      10
    );
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Sự kiện tạo thành công!");
      navigate("/dashboard-events");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    // newForm.append("category", category);
    newForm.append("tags", tags);
    // newForm.append("originalPrice", originalPrice);
    // newForm.append("discountPrice", discountPrice);
    // newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    // newForm.append("start_Date", startDate.toISOString());
    // newForm.append("Finish_Date", endDate.toISOString());
    dispatch(createevent(newForm));
  };

  return (
    openForm && (
      <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
        <div className="w-[90%] 800px:w-[40%] h-[80vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden bg-white rounded-md shadow p-4">
          <div className="w-full flex justify-end">
            <RxCross1
              size={30}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <h5 className="text-[30px] font-Poppins text-center">
            Tạo sự kiện, khuyến mãi
          </h5>
          {/* create event form */}
          <form onSubmit={handleSubmit}>
            <br />
            <div>
              <label className="pb-2">
                Tên sự kiện <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setName(e.target.value)}
                placeholder="Thêm tên sự kiện..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Mô tả <span className="text-red-500">*</span>
              </label>
              <ReactQuill
                value={description}
                onChange={(value) => setDescription(value)}
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline", "strike"], // toggled buttons
                    ["blockquote", "code-block"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    [{ align: [] }],
                    ["clean"] // remove formatting button
                  ]
                }}
                placeholder="Mô tả sự kiện, nội dung..."
              />
            </div>

            <br />
            <div>
              <label className="pb-2">Tags</label>
              <input
                type="text"
                name="tags"
                value={tags}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setTags(e.target.value)}
                placeholder="Thêm tag cho sản phẩm khuyến mãi..."
              />
            </div>
            <br />
            <br />
            <div>
              <label className="pb-2">Hình ảnh</label>
              <input
                type="file"
                name=""
                id="upload"
                className="hidden"
                multiple
                onChange={handleImageChange}
              />
              <div className="w-full flex items-center flex-wrap">
                <label htmlFor="upload">
                  <AiOutlinePlusCircle
                    size={30}
                    className="mt-3"
                    color="#555"
                  />
                </label>
                {images &&
                  images.map((i) => (
                    <img
                      src={URL.createObjectURL(i)}
                      key={i}
                      alt=""
                      className="h-[120px] w-[120px] object-cover m-2"
                    />
                  ))}
              </div>
              <br />
              <div>
                <input
                  type="submit"
                  value="Thêm sự kiện"
                  className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateEvent;
