import Axios from "../Axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const bmiGetHistoryQuery = (par) => {
  return {
    Listing: {
      type: "bmi_log",
      key: {
        user_id: par,
      },
      sort:[ "ms_date_time DESC" ],
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
  const { id } = prm;
  return {
    Delete: {
      type: "bmi_log",
      id: id,
    },
  };
};

export const useBmiHistory = (props) => {
  const queryClient = useQueryClient()
  const { userID } = props;
  
  const { isLoading, isError, data, error } = useQuery
    (['bmiGetHistoryQuery',{userID}], () => 
    Axios.post("", bmiGetHistoryQuery(userID)).then( ret => ret.data )
  );

  const invalidateBmiHistory = () =>
    queryClient.invalidateQueries('bmiGetHistoryQuery');
 
  const { mutate:addBmiHistory, isLoading:isAdding, isError:isAddError, isSuccess:issAddSuccess } = useMutation(  
      (newBmi) => Axios.post( "", bmiAddHistoryQuery(newBmi) ),
        { onSuccess: () => queryClient.invalidateQueries('bmiGetHistoryQuery') } 
      ); 
  
  const { mutate:removeBmiItem, isLoading:isRemoving, isError:isRemovingError, isSuccess:isRemovingSuccess } = useMutation(  
      (id) => Axios.post( "", bmiRemoveHistoryQuery(id) ),
        { onSuccess: () =>  queryClient.invalidateQueries('bmiGetHistoryQuery')} 
      ); 

  return { 
           addBmiHistory, isAddError, issAddSuccess, isAdding,    
           removeBmiItem, isRemovingError, isRemovingSuccess, isRemoving, 
           data, isError, isLoading, 
           error, invalidateBmiHistory 
        };
};

