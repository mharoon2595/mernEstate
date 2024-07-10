import { useContext, useEffect } from "react";
import { UserContext } from "./Context";

const CustomHook = () => {
  const { popUp, setPopUp } = useContext(UserContext);

  useEffect(() => {
    if (!popUp) {
      const id = setInterval(() => {
        swal(
          "IMPORTANT!",
          "Please enable all cookies and tracking features for account related and chat features to work correctly on this website.",
          "warning"
        );
      }, 1000 * 60 * 60);
      setPopUp(true);

      return () => clearInterval(id);
    }
  }, []);

  return (
    !popUp &&
    swal(
      "IMPORTANT!",
      "Please enable all cookies and tracking features for account related and chat features to work correctly on this website.",
      "warning"
    )
  );
};

export default CustomHook;
