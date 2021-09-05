import React from 'react';
import "./style03.scss";

interface SpinProps {
  rotate?: boolean;
}

const Spinner = (props: SpinProps) => {
  const { rotate=true } = props;

  if(rotate) 
    return  <span id="spinner" className="spinner"></span>;
  else
    return "";
}

export default Spinner;
