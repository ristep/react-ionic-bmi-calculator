import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Col,  Container,  Form,   Row,   Badge,   InputGroup,} from "react-bootstrap";
import { useBmiHistory } from "hooks/useBmiHistory";
import { useAuthData } from "hooks/authData";
import BmiTable from "components/bmiTable";
import Spinner from "components/spinner";
import usePsClockPicker from "hooks/useClockPicker";
import usePsCalendar from "hooks/useCalendar";

const initialValues = {
   age: "None",
   gender: "Other",
   weight: 90,
   height: 1.75,
   BMI: 0
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
   "None": -0.0,
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
   ms_date: yup.date().required(),
   ms_time: yup.string().required()
});

function Forma() {
   const { authData } = useAuthData();
   const [data, setData] = useState(initialValues);
   const { data: bmiData, addBmiHistory, isAdding, isLoading } = useBmiHistory({ userID: authData.data.id });
   const PsClock = usePsClockPicker();
   const PsCalendar = usePsCalendar();
   // const [startDate, setStartDate] = useState(new Date());
   // const [isOpen, setIsOpen] = useState(false);

   // const handleChange = (e) => {
   //    setIsOpen(!isOpen);
   //    setStartDate(e);
   // };

   // const handleClick = (e) => {
   //    e.preventDefault();
   //    setIsOpen(!isOpen);
   // };

   const formik = useFormik({ validationSchema: schema, initialValues, onSubmit: (values) => { values.preventdefaults(); } });

   const addBmi = () => {
      addBmiHistory({ user_id: authData.data.id, ...data });
   };

   useEffect(() => {
      const bmi = (formik.values.weight / Math.pow(formik.values.height, 2));
      const { color, message } = bmiDescription(bmi + ageCor(formik.values.age) + genderCor(formik.values.gender));
      setData({ ...formik.values, BMI: bmi.toFixed(2), bmiColor: color, bmiMessage: message, });
   }, [formik.values]);

   const rowClick = (row) => {
      formik.setValues({ user_id: authData.data.id, ...row });
   }
   
   useEffect(() => {
      formik.handleChange({ target: { name: "ms_time", value: PsClock.time } });
      // eslint-disable-next-line
   }, [PsClock.time]);

   useEffect(() => {
      formik.handleChange({ target: { name: "ms_date", value: PsCalendar.date } });
      // eslint-disable-next-line
   }, [PsCalendar.date]);

   return (
      <>
         {(isLoading || isAdding) && <Spinner />}
         
         <PsClock.PsClockPicker />
         <PsCalendar.PsCalendar />

         <Form noValidate onSubmit={formik.onSubmit} >
            <Row className="p-2 border bg-light">
               <Form.Group className="col-12 col-sm-3">
                  <Form.Label>Date</Form.Label>
                  <InputGroup className="mb-3">
                     <Button variant="secondary" onClick={() => PsCalendar.setVisible(true)}>
                        Chose Date
                     </Button>
                     <Form.Control
                        dateFormat="YYYY-MM-DD"
                        name="ms_date"
                        value={formik.values.ms_date}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.ms_date}
                     />
                  </InputGroup>
               </Form.Group>
               <Form.Group className="col-12 col-sm-3" >
                  <Form.Label>Hour</Form.Label>
                  <InputGroup className="mb-3">
                     <Button variant="secondary" onClick={() => PsClock.setVisible(true)}>
                        Chose Hour
                     </Button>
                     <Form.Control
                        timeFormat="hh:mm"
                        name="ms_time"
                        icon="clock"
                        value={formik.values.ms_time}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.ms_time}
                     />
                  </InputGroup>
               </Form.Group>
               <Form.Group className="col-6 col-sm-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select name="gender" onChange={formik.handleChange}>
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                     <option value="Other">Other</option>
                  </Form.Select>
               </Form.Group>
               <Form.Group className="col-6 col-sm-3">
                  <Form.Label>Age group</Form.Label>
                  <Form.Select name="age" onChange={formik.handleChange}>
                     <option value="None">None</option>
                     <option value="19-24">19-24</option>
                     <option value="25-34">25-34</option>
                     <option value="35-44">35-44</option>
                     <option value="45-54">45-54</option>
                     <option value="55-64">55-64</option>
                     <option value="65-120">65-120</option>
                  </Form.Select>
               </Form.Group>
            </Row>

            <Row md={12} className="p-2 border bg-light">
               <Form.Group as={Col} md="9">
                  <Form.Label>Height</Form.Label>
                  <Form.Control
                     className="form-range"
                     min="0.6"
                     max="2.30"
                     step="0.01"
                     type="range"
                     placeholder="Height"
                     name="height"
                     value={formik.values.height}
                     onChange={formik.handleChange}
                     isInvalid={!!formik.errors.height}
                  />
               </Form.Group>
               <Form.Group as={Col} md="3">
                  <Form.Control
                     style={{ marginTop: "20px" }}
                     type="text"
                     name="height"
                     value={formik.values.height}
                     onChange={formik.handleChange}
                     isValid={formik.touched.height && !formik.errors.height}
                  />
               </Form.Group>
            </Row>
            <Row md={12} className="p-2 border bg-light">
               <Form.Group as={Col} md="9">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control
                     className="form-range"
                     min="1"
                     max="250"
                     step="0.1"
                     type="range"
                     placeholder="Weight"
                     name="weight"
                     value={formik.values.weight}
                     onChange={formik.handleChange}
                     isInvalid={!!formik.errors.weight}
                  />
               </Form.Group>
               <Form.Group as={Col} md="3">
                  <Form.Control
                     style={{ marginTop: "20px" }}
                     type="number"
                     name="weight"
                     value={formik.values.weight}
                     onChange={formik.handleChange}
                     isValid={formik.touched.weight && !formik.errors.weight}
                  />
               </Form.Group>
            </Row>
            <Row md={12} className="p-3 border bg-primary">
               <Col>
                  <h2 style={{ marginTop: "0.1em" }}>
                     <Badge id="bmiIndicator" className="border" style={{ backgroundColor: data.bmiColor }}>
                        BMI = {data.BMI}
                     </Badge>
                  </h2>
                  <label for="bmiIndicator"> {data.bmiMessage}</label>
               </Col>
               <Col></Col>
               <Col>
                  <Button
                     onClick={addBmi}
                     style={{
                        contentAlign: "center",
                        width: "100%",
                        marginTop: "0.5em",
                     }}
                  >
                     Log data
                  </Button>
               </Col>
            </Row>
         </Form>
         {/* <ReactJson src={data} /> */}
         <div style={{ paddingTop: "23px" }}>
            {bmiData?.OK &&
               <BmiTable data={bmiData.data} rowClick={rowClick} />
            }
         </div>
      </>
   );
}

const Home = () => {
   return (
      <Container>
         <Forma  />
      </Container>
   );
};

export default Home;
