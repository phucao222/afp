import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
// import "react-quill/dist/quill.snow.css";
import { RxCross1 } from "react-icons/rx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";

const CreateProduct = ({ openForm, setOpen }) => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [requireImg, setRequireImg] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Thêm sản phẩm thành công!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  console.log(images);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      setRequireImg(true);
      return;
    }
    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    // newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    dispatch(createProduct(newForm));
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
            Thêm sản phẩm
          </h5>
          {/* create product form */}
          <form onSubmit={handleSubmit}>
            <br />
            <div>
              <label className="pb-2">
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên sản phẩm..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Mô tả <span className="text-red-500">*</span>
              </label>
              <ReactQuill
                value={description}
                onChange={setDescription}
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline", "strike"], // toggled buttons
                    ["blockquote", "code-block"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    [{ align: [] }],
                    ["clean"], // remove formatting button
                  ],
                }}
                placeholder="Thêm mô tả sản phẩm..."
              />
            </div>

            <br />
            <div>
              <label className="pb-2">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full mt-2 border h-[35px] rounded-[5px]"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Choose a category">Chọn danh mục SP</option>
                {categoriesData &&
                  categoriesData.map((i) => (
                    <option value={i.title} key={i.title}>
                      {i.title}
                    </option>
                  ))}
              </select>
            </div>
            <br />
            {/* <div>
              <label className="pb-2">Tags</label>
              <input
                type="text"
                name="tags"
                value={tags}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setTags(e.target.value)}
                placeholder="Thêm tag cho sản phẩm..."
              />
            </div>
            <br /> */}
            <div>
              <label className="pb-2">
                Giá gốc <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={originalPrice}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="Thêm giá gốc của sản phẩm (Gía chưa áp dụng khuyến mãi)!"
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Số lượng sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="soluong"
                value={stock}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setStock(e.target.value)}
                placeholder="Thêm số lượng sản phẩm..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Hình ảnh <span className="text-red-500">*</span>
              </label>
              {requireImg && (
                <p className="text-red-500">
                  Vui lòng thêm ít nhất một hình ảnh.
                </p>
              )}
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
                  images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt=""
                        className="h-[120px] w-[120px] object-cover m-2"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="bg-red-500 text-white rounded-md p-1 m-2"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
              </div>
              <br />
              <div>
                <input
                  type="submit"
                  value="Thêm sản phẩm"
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

export default CreateProduct;
