import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import moment from "moment";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const dateFormat = 'YYYY-MM-DD';

const usePsCalendar = () => {
  const [ visible, setVisible ] = useState(false);
  const [ date, setDate ] = useState();
  // const [ ok, setOk ] = useState(false);

  const handleDayClick = (dd) => {
    setDate( moment(dd).format(dateFormat) );
    setVisible(false);
  };

  const PsCalendar = () => (
    <Modal size='sm' show={visible} fullscreen={'md-down'} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Calendar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DayPicker 
          onDayClick={(dd) => handleDayClick(dd)}
          numberOfMonths={1} 
        />
      </Modal.Body>
    </Modal>
  );

  return ({ PsCalendar, setVisible, date });
};

export default usePsCalendar;