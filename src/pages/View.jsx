import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Videocard from "./Videocard";
import axios from "axios";
import { useState } from "react";

function View({ serverRes }) {
  const [allVideos, setallVideos] = useState([]);
  const [deleteStatus, setdeleteStatus] = useState(false);
  // .......

  useEffect(() => {
    getallVideos();
    console.log("working");
  }, [serverRes, deleteStatus,setallVideos]);

  const getallVideos = async () => {
    const req = await axios.get("http://localhost:4000/video");
    // console.log(req.data);
    setallVideos(req.data);
  };

  console.log(allVideos);
  // to delete response
  const handleDeleteStatus = (res) => {
    setdeleteStatus(res);
  };

  return (
    <>
      <div className="border p-3 rounded m-4">
        <Row>
          {allVideos.map((videos) => (
            <Col className="p-3 mb-3 " sm={12} md={6}>
              <Videocard
                card={videos}
                handleDeleteStatus={handleDeleteStatus}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default View;
