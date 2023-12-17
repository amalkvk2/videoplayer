import React from "react";
import { PlusCircle } from "react-feather";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form } from "react-bootstrap";
import { addVideo } from "./service/allapi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add({ handleresponse }) {
  const [uploaddata, setuploaddata] = useState({
    id: "",
    caption: "",
    thumbnail: "",
    url: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // /define setInput function

  const setInput = (e) => {
    const { name, value } = e.target;

    setuploaddata({ ...uploaddata, [name]: value });

    // setuploaddata(e.target.value)
  };

  // console.log(uploaddata);

  const extractUrl = (e) => {
    let youtubeurl = e.target.value;
    if (youtubeurl.includes("v=")) {
      let index = youtubeurl.indexOf("v=");

      console.log(index);
      let videourl = youtubeurl.substring(index + 2, index + 13);

      // console.log(videourl);

      let videodata = uploaddata;
      videodata.url = `https:/www.youtube.com/embed/${videourl}`;

      setuploaddata(videodata);
    }

    // console.log(uploaddata);
  };
  const handleAdd = async () => {
    const { id, caption, thumbnail, url } = uploaddata;

    if (!id || !caption || !thumbnail || !url) {
      toast.warning("pleace fill the form", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      // make api call
      // console.log('else');
      //  const req= await addVideo(uploaddata)
      // ..................................................................
      const req = await axios.post("http://localhost:4000/video", uploaddata);
      // ......
      console.log(req);

      if (req.status >= 200 && req.status < 300) {
        // console.log(req.data);
        handleresponse(req.data);

        setShow(false);
        alert = "new video uploaded sucessfully";
      } else {
        toast("provide a unique id.........");
      }
    }
  };

  return (
    <>
      <div onClick={handleShow} className="btn">
        <PlusCircle color="green" size={90} />
      </div>

      {/* modal */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>upload video details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* id */}
          <FloatingLabel className="mb-3" controlId="floatingid" label="id">
            <Form.Control
              name="id"
              onChange={setInput}
              type="text"
              placeholder="uploading video id"
            />
          </FloatingLabel>

          {/* caption */}

          <FloatingLabel
            className="mb-3"
            controlId="floatingcaption"
            label="uploading video caption"
          >
            <Form.Control
              name="caption"
              onChange={setInput}
              type="text"
              placeholder="video caption"
            />
          </FloatingLabel>

          {/* video cover url */}
          <FloatingLabel
            className="mb-3"
            controlId="floatingimage"
            label="video cover image url"
          >
            <Form.Control
              name="thumbnail"
              onChange={setInput}
              type="text"
              placeholder="video cover image url"
            />
          </FloatingLabel>

          {/* uploading video link */}
          <FloatingLabel
            className="mb-3"
            controlId="floatinglink"
            label="uploading video link"
          >
            <Form.Control
              name="url"
              onChange={extractUrl}
              type="text"
              placeholder="video link"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Add;
