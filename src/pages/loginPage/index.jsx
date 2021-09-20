// import "../pages.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuthData } from "hooks/authData";
import UserCard from "components/UserCard.jsx";
import { IonItem, IonLabel, IonCheckbox, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonCol, IonIcon } from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { FaUser, FaEyeSlash, FaEye } from "react-icons/fa";

import "./login.scss";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: undefined, password: undefined });
  const { authData, getKey, clearKey } = useAuthData();
  const [okceMalo, setOkceMalo] = useState("password");
  const history = useHistory();

  const onChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  return (
    <div id="login-box">
      {!authData.OK && (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonRow>
                <IonCol size={10}>
                  <label id="login-box-title">User login</label>
                </IonCol>
                <IonCol size={2}>
                  <div id="loginBoxOkceButton" onClick={() => setOkceMalo(okceMalo === "text" ? "password" : "text")} >
                    <IonIcon
                      slot="icon-only"
                      color="tertiary"
                      size="large"
                      icon={okceMalo === "text" ? eye : eyeOff}
                    />
                  </div>
                </IonCol>
              </IonRow>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>

            <IonLabel position="floating">Username</IonLabel>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formData?.username}
              onChange={onChange}
              autofocus
              className="loginInput"
            />
            <FaUser className="ifa" />

            <IonLabel position="floating">Password</IonLabel>
            <input
              id="password"
              name="password"
              placeholder="Password"
              type={okceMalo}
              autocomplete="on"
              value={formData?.password || ""}
              onChange={onChange}
              className="loginInput"
            />
            <span className="ifa">
              {okceMalo === "text" ? <FaEye /> : <FaEyeSlash />}
            </span>

            <IonItem lines="none">
              <IonLabel>Remember me</IonLabel>
              <IonCheckbox defaultChecked={true} slot="start" />
            </IonItem>

            {authData.error && (
              <div className="alert alert-danger" role="alert">
                {authData.message}
              </div>
            )}
            <IonRow>
              <IonCol>
                <IonButton
                  id="submitButton"
                  onClick={(ev) => getKey(ev, formData)}
                >
                  Login
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  id="registerButton"
                  color="secondary"
                  onClick={() => history.push("/register")}
                >
                  Register
                </IonButton>
              </IonCol>
            </IonRow>
            {/* <ReactJson src={{ formData_password: formData.password }} /> */}
          </IonCardContent>
        </IonCard>
      )}
      {authData.OK && (
        <div id="login-box">
          <UserCard userID={authData.data.id} logout={clearKey} />
        </div>
      )}
    </div>
  );
};

export default LoginForm;
