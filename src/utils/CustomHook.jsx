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
            Also, please wait for the "user connected to socket server" message to be able to chat live. If it does not pop up after logging in, please refresh the page.`}`,
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
      `${`Please enable all cookies and tracking features for account related and chat features to work correctly on this website. 
        Also, please wait for the "socket connection established" message to be able to chat live. If it does not pop up soon, please refresh the page.`}`,
      "warning"
    )
  );
};

export default CustomHook;
