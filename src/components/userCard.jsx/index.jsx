import React, { useState } from "react";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
} from "@ionic/react";
import Spinner from "components/spinner";
import useValiHook from "../../hooks/formValidation";
import useDataModule from "../../hooks/formdata";
import * as yup from "yup";

const InputArray = [
    {name:"first_name", label:"First name", type:"text", maxlength:32, minlength:2 },
    {name:"second_name", label:"Second name", type:"text", maxlength:32, minlength:2 },
    {name:"email", label:"Email" ,type:"email", maxlength:64 },
    {name:"address", label: "Address", type:"text", maxlength:64 },
    {name:"place", label:"Place",type:"text", maxlength:32 },
    {name:"state", label:"State", type:"text", maxlength:32 },
    {name:"zipcode", label:"Zip code",type:"text", maxlength:6, minlength:5 },
];

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

const type = "users";

const userDetailQuery = (id) => ({
  Get: {
    type,
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

const Input = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  errors,
  editMode,
  constrains = {},
}) => {
  const { maxlength = 32, minlength, type } = constrains;
  return (
    <IonItem>
      <IonLabel position="floating" color={errors && "danger"}>
        {errors ? <div>{errors}</div> : label}
      </IonLabel>
      <IonInput
        disabled={!editMode}
        id={name}
        name={name}
        type={type}
        maxlength={maxlength}
        minlength={minlength}
        value={value}
        onIonChange={onChange}
        onBlur={onBlur}  

      />
      {/* {errors && errors[name] && (
        <IonText color="danger" className="ion-padding-start">
          <small>{errors[name].message}</small>
        </IonText>
      )} */}
    </IonItem>
  );
};

const UserCard = ({ userID, logout }) => {
  const [editMode, setEditMode] = useState(false);
  const {
    onChange,
    submitChanges,
    isSuccess,
    isFetching,
    formData,
    error,
    changeList,
  } = useDataModule({
    getDetailQuery: userDetailQuery,
    type,
    recordID: userID,
    editMode: editMode,
  });
  const { onBlur, errors } = useValiHook({ valSchema, formData });

  const postChanges = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    submitChanges();
    setEditMode(false);
  };

  const changeHandler = (e) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div id="UserCard">
      {isFetching && <Spinner />}
      {error && <div>{"An error has occurred: " + error.message}</div>}
      {isSuccess && !error && !isFetching && (
        <IonCard>
          <IonCardTitle>
            <IonCardHeader>
              User name: {formData?.id} - {formData?.name}
            </IonCardHeader>
          </IonCardTitle>
          <IonCardContent>
          <form tyle={{ padding: "30px" }}>
            { InputArray.map((item, index) => (
              <Input
                key={index}
                label={item.label}
                name={item.name}
                id={item.name}
                value={formData?.[item.name]}
                onChange={changeHandler}
                onBlur={onBlur}
                errors={errors?.[item.name]}
                editMode={editMode}
                constrains={item.constrains}
              />
            ))}
            </form>
          </IonCardContent>
          <div>
            {!editMode && (
              <IonRow>
                <IonCol>
                  <IonButton
                    onClick={() => setEditMode(true)}
                    className={"dialog-btn"}
                    color="primary"
                  >
                    Edit
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => logout()}
                    className={"dialog-btn"}
                    color="light"
                  >
                    Logout
                  </IonButton>
                </IonCol>
              </IonRow>
            )}
            {editMode && (
              <IonRow>
                <IonCol>
                  <IonButton
                    onClick={() => setEditMode(false)}
                    className={"dialog-btn"}
                    color="light"
                  >
                    Cancel
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton onClick={postChanges} className={"dialog-btn"}>
                    Submit changes
                  </IonButton>
                </IonCol>
              </IonRow>
            )}
          </div>
        </IonCard>
      )}
      {/* <ReactJson name="list" src={[...changeList].map(itm => ( {[itm]:formData[itm]} ) )}/>
      <ReactJson name="FormData" src={formData} /> */}
      {/* just for demo && debug */}
    </div>
  );
};

export default UserCard;
