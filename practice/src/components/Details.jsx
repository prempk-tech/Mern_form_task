import React,{useEffect, useState} from 'react'
import { Link,useParams } from "react-router-dom";
import request from '../api/api';
import { toast } from 'react-hot-toast';

export default function Details() {
    let [userDetails, setuserDetails] = useState([])

    let params = useParams();
    const fetchUserdetails =async()=>{
        await request({
           url: `forms/userdetails/${params.id}`,
           method: "GET",
        //    headers: {
        //      Authorization: window.localStorage.getItem("myapptoken"),
        //    },
         })
           .then((res) => {
             console.log(res);
             setuserDetails(res)
           })
           .catch((res) => {
             toast.error(res.data.message);
           });
       }
       useEffect(() => {
        fetchUserdetails();
      }, []);
      console.log(userDetails);
  return (
    <div>
        <nav
        class="navbar navbar-expand-md navbar-dark"
        style={{ backgroundColor: "blue" }}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <span>User Details</span>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div class="card">
  {/* <div class="card-header">
    Users
  </div> */}
  <div class="card-body">
    <h5 class="card-title">Address</h5>
   user info: <p class="card-text">{userDetails.firstname},{userDetails.email}</p>
   user Address: <span>{userDetails.addressline1},{userDetails.city},{userDetails.state}</span><br />
   user Pincode: <span>{userDetails.postcode}</span><br />
   <Link to={`/dashboard`}>
    <a href="#" class="btn btn-primary">Return to Dashboard</a>
    </Link>
  </div>
</div>
    </div>
  )
}
