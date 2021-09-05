// import "./form.scss";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useValiHook from "../../hooks/formValidation";

import * as yup from "yup";

import "./index.scss";
import { useAuthData } from "hooks/authData";
import UserCard from "components/userCard.jsx";

let valSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginForm = () => {
  const [ formData, setFormData ] = useState({ username: "", password: "" });
  const { onBlur, errors } = useValiHook({ valSchema, formData });
  const { authData, getKey, clearKey } = useAuthData();
  const history = useHistory();

  const onChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  return (
    <>
      {!authData.OK && (
        <Container id="login-box">
          <Card>
            <Card.Title>
              <Row>
                <Col className="md-12">
                  <div id="login-box-title">User login</div>
                </Col>
              </Row>
            </Card.Title>
            <Card.Body>
              <Form className="p-2 bg-light" size="sm" autocomplete="off">
                <Form.Group>
                  <Form.Label>User name:</Form.Label>
                  <Form.Control
                    size="sm"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="User name"
                    value={formData?.username}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={errors?.username ? "is-invalid" : ""}
                  />
                  <Form.Label className="invalid-feedback">
                    {errors?.username}
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    size="sm"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData?.password || ""}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={errors?.password ? "is-invalid" : ""}
                  />
                  <Form.Label className="invalid-feedback">
                    {errors?.password}
                  </Form.Label>
                </Form.Group>
              </Form>
              {authData.error && (
                <div className="alert alert-danger" role="alert">
                  {authData.message}
                </div>
              )}
            </Card.Body>

            <Card.Footer>
              <Row>
                <Col className="md-4"></Col>
                <Col className="md-4">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(ev) => getKey(ev, formData)}
                    id="submitButton"
                  >
                    LOGIN
                  </Button>
                </Col>
                <Col className="md-4">
                <Button
                    variant="standard"
                    onClick={() =>  history.push("/register")}
                    id="registerUser"
                  >
                    NEW USER
                </Button>

                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Container>
      )}
      {authData.OK && (
        <Container id="login-box">
          <UserCard userID={authData.data.id} logout={clearKey} />
        </Container>
      )}
    </>
  );
};

export default LoginForm;