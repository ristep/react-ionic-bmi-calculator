import "../pages.scss";
import React, { useState, useEffect } from "react";
import { FormikConsumer, useFormik } from "formik";
import  moment  from "moment";
import * as yup from "yup";
import {
  IonItem,
  IonLabel,
  IonButton,
  IonCard,
  IonRow,
  IonCol,
  IonDatetime,
  IonSelect,
  IonBadge,
  IonSelectOption,
  IonRange,
  IonIcon,
} from "@ionic/react";

import { useBmiHistory } from "hooks/useBmiHistory";
import { useAuthData } from "hooks/authData";
import BmiTable from "components/BmiTable";
import Spinner from "components/spinner";
import { barbellOutline, calendarOutline, manOutline } from "ionicons/icons";

const tsFormat = "YYYY-MM-DD HH:00";

const initialValues = {
  age: "None",
  gender: "Other",
  weight: 90,
  height: 1.75,
  BMI: 0,
};

const bmiRanges = [
  { from: 0, to: 12, color: "black", message: "Extremely underweight" },
  { from: 12, to: 18.5, color: "#00BFCA", message: "Underweight" },
  { from: 18.5, to: 25, color: "#2FBE02", message: "Normal weight" },
  { from: 25, to: 30, color: "#B78600", message: "Overweight" },
  { from: 30, to: 35, color: "#BA4B03", message: "Obese Class I" },
  { from: 35, to: 40, color: "#FF1700", message: "Obese Class II" },
  { from: 40, to: 45, color: "#700f1c", message: "Obese Class III" },
  { from: 45, to: 500, color: "black", message: "Extremely obese" },
];

const genderCor = (gender) => {
  var ret = 0.0;
  switch (gender) {
    case "Male":
      ret = 0.0;
      break;
    case "Female":
      ret = 1.0;
      break;
    case "Other":
    case "":
      ret = 0.5;
      break;
    default:
      ret = 0.0;
  }
  return ret;
};

const ageCorTable = {
  None: -0.0,
  "19-24": -0.0,
  "25-34": -1.0,
  "35-44": -2.0,
  "45-54": -3.0,
  "55-64": -4.0,
  "65-120": -5.0,
};

const ageCor = (age) => {
  return Number(ageCorTable[age]);
};

const bmiDescription = (bmi) => {
  var ret = {};
  bmiRanges.every((range) => {
    if (bmi >= range.from && bmi < range.to) {
      ret = { color: range.color, message: range.message };
      return false;
    }
    return true;
  });
  return ret;
};

const schema = yup.object().shape({
  age: yup.number().min(2).max(150).required(),
  gender: yup.string().oneOf(["Male", "Female", "Other"]),
  weight: yup.number().min(25).max(250).required(),
  height: yup.number().min(0.6).max(2.3).required(),
  ms_date_time: yup.date().required(),
});

