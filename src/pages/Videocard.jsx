import React from "react";
import Card from "react-bootstrap/Card";
import { Trash2 } from "react-feather";

import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { deleteVideo } from "./service/allapi";
import axios from "axios";

function Videocard({ card, handleDeleteStatus }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // video removing

  const removeItem = async (id) => {
    const response = await deleteVideo(id);

    console.log(response);
    if (response.status >= 200 && response.status300) {
      handleDeleteStatus(true);
    }
  };
  const handleHistory = async () => {
    const historyData = {
      id: card.id,
      category: card.caption,
      url: card.url,
      date: new Date(),
    };
    const history = await axios.get("http://localhost:4000/watchHistory");
    const exist = history.data.filter((data) => data.id === historyData.id);
    console.log(exist);

    if (exist.length == 0) {
      const res = await axios.post(
        "http://localhost:4000/watchHistory",
        historyData
      );
      console.log(res);
    }
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("videoId", id);
  };

  return (
    <>
      <div>
        <Card
          className="shadow"
          style={{ cursor: "pointer" }}
          draggable
          onDragStart={(e) => handleDragStart(e, card.id)}
        >
          <Card.Img
            onClick={handleShow}
            variant="top"
            src={card?.thumbnail}
            height={"200px"}
          />
          <Card.Body>
            <Card.Title>
              {" "}
              <span>
                {card?.caption}

                <span>
                  {" "}
                  <Trash2
                    onClick={() => removeItem(card?.id)}
                    color="red"
                    style={{ float: "right" }}
                  />{" "}
                </span>
              </span>{" "}
            </Card.Title>
          </Card.Body>
        </Card>

        {/* modal */}
        <Modal show={show} onHide={handleClose} onClick={handleHistory}>
          <Modal.Header closeButton>
            <Modal.Title>video caption </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe
              width="100%"
              height="400"
              src={`${card?.url}?autoplay=1`}
              title="Neela Nilave - Video Song | RDX | Kapil Kapilan | Sam CS | Shane Nigam,Antony Varghese,Neeraj Madhav"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Videocard;
