import { useState } from 'react';
import "./camping.css";
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

const Camping = () => {
  return (
    <div>
      <Tab.Container defaultActiveKey="first">
        <Nav variant='pills'>
          <Nav.Item>
            <Nav.Link eventKey='first'>Camp Ground 1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='second'>Camp Ground 2</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey='first'>
            Info
          </Tab.Pane>
          <Tab.Pane eventKey='second'>Info 2</Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default Camping;