import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form } from "react-bootstrap";
import { addCategory, deleteCategory } from "./service/allapi";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Trash2 } from "react-feather";

function Categori() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categoryItem, setcategoryItem] = useState({
    id: "",
    name: "",
    allVideos: [],
  });

  const [allCategory, setallCategory] = useState([]);

  useEffect(() => {
    getCategoryList();
    console.log("working");
  }, []);

  // define funtion onChange={addcategoryForm}

  const addcategoryForm = (e) => {
    const { name, value } = e.target;

    setcategoryItem({ ...categoryItem, [name]: value });

    // console.log(categoryItem);
  };

  const handleAddcategory = async (e) => {
    e.preventDefault();
    const { id, name } = categoryItem;

    if (!id || !name) {
      toast.warning("pleace fill the form");
    } else {
      // const reponse = await addCategory(categoryItem);
      const response = await axios.post(
        "http://localhost:4000/categories",
        categoryItem
      );
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        setShow(false);
        alert("success");
      } else {
        alert("provide a unique id");
      }
    }
  };
  // api call for get category
  const getCategoryList = async () => {
    const response = await axios.get(
      "http://localhost:4000/categories",
      categoryItem
    );
    // console.log(response);
    setallCategory(response.data);
  };

  console.log(allCategory);

  const handleDeleteCategory = async (e, id) => {
    e.preventDefault();
    // console.log(id);
    deleteCategory(id);
    getCategoryList();
  };
  const dragged = (e) => {
    e.preventDefault();
    console.log("working");
  };

  const dropped = async (e, id) => {
    const dropVideoId = e.dataTransfer.getData("videoId");
    const video=await  axios.get(`http://localhost:4000/video/${dropVideoId}`)
    const slectedcategory=allCategory.find((item=>item.id===id))
    slectedcategory.allVideos.push(video.data)
    console.log('slectedcategory',slectedcategory);
    
    await axios.put(`http://localhost:4000/categories/${id}`,slectedcategory)
    // console.log(res);
  };

  return (
    <>
      <div className="d-grid">
        <div onClick={handleShow} className="btn btn-dark m-2">
          Add category
        </div>
      </div>
      {allCategory.map((item) => (
        <div
          droppable
          onDragOver={(e) => dragged(e)}
          onDrop={(e) => dropped(e, item.id)}
        >
          <div className="d-flex justify-content-between border rounded mt-3 p-2">
            <h4>{item.name}</h4>
            <span onClick={(e) => handleDeleteCategory(e, item?.id)}>
              <Trash2 color="red" />
            </span>{" "}
          </div>
        </div>
      ))}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel className="mb-3" controlId="floatingid" label="id">
              <Form.Control
                onChange={addcategoryForm}
                name="id"
                type="text"
                placeholder="category id"
              />
            </FloatingLabel>

            <FloatingLabel
              className="mb-3"
              controlId="floatingcategory"
              label="category"
            >
              <Form.Control
                onChange={addcategoryForm}
                name="name"
                type="text"
                placeholder="category"
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddcategory} variant="primary">
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

export default Categori;
