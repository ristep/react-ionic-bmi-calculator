import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Axios from "../Axios";

const updateQuery = (prm) => ({
  Update: {
    type: prm.type,
    id:   prm.recordID,
    attributes: prm.changeList,
  },
});

const useDataModule = (props) => {
  const [editMode, setEditMode] = useState(false);
  const { getDetailQuery, type,recordID  } = props;
  const  queryClient = useQueryClient();

  const [ formData, setFormData ] = useState({});
  const [ changeSet, setChangeSet ] = useState(() => new Set());

  const [ serverError, setServerError ] = useState({});
  const [ metaData, setMetaData ] = useState({});

  const updMutation = useMutation((prm) => {
    console.log(updateQuery(prm));
      Axios.post('', updateQuery(prm) )
        .then( res => setMetaData(res.data) )
        .catch( err => setServerError(err) )        
  });  
  
  const enterEditMode = () => {
    setChangeSet(() => new Set());
    setEditMode(true);
  };
  
  const exitEditMode = () => {
    setChangeSet(() => new Set());
    setFormData({...data});
    setEditMode(false);
  };

  const { isLoading, isSuccess, isFetching, error, data={} } = useQuery(['getDetailQuery'+type, { recordID }],
    () => Axios.post("", getDetailQuery(recordID))
      .then((ret) => { 
          setFormData(ret.data.data);        
          return ret.data.data;
       })
      .catch((err) => setServerError(err))    
  );

  const onChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setChangeSet(() => new Set(changeSet.add(name)));
	};

  useEffect(() => {
    setFormData(data);
  }, []);

  const submitChanges = () => {
    const lista = [...changeSet].reduce( (obj, itm) => { obj[itm]=formData[itm]; return obj;}, {} );
    updMutation.mutate({ type:"users" , recordID:formData.id, changeList: lista }, {
      onSuccess: () => {
        setChangeSet(() => new Set());
        queryClient.invalidateQueries(['getDetailQuery'+type, { recordID }]);
        setEditMode(false);
      },
      onFailure: (err) => setServerError(err)
    })
  };

  return ({onChange, submitChanges, isLoading, isSuccess, isFetching, error, formData, serverError, metaData, changeSet, editMode, exitEditMode, enterEditMode});
};

export default useDataModule;