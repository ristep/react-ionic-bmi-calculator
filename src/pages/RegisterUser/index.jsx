import React, { useState } from "react";
// import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import useValiHook from "hooks/formValidation";
import useRegisterHook from "hooks/sendRegisterMail";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";

const RegisterUser = () => {
  const [formData, setFormData] = useState({ email: "", username: "", new_password: "", new_password_confirm: "" });
  const { sendRegisterMail, sended } = useRegisterHook({ email: formData.email, username: formData.username, password: formData.new_pasword, clientURL: window.location.href });
  const valNewUserSchema = Yup.object().shape({
    email: Yup.string()
      .required("E-mail is required!")
      .email("Enter valid email address!"),
    username: Yup.string().required("User name is a required field!"),
    new_password: Yup.string().required("Password required"),
    new_password_confirm: Yup.string().oneOf([formData.new_password, null], "Passwords don't match"),
  });

  const { onBlur, validate, errors, valids } = useValiHook({
    valSchema: valNewUserSchema,
    formData,
  });

  const onChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  const sendMailHandler = (ev) => {
    ev.preventDefault();
    validate(); /// validate again to check if all fields are filled
    if (Object.keys(errors).length === 0) {
      sendRegisterMail();
      if (sended) {
        alert("e-mail has been sended to:" + formData.email);
      } else {
        alert("e-mail has not been sended");
      }
    }
  };

  const Lubry = (props) => {
    return (
      <>
        {/* <IonLabel className="invalid-feedback">{errors?.[props.field]}</IonLabel>
        <IonLabel className="valid-feedback">{props.label}</IonLabel>
        {!errors?.[props.field] && !valids?.[props.field] && (<IonLabel>{props.label}</IonLabel>)} */}
      </>
    );
  };

  //   <form className="ion-padding">
  //   <IonItem>
  //     <IonLabel position="floating">Username</IonLabel>
  //     <IonInput />
  //   </IonItem>
  //   <IonItem>
  //     <IonLabel position="floating">Password</IonLabel>
  //     <IonInput type="password" />
  //   </IonItem>
  //   <IonItem lines="none">
  //     <IonLabel>Remember me</IonLabel>
  //     <IonCheckbox defaultChecked={true} slot="start" />
  //   </IonItem>
  //   <IonButton className="ion-margin-top" type="submit" expand="block">
  //     Login
  //   </IonButton>
  // </form>

  return (
    <div id="login-box">
      <IonCard>
        <IonCardHeader>
          <div id="login-box-title">Registration of a new user!</div>
        </IonCardHeader>
        <form className="ion-padding">
          <IonItem>
            <IonInput
              id="email"
              name="email"
              type="text"
              size="sm"
              placeholder="Enter your email"
              value={formData?.email}
              onIonChange={onChange}
              onBlur={onBlur}
              className={
                errors?.email ? "is-invalid" : valids?.email ? "is-valid" : ""
              }
            />
            <Lubry field="email" label="Email" />
          </IonItem>

          <IonItem>
            <IonInput
              id="username"
              name="username"
              autoComplete="off"
              size="sm"
              type="text"
              placeholder="User name"
              value={formData?.username}
              onIonChange={onChange}
              onBlur={onBlur}
              className={errors?.username ? "is-invalid" : (valids?.username ? "is-valid" : "")}
            />
            <Lubry field="username" label="User name" />
          </IonItem>

          <IonCard>
            <IonItem>
              <IonInput
                name="new_password"
                id="new_password"
                autoComplete="new-password"
                size="sm"
                type="password"
                placeholder="Password"
                value={formData.new_password}
                onIonChange={onChange}
                onBlur={onBlur}
                className={errors?.new_password ? "is-invalid" : (valids?.new_password ? "is-valid" : "")}
              />
              <Lubry field="new_password" label="Password" />
            </IonItem>

            <IonItem>
              <IonInput
                name="new_password_confirm"
                id="new_password_confirm"
                autoComplete="new_password"
                size="sm"
                type="password"
                placeholder="Confirm Password"
                value={formData.new_password_confirm}
                onIonChange={onChange}
                onBlur={onBlur}
                className={errors?.new_password_confirm ? "is-invalid" : (valids?.new_password_confirm ? "is-valid" : "")}
              />
              <Lubry
                field="new_password_confirm"
                label="Confirm Password"
              />
            </IonItem>
          </IonCard>
        </form>

        <IonRow>
          <IonCol className="md-4"></IonCol>
          <IonCol className="md-4">
            <IonButton variant="primary" id="sendMail" onClick={sendMailHandler}>
              Send invitation e-mail
            </IonButton>
          </IonCol>
          <IonCol className="md-4">
            <IonButton size="sm" variant="primary" onClick={validate}>
              validate
            </IonButton>
          </IonCol>
        </IonRow>
        {/* <ReactJson src={valids} name="valids" />
      <ReactJson src={errors} name="errors" />
      <ReactJson src={formData} name="formData" /> */}
      </IonCard>

    </div>
  );
};

export default RegisterUser;
