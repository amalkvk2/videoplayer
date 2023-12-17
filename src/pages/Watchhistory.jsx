import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";

function Watchhistory() {
  const [history, sethistory] = useState([]);

  useEffect(() => {
    getWatchhistory();
    console.log("working");
  }, []);

  const getWatchhistory = async () => {
    const response = await axios.get("http://localhost:4000/watchHistory");
    console.log("history", response);
    sethistory(response.data);
  };

  console.log(history);
  return (
    <>
      <div>Watchhistory</div>

      <Table border={1}>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>url</th>
            <th>date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((video) => (
            <tr>
              <td>{video.id}</td>
              <td>{video.category}</td>
              <td>
                <iframe
                  src={`${video?.url}?autoplay=1`}
                  frameborder="0"
                  width="100"
                  height="50"
                ></iframe>
              </td>
              <td>{video.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Watchhistory;
