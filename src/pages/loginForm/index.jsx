import "../pages.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import useValiHook from "../../hooks/formValidation";

import * as yup from "yup";

import { useAuthData } from "../../hooks/authData";
import UserCard from "../../components/userCard.jsx";
import { IonInput,  IonItem,  IonLabel,  IonCheckbox,  IonButton,  IonCard,  IonCardHeader,  IonCardTitle,  IonCardContent,  IonRow,  IonCol,} from "@ionic/react";
import { useQueryClient } from "react-query";

let valSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginForm = () => {

  const [formData, setFormData] = useState({ username: "", password: "" });
  const { onBlur, errors } = useValiHook({ valSchema, formData });
  const { authData, getKey, clearKey } = useAuthData();
  const history = useHistory();

  //const queryClient = useQueryClient();
  
  const logOutHandle = () => {
    // window.location.reload();
    history.go(0)
    clearKey();
  };

  const onChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  return (
    <div id="login-box">
      {!authData.OK && (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <div id="login-box-title">User login</div>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="floating">Username</IonLabel>
              <IonInput
                size="sm"
                id="username"
                name="username"
                type="text"
                value={formData?.username}
                onIonChange={onChange}
                className={errors?.username ? "is-invalid" : ""}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                size="sm"
                id="password"
                name="password"
                type="password"
                value={formData?.password || ""}
                onIonChange={onChange}
                onBlur={onBlur}
                className={errors?.password ? "is-invalid" : ""}
              />
            </IonItem>
            <IonItem lines="none">
              <IonLabel>Remember me</IonLabel>
              <IonCheckbox defaultChecked={true} slot="start" />
            </IonItem>
            {authData.error && (
              <div className="alert alert-danger" role="alert">
                {authData.message}
              </div>
            )}
          </IonCardContent>

          <IonRow>
            <IonCol>
              <IonButton id="submitButton" onClick={(ev) => getKey(ev, formData)}>
                Login
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton id="registerButton" color="secondary" onClick={() => history.push("/register")}>
                Register
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCard>
      )}
      {authData.OK && (
        <div id="login-box">
          <UserCard userID={authData.data.id} logout={logOutHandle} />
        </div>
      )}
    </div>
  );
};

export default LoginForm;
