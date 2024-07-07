import React, { Suspense, useState, useEffect } from "react";
import Filter from "./Filter";
import Data from "./Data";
import Map from "../Map/Map";
import { Await, useLoaderData } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { useAsyncError } from "react-router-dom";

const AsyncErrorHandler = ({ map, setIsLoading }) => {
  const error = useAsyncError();
  useEffect(() => {
    setIsLoading && setIsLoading(false);
  }, [setIsLoading]);

  return (
    <p className="p-2 mx-2">
      {map ? "Error loading map." : "Error loading posts!"}
    </p>
  );
};

const ListPage = () => {
  const data = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);
  const [resolvedData, setResolvedData] = useState(null);

  useEffect(() => {
    if (resolvedData !== null) {
      setIsLoading(false);
    }
  }, [resolvedData]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="flex flex-col-reverse lg:flex-row gap-2 px-3 lg:px-14 w-full lg:h-[calc(100vh-140px)]">
        <div className="lg:w-3/5">
          <Filter setIsLoading={setIsLoading} />
          <Suspense fallback={<LoadingSpinner asOverlay />}>
            <Await
              resolve={data.postResponse}
              errorElement={<AsyncErrorHandler setIsLoading={setIsLoading} />}
            >
              {(postResponse) => {
                setResolvedData(postResponse);

                return <Data data={postResponse.data} />;
              }}
            </Await>
          </Suspense>
        </div>
        <div className="w-full lg:w-2/5 h-[25vh] lg:h-full">
          <Suspense fallback={<LoadingSpinner asOverlay />}>
            <Await
              resolve={data.postResponse}
              errorElement={
                <AsyncErrorHandler map setIsLoading={setIsLoading} />
              }
            >
              {(postResponse) => {
                return <Map data={postResponse.data} />;
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ListPage;
