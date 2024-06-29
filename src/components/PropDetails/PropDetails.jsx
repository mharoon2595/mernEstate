import React, { Suspense, useContext, useEffect, useState } from "react";
import Snaps from "./Snaps";
import PropDesc from "./PropDesc";
import Map from "../Map/Map";
import { Await, useLoaderData, useNavigate, useParams } from "react-router-dom";
import bed from "../../assets/bed.png";
import size from "../../assets/size.png";
import bath from "../../assets/bath.png";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { UserContext } from "../../utils/Context";
import apiRequest from "../../../lib/apiRequest";

const PropDetails = () => {
  const post = useLoaderData();
  const params = useParams();
  const [data, setData] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const userData = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log(params.id);

  useEffect(() => {
    if (data) {
      setIsSaved(true);
    }
  }, [data]);

  const saveHandler = async () => {
    setIsLoading(true);
    if (!userData.loggedIn) {
      navigate("/signin");
    } else {
      const dispatch = await apiRequest.post("/user/save/" + params.id);
      console.log(dispatch);
      if (dispatch.data.message === "Post removed from saved list") {
        setIsSaved(false);
        setIsLoading(false);
      } else {
        setIsSaved(true);
        setIsLoading(false);
      }
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner asOverlay />}>
      <Await
        resolve={post.postResponse}
        errorElement={
          <p className="mx-5">Error fetching data, please try again.</p>
        }
      >
        {(postResponse) => {
          const { title, address, price, user, postDetail } = postResponse.data;
          console.log(postResponse.data);
          setData(postResponse.data.isSaved);
          return (
            <>
              <div className="hidden md:flex absolute w-2/5 h-full bg-[#FFDAB9] z-[-1] right-0 top-0"></div>
              <div className="flex flex-col h-full md:flex-row md:min-h-[calc(100vh-120px)]">
                <div className="block md:flex md:flex-col md:gap-5 md:w-3/5 md:min-h-full">
                  <Snaps images={postResponse.data.images} />
                  <PropDesc
                    title={title}
                    address={address}
                    price={price}
                    user={user}
                    postDetail={postDetail}
                  />
                </div>
                <div className="block p-2 md:flex md:flex-col md:w-2/5 gap-3 md:min-h-full md:p-5">
                  <div>General</div>
                  <div className="bg-white p-2 rounded-md flex flex-col gap-5">
                    <div>
                      <p className="font-bold">Utilities</p>
                      <p>
                        {postResponse.data.postDetail.utilities === "owner"
                          ? "Owner is responsible"
                          : "Tenant is responsible"}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">Pet policy</p>
                      <p>
                        {postResponse.data.postDetail.pet === "allowed"
                          ? "Pets are allowed"
                          : "Pets are not allowed"}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">Income policy</p>
                      <p>{postResponse.data.postDetail.income}</p>
                    </div>
                  </div>
                  <div>Room sizes</div>
                  <div className="flex justify-between">
                    <div className="flex gap-2 p-2 bg-white rounded-md items-center">
                      <img src={size} className="w-5 h-5" alt="size icon" />
                      <div>{`${postResponse.data.postDetail.size} sq.m`}</div>
                    </div>
                    <div className="flex gap-2 p-2 bg-white rounded-md items-center">
                      <img src={bed} className="w-5 h-5" alt="bed icon" />
                      <div>
                        {postResponse.data.bedroom === 1
                          ? "1 bedroom"
                          : `${postResponse.data.bedroom} bedrooms`}
                      </div>
                    </div>
                    <div className="flex gap-2 p-2 bg-white rounded-md items-center">
                      <img src={bath} className="w-5 h-5" alt="bath icon" />
                      <div>
                        {postResponse.data.bathroom === 1
                          ? "1 bathroom"
                          : `${postResponse.data.bathroom} bathrooms`}
                      </div>
                    </div>
                  </div>
                  <div>Nearby places</div>
                  <div className="bg-white p-3 flex justify-between rounded-md">
                    <div>
                      <p>School</p>
                      <p>250m away</p>
                    </div>
                    <div>
                      <p>Bus stop</p>
                      <p>100m away</p>
                    </div>
                    <div>
                      <p>Restaurant</p>
                      <p>200m away</p>
                    </div>
                  </div>
                  <div>Location</div>
                  <div className="h-full">
                    <Map data={[postResponse.data]} />
                  </div>
                  <div className="flex justify-between">
                    <button className="bg-white border-2 border-yellow-300 p-3 rounded-md">
                      Send a message
                    </button>
                    <button
                      className={`${
                        isSaved && userData.loggedIn
                          ? "bg-yellow-500"
                          : "bg-white"
                      } border-2 border-yellow-300 p-3 rounded-md relative`}
                      onClick={saveHandler}
                    >
                      {isLoading && <LoadingSpinner asOverlay />}
                      {isSaved && userData.loggedIn
                        ? "Place saved"
                        : "Save this place"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default PropDetails;
