// import "./form.scss";
import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Spinner from "components/spinner";
import useValiHook from "../../hooks/formValidation";
import useDataModule from "../../hooks/formdata";
import * as yup from "yup";
import ReactJson from "react-json-view";

let valSchema = yup.object().shape({
  name: yup.string().required(),
  first_name: yup
    .string()
    .required("First name is a required field!")
    .matches(/^(?!\s+$)/, "This field cannot contain only blankspaces"),
  second_name: yup
    .string()
    .required("Second name is a required field!")
    .matches(/^(?!\s+$)/, "This field cannot contain only blankspaces"),
  address: yup.string().nullable(),
  place: yup.string().nullable(),
  state: yup.string().nullable(),
  email: yup
    .string()
    .required("Field email is required!")
    .email("Enter valid email address!"),
  zipcode: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits")
    .nullable(),
});

const userDetailQuery = (id) => ({
  Get: {
    type: "users",
    id: id,
    attributes: [
      "id",
      "name",
      "first_name",
      "second_name",
      "address",
      "place",
      "state",
      "zipcode",
      "email",
    ],
  },
});

const userUpdateQuery = (prm) => ({
  Update: {
    type: "users",
    id: prm.userID,
    attributes: prm.changeList,
  },
});

const UserCard = (props) => {
  const { userID, logout } = props;

  const {
    onChange,
    submitChanges,
    isLoading,
    isSuccess,
    isFetching,
    error,
    formData,
    changeList,
  } = useDataModule({ userDetailQuery, userUpdateQuery, userID });
  const { onBlur, validate, errors } = useValiHook({ valSchema, formData });

  return (
    <Container style={{ maxWidth: "600px" }}>
      {(isLoading || isFetching) && <Spinner />}

      {error && <div>{"An error has occurred: " + error.message}</div>}

      {isSuccess && !error && !(isLoading || isFetching) && (
        <Card>
          <Card.Title>
            <h5>
              User name: {formData?.id} - {formData?.name}
            </h5>
          </Card.Title>
          <Card.Body>
            <Form className="p-2 bg-light border" size="sm">
              <Form.Group>
                <Form.Label>First name:</Form.Label>
                <Form.Control
                  size="sm"
                  name="first_name"
                  type="text"
                  placeholder="First name"
                  value={formData?.first_name}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={errors?.first_name ? "is-invalid" : ""}
                />
                <span class="input-group-addon">
                  <i class="glyphicon glyphicon-user"></i>
                </span>
                <Form.Label className="invalid-feedback">
                  {errors?.first_name}
                </Form.Label>
              </Form.Group>

              <Form.Group>
                <Form.Label>Second name:</Form.Label>
                <Form.Control
                  size="sm"
                  name="second_name"
                  type="text"
                  placeholder="Second name"
                  value={formData?.second_name || ""}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={errors?.second_name ? "is-invalid" : ""}
                />
                <Form.Label className="invalid-feedback">
                  {errors?.second_name}
                </Form.Label>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>email:</Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
                  name="email"
                  placeholder="Enter your your email address"
                  value={formData?.email || ""}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={errors?.email ? "is-invalid" : ""}
                />
                <Form.Label className="invalid-feedback">
                  {errors?.email}
                </Form.Label>
              </Form.Group>

              <Form.Group>
                <Form.Label>Home Adres:</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="address"
                  placeholder="Home Address"
                  value={formData?.address || ""}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Place:</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="place"
                  placeholder="Place"
                  value={formData?.place || ""}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>State:</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData?.state || ""}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
          <Row>
            <Col className="md-4">
              <Button
                style={{ minWidth: "100%" }}
                type="submit"
                onClick={submitChanges}
                variant="primary"
              >
                Submit changes
              </Button>
            </Col>
            <Col className="md-4">
              <Button 
                style={{ minWidth: "100%" }}
                variant="primary" 
                onClick={validate}>
                Validate
              </Button>
            </Col>
            <Col className="md-4">
              <Button
                style={{ minWidth: "100%" }}
                variant="warning"
                type="submit"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </Col>
          </Row>
          </Card.Footer>

        </Card>
      )}
                 <ReactJson name="Changes" src={changeList} /> {/* just for demo && debug */}
    </Container>
  );
};

export default UserCard;
