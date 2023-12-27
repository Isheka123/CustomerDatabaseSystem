import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import './Edit.css';

const Edit = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
const nav = useNavigate();
  useEffect(() => {
    // Fetch the user data for the specified ID
    axios.get(`http://localhost:8000/user/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Dependency on 'id' to fetch user data when the ID changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

 // Inside the Edit.js component

const handleFormSubmit = (e) => {
  e.preventDefault();
  // Update user data
  axios.put(`http://localhost:8000/user/${id}`, user)
    .then((response) => {
      console.log( response.data);
      // Redirect or perform actions after successful update
      nav('/')
    })
    .catch((err) => {
      console.error('Error updating user:', err);
    });
};


  return (
    <div style={{ marginTop: '50px' }} className="container">
      <h1 style={{ textAlign: 'center' }} >Edit User</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>ID:</label>
          <input type="text" name="id" value={user.id || ''} readOnly />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={user.name || ''} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" name="email" value={user.email || ''} onChange={handleInputChange} />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" name="gender" value={user.gender || ''} onChange={handleInputChange} />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" name="status" value={user.status || ''} onChange={handleInputChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Edit;
