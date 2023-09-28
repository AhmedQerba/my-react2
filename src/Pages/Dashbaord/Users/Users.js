import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../Website/Auth/UserContext";

export default function Users() {
  // UseState
  const [users, setUsers] = useState([]);
  const [runUseEffect, setRun] = useState(0);

  const context = useContext(User);
  const token = context.auth.token;

  // UseEffect to get data from api
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, [runUseEffect]);
  // Delete user function
  async function deleteUser(id) {
    try {
      let res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch {
      console.log("error");
    }
  }

  const showUsers = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Link to={`${user.id}`}>
          <i
            className="fa-sharp fa-solid fa-pen-to-square"
            style={{
              paddingRight: "10px",
              fontSize: "20px",
              color: "#74afb9",
              cursor: "pointer",
            }}
          ></i>
        </Link>
        <i
          onClick={() => deleteUser(user.id)}
          className="fa-sharp fa-solid fa-trash"
          style={{ fontSize: "20px", color: "red", cursor: "pointer" }}
        ></i>
      </td>
    </tr>
  ));

  return (
    <div style={{ padding: "20px" }}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
    </div>
  );
}