function Home() {
  const { authData } = useAuthData();
  const [data, setData] = useState(initialValues);
  const {
    data: bmiData,
    addBmiHistory,
    isAdding,
    isLoading,
  } = useBmiHistory({ userID: authData.data.id });

  const formik = useFormik({
    validationSchema: schema,
    initialValues,
    onSubmit: (values) => {
      values.preventdefaults();
    },
  });

  const addBmi = () => {
    console.log({ user_id: authData.data.id, ...data }  );  // eslint-disable-line
    addBmiHistory({ user_id: authData.data.id, ...data });
  };

  useEffect(() => {
    const bmi = formik.values.weight / Math.pow(formik.values.height, 2);
    const { color, message } = bmiDescription(
      bmi + ageCor(formik.values.age) + genderCor(formik.values.gender)
    );
    setData({
      ...formik.values,
      BMI: bmi.toFixed(2),
      bmiColor: color,
      bmiMessage: message,
    });
  }, [formik.values]);

  const rowClick = (row) => {
    formik.setValues({ user_id: authData.data.id, ...row });
  };

  const addHeight = (i) => {
    formik.setFieldValue("height", formik.values.height + i);
  };

  const incWeight = () => {
    formik.setFieldValue("weight", formik.values.weight + 0.1);
  };

  const decWeight = () => {
    formik.setFieldValue("weight", formik.values.weight - 0.1);
  };

  const dateChangeHandler = (e) => {
    formik.setFieldValue("ms_date_time", moment(e.target.value).format(tsFormat));
  };

  return (
    <div id="home-card">
      {(isLoading || isAdding) && <Spinner />}

      <IonCard>
        <form>
          <IonRow className="p-2 border bg-light">
            <IonCol>
              <IonItem>
                <IonLabel color="tertiary" position="stacked">
                  Gender
                </IonLabel>
                <IonSelect
                  value={formik.values.gender}
                  interface="popover"
                  onIonChange={formik.handleChange}
                >
                  <IonSelectOption value="Male">Male</IonSelectOption>
                  <IonSelectOption value="Female">Female</IonSelectOption>
                  <IonSelectOption value="Other">Other</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>

            <IonCol>
              <IonItem>
                <IonLabel color="tertiary" position="stacked">
                  Age group
                </IonLabel>
                <IonSelect
                  name="age"
                  interface="popover"
                  onIonChange={formik.handleChange}
                >
                  <IonSelectOption value="None">None</IonSelectOption>
                  <IonSelectOption value="19-24">19-24</IonSelectOption>
                  <IonSelectOption value="25-34">25-34</IonSelectOption>
                  <IonSelectOption value="35-44">35-44</IonSelectOption>
                  <IonSelectOption value="45-54">45-54</IonSelectOption>
                  <IonSelectOption value="55-64">55-64</IonSelectOption>
                  <IonSelectOption value="65-120">65-120</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <IonItem>
                <IonLabel color="tertiary" position="stacked">
                  Height
                </IonLabel>
                <IonRange
                  min={0.6}
                  max={2.3}
                  step={0.01}
                  name="height"
                  value={formik.values.height}
                  onIonChange={formik.handleChange}
                  isInvalid={!!formik.errors.height}
                >
                  <IonBadge className="info-bage" slot="start">
                    {formik.values.height.toFixed(2)}
                  </IonBadge>
                  <IonIcon
                    onClick={() => addHeight(-0.01)}
                    color="tertiary"
                    size="small"
                    slot="start"
                    icon={manOutline}
                  />
                  <IonIcon
                    onClick={() => addHeight(0.01)}
                    color="tertiary"
                    size="large"
                    slot="end"
                    icon={manOutline}
                  />
                </IonRange>
              </IonItem>
            </IonCol>
            <IonCol size="2"></IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <IonItem>
                <IonLabel color="tertiary" position="stacked">
                  Weight
                </IonLabel>
                <IonRange
                  min="25"
                  max="200"
                  step="0.1"
                  name="weight"
                  value={formik.values.weight}
                  onIonChange={formik.handleChange}
                  isInvalid={!!formik.errors.weight}
                >
                  <IonBadge className="info-bage" slot="start">
                    {formik.values.weight.toFixed(1)}
                  </IonBadge>
                  <IonIcon
                    onClick={decWeight}
                    color="tertiary"
                    size="small"
                    slot="start"
                    icon={barbellOutline}
                  />
                  <IonIcon
                    onClick={incWeight}
                    color="tertiary"
                    size="large"
                    slot="end"
                    icon={barbellOutline}
                  />
                </IonRange>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="6">
              <div
                className="BMI-number"
                style={{ backgroundColor: data.bmiColor }}
              >
                BMI = {data.BMI}
              </div>
            </IonCol>
            <IonCol>
              <div
                className="BMI-text"
                style={{ backgroundColor: data.bmiColor }}
              >
                {data.bmiMessage}
              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="6">
              <IonItem>
                <IonIcon
                  size="small"
                  color="tertiary"
                  slot="end"
                  icon={calendarOutline}
                />
                <IonLabel color="tertiary" position="stacked">
                  Date
                </IonLabel>
                <IonDatetime
                  name="ms_date_time"
                  displayFormat={tsFormat}
                  displayTimezone={authData.data.timezone}
                  value={formik.values.ms_date_time}
                  onIonChange={dateChangeHandler}
                  isInvalid={!!formik.errors.ms_date_time}
                />
              </IonItem>
            </IonCol>

            <IonCol>
              <IonButton
                onClick={addBmi}
                style={{
                  contentAlign: "center",
                  width: "100%",
                  marginTop: "0.5em",
                }}
              >
                Log data
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonCard>
      {/* <ReactJson src={data} /> */}
      <div style={{ paddingTop: "23px" }}>
        {bmiData?.OK && (
          <IonCard>
            <BmiTable data={bmiData.data} rowClick={rowClick} />
          </IonCard>
        )}
      </div>
    </div>
  );
}

export default Home;
