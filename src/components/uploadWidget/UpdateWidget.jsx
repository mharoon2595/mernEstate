import React, { useEffect, useCallback } from "react";

const UpdateWidget = ({ details, setState, data, index, setImageIndex }) => {
  const openWidget = useCallback(() => {
    const myWidget = window.cloudinary.createUploadWidget(
      details,
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);

          setState(index, result.info.secure_url);
        }
      }
    );

    myWidget.open();
  }, [details, setState, data, index]);

  useEffect(() => {
    if (data) {
      openWidget();
    }

    return () => setImageIndex("");
  }, [data, openWidget]);

  return null; // No need to render anything for this component
};

export default UpdateWidget;
