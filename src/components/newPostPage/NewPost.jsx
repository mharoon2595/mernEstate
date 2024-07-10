import { useState, useRef, useContext, useEffect, useCallback } from "react";
import Editor from "../../../lib/Quill/Editor.jsx";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { UserContext } from "../../utils/Context.jsx";
import UpdateWidget from "../uploadWidget/UpdateWidget.jsx";
import LoadingSpinner from "../../utils/LoadingSpinner.jsx";

function NewPost() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [range, setRange] = useState();
  const [data, setData] = useState();
  const [lastChange, setLastChange] = useState();
  const [imageIndex, setImageIndex] = useState("");
  const { updatePost, setUpdatePost } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const quillRef = useRef();

  const handleTextChange = useCallback((delta, oldDelta, source) => {
    setLastChange({ delta, oldDelta, source });
  }, []);

  const handleSelectionChange = useCallback((range) => {
    setRange(range);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("image index--->", imageIndex);
  }, [imageIndex]);

  useEffect(() => {
    const fetchFn = async () => {
      if (updatePost) {
        setIsLoading(true);
        try {
          const fetchPosts = await apiRequest("/post/" + updatePost);
          setData(fetchPosts.data);
          setImages(fetchPosts.data.images);
          setIsLoading(false);
        } catch (err) {
          swal("Oops!", "Somthing went wrong while fetching data.", "error");
          setIsLoading(false);
        }
      }
    };
    fetchFn();

    return () => setUpdatePost(false);
  }, []);

  const updateItemAtIndex = (index, newValue) => {
    const newImages = [...images];
    newImages[index] = newValue;
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("desc", quillRef.current.root.innerHTML);
    const inputs = Object.fromEntries(formData);
    setIsLoading(true);
    if (data) {
      try {
        const updateData = await apiRequest.put("/post/" + updatePost, {
          postData: {
            title: inputs.title,
            price: parseInt(inputs.price),
            address: inputs.address,
            city: inputs.city,
            bedroom: parseInt(inputs.bedroom),
            bathroom: parseInt(inputs.bathroom),
            type: inputs.type,
            property: inputs.property,
            latitude: inputs.latitude,
            longitude: inputs.longitude,
            images: images,
          },
          postDetail: {
            desc: inputs.desc,
            utilities: inputs.utilities,
            pet: inputs.pet,
            income: inputs.income,
            size: parseInt(inputs.size),
            school: parseInt(inputs.school),
            bus: parseInt(inputs.bus),
            restaurant: parseInt(inputs.restaurant),
          },
        });
        swal("Alright!", "Details updated successfully!", "success");
        setIsLoading(false);
        navigate("/profile");
      } catch (err) {
        swal("Uh oh", "Somethng went wrong, please try again later", "error");
        setIsLoading(false);
      }
    } else {
      try {
        const res = await apiRequest.post("/post", {
          postData: {
            title: inputs.title,
            price: parseInt(inputs.price),
            address: inputs.address,
            city: inputs.city,
            bedroom: parseInt(inputs.bedroom),
            bathroom: parseInt(inputs.bathroom),
            type: inputs.type,
            property: inputs.property,
            latitude: inputs.latitude,
            longitude: inputs.longitude,
            images: images,
          },
          postDetail: {
            desc: inputs.desc,
            utilities: inputs.utilities,
            pet: inputs.pet,
            income: inputs.income,
            size: parseInt(inputs.size),
            school: parseInt(inputs.school),
            bus: parseInt(inputs.bus),
            restaurant: parseInt(inputs.restaurant),
          },
        });
        await swal("Alright!", "Upload completed successfully!", "success");
        navigate("/details/" + res.data.id);
      } catch (err) {
        setError(error);
      }
    }
  };

  return (
    <>
      <div className="hidden md:flex absolute w-2/5 h-full bg-[#FFDAB9] z-[-1] right-0 top-0"></div>
      <div className="flex flex-col h-full md:flex md:flex-row  md:min-h-[calc(100vh-120px)]">
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="block md:flex md:flex-col md:gap-5 md:w-3/5 md:min-h-full">
          <div className="p-2 w-full">
            <h1 className="text-lg lg:text-2xl font-bold mb-2 px-2">
              {data ? "Update post" : "Add New Post"}
            </h1>
            <div className="w-full p-10">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap justify-between ">
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="title">Title</label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.title}
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="price">Price</label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.price}
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="address">Address</label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.address}
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="desc">Description</label>
                    <Editor
                      ref={quillRef}
                      onSelectionChange={handleSelectionChange}
                      onTextChange={handleTextChange}
                      defaultValue={data && data.postDetail.desc}
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="city">City</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.city}
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="bedroom">Bedroom Number</label>
                    <input
                      min={1}
                      id="bedroom"
                      name="bedroom"
                      type="number"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.bedroom}
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="bathroom">Bathroom Number</label>
                    <input
                      min={1}
                      id="bathroom"
                      name="bathroom"
                      type="number"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.bathroom}
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                      id="latitude"
                      name="latitude"
                      type="text"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.latitude}
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                      id="longitude"
                      name="longitude"
                      type="text"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.longitude}
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2 ">
                    <label htmlFor="type">Type</label>
                    <select
                      name="type"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.type}
                    >
                      <option value="rent" defaultChecked>
                        Rent
                      </option>
                      <option value="buy">Buy</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="type">Property</label>
                    <select
                      name="property"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.property}
                    >
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="condo">Condo</option>
                      <option value="land">Land</option>
                    </select>
                  </div>

                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="utilities">Utilities Policy</label>
                    <select
                      name="utilities"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.postDetail.utilities}
                    >
                      <option value="owner">Owner is responsible</option>
                      <option value="tenant">Tenant is responsible</option>
                      <option value="shared">Shared</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="pet">Pet Policy</label>
                    <select
                      name="pet"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.postDetail.pet}
                    >
                      <option value="allowed">Allowed</option>
                      <option value="not-allowed">Not Allowed</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="income">Income Policy</label>
                    <input
                      id="income"
                      name="income"
                      type="text"
                      placeholder="Income Policy"
                      className="border border-black rounded-md h-10  p-1"
                      defaultValue={data && data.postDetail.income}
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="size">Total Size (sqft)</label>
                    <input
                      min={0}
                      id="size"
                      name="size"
                      type="number"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.postDetail.size}
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="school">School</label>
                    <input
                      min={0}
                      id="school"
                      name="school"
                      type="number"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.postDetail.school}
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="bus">Bus</label>
                    <input
                      min={0}
                      id="bus"
                      name="bus"
                      type="number"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.postDetail.bus}
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="restaurant">Restaurant</label>
                    <input
                      min={0}
                      id="restaurant"
                      name="restaurant"
                      type="number"
                      className="border border-black rounded-md h-10 p-2"
                      defaultValue={data && data.postDetail.restaurant}
                    />
                  </div>
                  <div className="flex flex-col w-[30%] "></div>
                </div>
                <div className="flex flex-col items-center  gap-2  p-3">
                  <button className="bg-sky-400 p-2 rounded-lg">
                    {data ? "Update" : "Add"}
                  </button>
                  <button
                    className="bg-sky-400 p-2 rounded-lg"
                    onClick={() => navigate("/profile")}
                  >
                    Go back
                  </button>
                </div>
                {error && <span>error</span>}
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-2 md:w-2/5 gap-3 md:items-center justify-center md:min-h-full md:p-5">
          {data && (
            <div className="text-center font-semibold">
              Click on images to update it
            </div>
          )}
          <div className=" md:flex md:flex-col justify-center">
            {images.map((image, index) => (
              <img
                src={image}
                key={index}
                alt=""
                className={`my-3 object-fill w-full h-[200px] ${
                  data && "cursor-pointer"
                }`}
                onClick={() => {
                  setImageIndex(index + 1);
                }}
              />
            ))}
            {(imageIndex === 1 ||
              imageIndex === 2 ||
              imageIndex === 3 ||
              imageIndex === 4) && (
              <UpdateWidget
                details={{
                  cloudName: "dcyjq0oe4",
                  uploadPreset: "h8pq36ck",
                  maxFileSize: 5000000,
                  multiple: false,
                  folder: "post",
                }}
                data={true}
                index={imageIndex - 1}
                setState={(index, img) => updateItemAtIndex(index, img)}
                setImageIndex={setImageIndex}
              />
            )}
            {!data && (
              <>
                <div className="flex flex-col  items-center justify-center">
                  <UploadWidget
                    details={{
                      cloudName: "dcyjq0oe4",
                      uploadPreset: "h8pq36ck",
                      maxFiles: 4,
                      maxFileSize: 5000000,
                      multiple: true,
                      folder: "post",
                    }}
                    setState={setImages}
                  />
                  <p className="py-2">(Max. 4 images)</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPost;
