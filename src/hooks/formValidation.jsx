import { useState } from "react";

const useValiHook = (props) => {
  const { valSchema, formData } = props; 
  const [ errors, setErrors ] = useState({});
  const [ valids, setValids ] = useState({});

  const onBlur = (ev) =>{
    valSchema.validateAt( [ev.target.name],{ [ev.target.name]:ev.target.value } )
      .then( () => {
        const { [ev.target.name]:_, ...rest } = errors;
        setErrors(rest);
        setValids({ ...valids, [ev.target.name]:true });
      }).catch( (err) => {
        const { [ev.target.name]:_, ...rest } = valids;
        setValids(rest);
        setErrors({ ...errors, [ev.target.name]:err.message });
      }); 
    };

  const validate = () =>{
    // console.log(formData);
    valSchema.validate(formData, { abortEarly: false } )
      .catch( (err) =>{
        err.inner.forEach( (err) => {
          if(err.inner.path!==undefined) 
            setErrors({ ...errors, [err.inner.path]:err.inner.message });
        });
      }); 
    };
   
  return({ onBlur, validate, errors, valids });
};

export default useValiHook;