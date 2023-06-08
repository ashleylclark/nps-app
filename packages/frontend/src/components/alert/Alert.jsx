import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './alert.css';

const ParkAlerts = (alert) => {
  const [show, setShow] = useState(true);

  alert = alert.data;

  return show ? (
    <Alert variant="warning" onClose={() => setShow(false)} dismissible>
      <Row>
        <Col sm={1}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
        </Col>
        <Col>
          {alert.map((entry) => (
            <>
              <Row><Col xs={3}><b>{entry.title}</b></Col><Col><em>{entry.category}</em></Col></Row>
              <Row><Col>{entry.description}</Col></Row>
              <Row><Col>{entry.lastIndexedDate}</Col></Row>
            </>
          ))}
        </Col>
      </Row>
    </Alert>
  ) : (
    <Button id='alertBtn' onClick={() => setShow(true)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
    </Button>
  );
};

export default ParkAlerts;