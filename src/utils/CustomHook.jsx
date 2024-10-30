import { useContext, useEffect } from "react";
import { UserContext } from "./Context";

const CustomHook = () => {
  const { popUp, setPopUp } = useContext(UserContext);

  useEffect(() => {
    if (!popUp) {
      const id = setInterval(() => {
        swal(
          "IMPORTANT!",
          `${`Please enable all cookies and tracking features for account related and chat features to work correctly on this website. 
 This website will not work properly in incognito mode/private mode in some browsers.`}`,
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
      `${`Please enable all cookies and tracking features for account related and chat features to work correctly on this website. This website will not work properly in incognito/private mode in some browsers.`}`,
      "warning"
    )
  );
};

export default CustomHook;
