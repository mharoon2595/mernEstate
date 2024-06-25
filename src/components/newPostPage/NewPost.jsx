import { useState, useRef } from "react";
import Editor from "../../../lib/Quill/Editor.jsx";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function NewPost() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const quillRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("desc", quillRef.current.root.innerHTML);
    const inputs = Object.fromEntries(formData);

    console.log(inputs);

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
      console.log(res.data);
      await swal("Alright!", "Upload completed successfully!", "success");
      navigate("/details/" + res.data.id);
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <>
      <div className="hidden md:flex absolute w-2/5 h-full bg-[#FFDAB9] z-[-1] right-0 top-0"></div>
      <div className="flex flex-col h-full md:flex md:flex-row  md:min-h-[calc(100vh-120px)]">
        <div className="block md:flex md:flex-col md:gap-5 md:w-3/5 md:min-h-full">
          <div className="p-2 w-full">
            <h1 className="text-lg lg:text-2xl font-bold mb-2 px-2">
              Add New Post
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
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="price">Price</label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      className="border border-black rounded-md h-10 p-2"
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="address">Address</label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      className="border border-black rounded-md h-10 p-2"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="desc">Description</label>
                    <Editor
                      ref={quillRef}
                      onSelectionChange={setRange}
                      onTextChange={setLastChange}
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="city">City</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      className="border border-black rounded-md h-10 p-2"
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
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                      id="latitude"
                      name="latitude"
                      type="text"
                      className="border border-black rounded-md h-10 p-2"
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                      id="longitude"
                      name="longitude"
                      type="text"
                      className="border border-black rounded-md h-10 p-2"
                    />
                  </div>
                  <div className="flex flex-col w-[30%] gap-[5px] my-2 ">
                    <label htmlFor="type">Type</label>
                    <select
                      name="type"
                      className="border border-black rounded-md h-10 p-2"
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
                      className="border border-black rounded-md h-10 p-2 p-1"
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
                    />
                  </div>
                  <div className="flex flex-col w-[30%] "></div>
                </div>
                <div className="flex justify-center p-3">
                  <button className="bg-sky-400 p-2 rounded-lg">Add</button>
                </div>
                {error && <span>error</span>}
              </form>
            </div>
          </div>
        </div>
        <div className="block p-2 md:w-2/5 gap-3 md:items-center md:justify-center md:min-h-full md:p-5">
          <div className=" md:flex md:flex-col justify-center">
            {images.map((image, index) => (
              <img
                src={image}
                key={index}
                alt=""
                className="my-3 object-fill w-full h-[200px]"
              />
            ))}
            <UploadWidget
              details={{
                cloudName: "dcyjq0oe4",
                uploadPreset: "h8pq36ck",
                maxFileSize: 5000000,
                multiple: true,
                folder: "post",
              }}
              setState={setImages}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPost;
