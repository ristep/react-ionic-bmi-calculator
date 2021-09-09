import axios from "axios";

const axParams = {
  // baseURL: "https://arso.us.to/php-json-api/",
  baseURL:"https://bmi-log.sman.cloud/php-json-api/",
  headers: {
    Authorization: "dummy-key",
    "Content-type": "application/json",
  },
};

const Axios = axios.create(axParams);

export default Axios;