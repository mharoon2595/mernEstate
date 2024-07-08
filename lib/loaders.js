import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = apiRequest("/post/" + params.id);
  return defer({
    postResponse: res,
  });
};

export const listLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/post?" + query);
  return defer({
    postResponse: postPromise,
  });
};
