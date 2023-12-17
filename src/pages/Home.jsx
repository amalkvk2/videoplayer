import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Add from "./Add";
import View from "./View";
import Categori from "./Categori";
import { Link } from "react-router-dom";


function Home() {
  const [serverRes, setserverRes] = useState({});
  const handleresponse = (ress) => {
    setserverRes(ress);
  };

  return (
    <>
      <h1 className="text-info ms-5 mb-5">all video card</h1>
      <Link to={'/watchhistory'} style={{textDecoration:"none",fontSize:"25px",color:"blue"}} >watchhistory</Link>
      <div className="container-fluid">
        <Row>
          {/* add */}
          <Col lg={1}>
            <Add handleresponse={handleresponse} />
          </Col>

          {/* view */}

          <Col lg={7}>
            <View serverRes={serverRes} />
          </Col>

          {/* category */}

          <Col lg={4}>
            <Categori />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
