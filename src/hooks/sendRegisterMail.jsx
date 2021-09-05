import { useState } from "react";
import Axios from "Axios";

const sendRegisterMailQuery = (username, password, email, clientURL) => (
{
  SendInvMail: {
    username,
    password,
    email,
    clientURL: clientURL || window.location.origin.toString(),
    siteMessage: "Greetings from Kaku Zuku island!"
  }
}
);

const useRegisterHook = (props) => {
  const { username, password, email, clientURL } = props;
  const [ sended, setSended ] = useState(false);

  const sendRegisterMail = () => {
    (async () => { 
      //  alert("email: " + email + clientURL);
      await Axios.post("", sendRegisterMailQuery(username, password, email, clientURL))
        .then( () => setSended(true))
        .catch((err) => { setSended(false); alert(err.message); });
    })();
  };

  return( { sendRegisterMail, sended } ); 
}

export default useRegisterHook;