import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';

const timeArray = [
   [ '00:00', '12:00'],
   [ '01:00', '13:00'],
   [ '02:00', '14:00'],
   [ '03:00', '15:00'],
   [ '04:00', '16:00'],
   [ '05:00', '17:00'],
   [ '06:00', '18:00'],
   [ '07:00', '19:00'],
   [ '08:00', '20:00'],
   [ '09:00', '21:00'],
   [ '10:00', '22:00'],
   [ '11:00', '23:00'],
];

const usePsClockPicker = () => {
   const [visible, setVisible] = useState(false);
   const [time, setTime] = useState('00:00');
   // const [ok, setOk] = useState(false);

   const handleHourClick = (dd) => {
      setTime(dd);
      setVisible(false);
   };  // handleHourClick

   const PsClockPicker = () => (
      <Modal size="sm" show={visible} fullscreen={'md-down'} onHide={() => setVisible(false)}>
         <Modal.Header closeButton>
            <Modal.Title>Clock picker</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {timeArray.map((row, i) => (
               <Row key={i}>
                  {row.map((dd, j) => (
                     <Col key={j} onClick={() => handleHourClick(dd)} className="d-grid gap-2">
                        <Button size="sm" variant="light">{dd}</Button>
                     </Col>
                  )
                  )}
               </Row>
            ))}
         </Modal.Body>
      </Modal>
   );

   return ({ PsClockPicker, setVisible, time });
};

export default usePsClockPicker;