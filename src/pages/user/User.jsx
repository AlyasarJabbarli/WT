import axios from "axios";
import { useState, useEffect } from "react";
import "./style.css";

const User = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  useEffect( () => {
    async function fetchData() {
    try {
      const response = await axios.get(`http://ec2-18-183-121-110.ap-northeast-1.compute.amazonaws.com:9999/customer/get-by-token/${token}`);
      setUser(response.data);
      localStorage.setItem('customerId', user.id)
    } catch (error) {
      console.log(error);
    }} 
    fetchData();

  }, [token]);

  console.log(user);
  return <div>
    <h1>{user?.firstName + " " + user?.lastName}</h1>
    <h2>{user?.email}</h2>
    
  </div>;
};

export default User;
