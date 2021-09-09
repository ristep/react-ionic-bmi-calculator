import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const AppFooter = () => {
  return (
    <footer className="fixed-bottom bg-info text-white">
      <Container>
        <Row>
          <Col>
            <div>Bodi mass index calculator(BMI) - by PanSoft</div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default AppFooter;
