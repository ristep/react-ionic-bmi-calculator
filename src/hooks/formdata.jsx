import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Axios from "Axios";

const useDataModule = (props) => {
  const { userDetailQuery, userUpdateQuery, userID } = props;

  const  queryClient = useQueryClient();
  const [ formData, setFormData ] = useState({});
  const [ changeList, setChangeList ] = useState({});

  const [ serverError, setServerError ] = useState({});
  const [ metaData, setMetaData ] = useState({});

  const updMutation = useMutation((prm) => 
      Axios.post('', userUpdateQuery(prm) )
        .then( res => setMetaData(res.data) )
        .catch( err => setServerError(err) )        
  );  

  const { isLoading, isSuccess, isFetching, error, data={} } = useQuery(['userDetailQuery', { userID }],
    () => Axios.post("", userDetailQuery(userID))
      .then((ret) => { 
          return ret.data.data;})
      .catch((err) => setServerError(err))    
  );

  useEffect(() => { 
    if (isSuccess) 
      setFormData(data); 
  }, [data, isSuccess, setFormData ]);

  
  const onChange = (ev) => {
    if(data.[ev.target.name]===ev.target.value){
      const { [ev.target.name]:_, ...rest } = changeList;
      setChangeList( rest );
    }
    else  
      setChangeList({ ...changeList, [ev.target.name]: ev.target.value });
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
	};

  const submitChanges = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    updMutation.mutate({ userID: formData.id, changeList: changeList }, {
      onSuccess: () => {
        queryClient.invalidateQueries(['userDetailQuery', { userID }]);
        setChangeList({});
      },
      onFailure: (err) => setServerError(err)
    })
  };

  return ({onChange, submitChanges,  isLoading, isSuccess, isFetching, error, formData, serverError, metaData, changeList});
};

export default useDataModule;