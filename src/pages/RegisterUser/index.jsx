import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import useValiHook from "hooks/formValidation";
import "../../styles/userForm.scss";
import useRegisterHook from "hooks/sendRegisterMail";

const RegisterUser = () => {
  const [formData, setFormData] = useState({ email: "", username: "", new_password: "",  new_password_confirm: "" });
  const { sendRegisterMail, sended } = useRegisterHook({email:formData.email, username:formData.username, password:formData.new_pasword, clientURL:window.location.href});
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
    if( Object.keys(errors).length ===0 ){
      sendRegisterMail();
      if( sended ){
        alert("e-mail has been sended to:" + formData.email);
      }else{
        alert("e-mail has not been sended");
      }
    }  
  };

  const Lubry = (props) => {
    return (
      <>
        <Form.Label className="invalid-feedback">{errors?.[props.field]}</Form.Label>
        <Form.Label className="valid-feedback">{props.label}</Form.Label>
        {!errors?.[props.field] && !valids?.[props.field] && (<Form.Label>{props.label}</Form.Label>)}
      </>
    );
  };

  return (
    <Container id="login-box">
      <Card>
        <Card.Header>
          <div id="login-box-title">Registration of a new user!</div>
        </Card.Header>
        <Card.Body>
          <Form className="p-2 bg-light" size="sm" autoComplete="off">
            <Form.Group> 
              <Form.Control
                id="email"
                name="email"
                type="text"
                size="sm"
                placeholder="Enter your email"
                value={formData?.email}
                onChange={onChange}
                onBlur={onBlur}
                className={
                  errors?.email ? "is-invalid" : valids?.email ? "is-valid" : ""
                }
              />
              <Lubry field="email" label="Email" />
            </Form.Group>

            <Form.Group>
              <Form.Control
                id="username"
                name="username"
                autoComplete="off"
                size="sm"
                type="text"
                placeholder="User name"
                value={formData?.username}
                onChange={onChange}
                onBlur={onBlur}
                className={ errors?.username ? "is-invalid" : (valids?.username ? "is-valid" : "")}
              />
              <Lubry field="username" label="User name" />
            </Form.Group>

            <Card>
              <Card.Body>
                <Form.Group>
                  <Form.Control
                    name="new_password"
                    id="new_password"
                    autoComplete="new-password"
                    size="sm"
                    type="password"
                    placeholder="Password"
                    value={formData.new_password}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={ errors?.new_password ? "is-invalid" : ( valids?.new_password ? "is-valid": "") }
                  />
                  <Lubry field="new_password" label="Password" />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    name="new_password_confirm"
                    id="new_password_confirm"
                    autoComplete="new_password"
                    size="sm"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.new_password_confirm}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={ errors?.new_password_confirm ? "is-invalid" : (valids?.new_password_confirm ? "is-valid" : "") }
                  />
                  <Lubry
                    field="new_password_confirm"
                    label="Confirm Password"
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Form>
        </Card.Body>

        <Card.Footer>
          <Row>
            <Col className="md-4"></Col>
            <Col className="md-4">
              <Button variant="primary" id="sendMail" onClick={sendMailHandler}>
                Send invitation e-mail
              </Button>
            </Col>
            <Col className="md-4">
              {/* <Button size="sm" variant="primary" onClick={validate}>
                validate
            </Button> */}
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      {/* <ReactJson src={valids} name="valids" />
      <ReactJson src={errors} name="errors" />
      <ReactJson src={formData} name="formData" /> */}
    </Container>
  );
};

export default RegisterUser;
