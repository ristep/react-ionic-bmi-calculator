import Axios from "../Axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const bmiGetHistoryQuery = (par) => {
  return {
    Listing: {
      type: "bmi_log",
      key: {
        user_id: par,
      },
      sort: ["ms_date_time DESC"],
      attributes: [
        "id",
        "user_id",
        "age",
        "gender",
        "height",
        "weight",
        "bmic",
        "ms_date_time"
      ],
    },
  };
};

const bmiAddHistoryQuery = (prm) => {
  const { user_id, age, gender, weight, height, ms_date_time } = prm;
  return {
    Create: {
      type: "bmi_log",
      attributes: {
        user_id,
        age,
        gender,
        weight,
        height,
        ms_date_time
      },
    },
  };
};

const bmiRemoveHistoryQuery = (prm) => {
  // const { record_id } = prm;
  return {
    Delete: {
      type: "bmi_log",
      id: prm,
    },
  };
};

export const useBmiHistory = (props) => {
  const { userID } = props;

  const { isLoading, isError, data, isSuccess } = useQuery(['bmiGetHistoryQuery', { userID }], () =>
    Axios.post("", bmiGetHistoryQuery(userID)).then(ret => ret.data)
  );

  return {
    data, isError, isLoading, isSuccess
  };
};

export const useRemoveBmiHistoryRecord = () => {
  const queryClient = useQueryClient();
  const { mutate: delBmiHistory, isLoading, isError, isSuccess } = useMutation(
      (id) => Axios.post( "", bmiRemoveHistoryQuery(id) ),
        { onSuccess: () =>  queryClient.invalidateQueries('bmiGetHistoryQuery')} 
      ); 
      
  return {
    delBmiHistory,
    isError, isLoading, isSuccess
  };
}

export const useAddBmiHistory = () => {
  const queryClient = useQueryClient()
  const { mutate: addBmiHistory, isLoading, isError, isSuccess } = useMutation(
    (newBmi) =>{ console.log(newBmi); return Axios.post("", bmiAddHistoryQuery(newBmi))},
    { onSuccess: () => queryClient.invalidateQueries('bmiGetHistoryQuery') }
  );
  return {
    addBmiHistory,
    isError, isLoading, isSuccess
  };
}

export const useInvalidateBmiHistory = () => {
  const queryClient = useQueryClient()
  queryClient.invalidateQueries('bmiGetHistoryQuery');
}