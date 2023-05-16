import { useState } from 'react';
import "./activities.css";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Activities = () => {
  return (
    <div id='cards'>
      <h1>Reccomended Things to Do</h1>
      <Row xs={1} md={2} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Activity</Card.Title>
                <Card.Subtitle>Description</Card.Subtitle>
                <Card.Text className='activ'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus molestias
                  vero temporibus ratione blanditiis officia dolores, sapiente quaerat rerum
                  quisquam ipsa nisi quas eaque inventore numquam necessitatibus suscipit magnam dolorum?
                </Card.Text>
                <Card.Subtitle>Fees</Card.Subtitle>
                <Card.Text className='activ'>None</Card.Text>
                <Card.Subtitle>Season</Card.Subtitle>
                <Card.Text className='activ'>Season</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Activities;