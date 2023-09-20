import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

import "../styles/form.css";
import useCustomForm from "../UseCustomForm.js";
import request from "../api/api";
import swal from "sweetalert";
const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  mobileno: "",
  DOB: "",
  addressline1: "",
  addressline2: "",
  image:"",
  country: "",
  city: "",
  state: "",
  postcode: "",
};
export default function Edituser({ fetchId,close,editfetch }) {
    const [deleteimageName ,setDelImgName] = useState()
    let [settinginfo, setSettinginfo] = useState([]);

    console.log(deleteimageName);
  const {
    values: inputs,
    setValues,
    handleChange,
    handleSelectChange,
    handleMultiSelectChange,
    validateEmail,
  } = useCustomForm({
    initialValues,
    onSubmit: () => onsubmit(),
  });
  let navigate = useNavigate();
  console.log(fetchId);
  const {
    firstname,
    lastname,
    email,
    mobileno,
    DOB,
    addressline1,
    addressline2,
    image,
    country,
    city,
    state,
    gender,
    role,
    postcode,
  } = inputs;

  async function fetchEdituserDetails() {
    request({
      url: `forms/useredit/${fetchId.id}`,
      method: "GET",
      // headers: {
      //   Authorization: window.localStorage.getItem("myapptoken"),
      // },
    })
      .then((res) => {
        console.log(res);
        setValues({
          firstname: res.firstname,
          lastname: res.lastname,
          email: res.email,
          mobileno: res.mobileno,
          DOB: res.DOB,
          addressline1: res.addressline1,
          addressline2: res.addressline2,
          image:res.image,
          country: res.country,
          city: res.city,
          gender:res.gender,
          role:res.role,
          state: res.state.map((data) => data),
          postcode: res.postcode,
        });
        console.log(inputs);
      })
      .catch((res) => {
        toast.error(res.data.message);
      });
  }
  useEffect(() => {
    fetchEdituserDetails();
  }, []);
//   const cityoptions = [
//     {
//       label: "salem",
//       value: "salem",
//       name: "salem",
//     },
//     {
//       label: "chennai",
//       value: "chennai",
//       name: "chennai",
//     },
//     {
//       label: "mechari",
//       value: "mechari",
//       name: "mechari",
//     },
//   ];

//   const countryOptions = [
//     {
//       label: "india",
//       value: "india",
//       name: "india",
//     },
//     {
//       label: "uk",
//       value: "uk",
//       name: "uk",
//     },
//     {
//       label: "russia",
//       value: "russia",
//       name: "russia",
//     },
//   ];

//   const stateOptions = [
//     {
//       label: "tamil nadu",
//       value: "tamil nadu",
//       name: "tamil nadu",
//     },
//     {
//       label: "kerala",
//       value: "kerala",
//       name: "kerala",
//     },
//     {
//       label: "Andra",
//       value: "Andra",
//       name: "Andra",
//     },
//   ];

  const handlesubmit = (id) => {
    console.log(inputs);

    for (let key in inputs) {
      if (key.includes("Value")) {
        delete inputs[key];
      }
    }

    if (firstname === "") {
        swal({
            title: "firstname required",
          })
      }
      if (lastname === "") {
        swal({
            title: "lastname required",
          })
      }
       if (email === "") {
        swal({
                    title: "email required",
                  })
    } else if (!validateEmail(email)) {
        swal({
                    title: "invalid email",
                  })
    }
      if (mobileno === "") {
        swal({
            title: "mob.no required",
          })
      }
      if (DOB === "") {
        swal({
            title: "firstname required",
          })
      }
      if (addressline1 === "") {
        swal({
            title: "addressline1 required",
          })
      }
      if (addressline2 === "") {
        swal({
            title: "addressline2 required",
          })
      }
    //   if (image === "") {
    //     swal({
    //         title: "image required",
    //       })
    //   }
      if (postcode === "") {
        swal({
            title: "postcode required",
          })
      }
      if (role.length === 0) {
        swal({
            title: "role required",
          })
      }
      if (gender.length === 0) {
        swal({
            title: "gender required",
          })
      }
      if (city.length === 0) {
        swal({
            title: "city required",
          })
      }
      if (state.length === 0) {
        swal({
            title: "state required",
          })
      }
      if (country.length === 0) {
        swal({
            title: "country required",
          })
      }
  
    request({
      url: `forms/updateuser/${id}`,
      method: "PUT",
      data: inputs,
      //   headers: {
      //     Authorization: window.localStorage.getItem("myapptoken"),
      //   },
    })
      .then((res) => {
        close()
        editfetch()
        toast.success(res.message);
      })
      .catch((res) => {
        // toast.error(res.data.message);
      });
  };

  const fetchsettingUser = async () => {
    await request({
      url: `setting/getsettings`,
      method: "GET",
      //    headers: {
      //      Authorization: window.localStorage.getItem("myapptoken"),
      //    },
    })
      .then((res) => {
        setSettinginfo(res);
        console.log(res);
      })
      .catch((res) => {
        toast.error(res.data.message);
      });
  };
  useEffect(() => {
    fetchsettingUser();
  }, []);

  const roleOptions = settinginfo?.map((e) => {
    return {
      value: `${e.role}`,
      label: `${e.role}`,
      name: `${e.role}`,
    };
  });

const genderOptions = [{
    value: "male",
    label: "male",
    name: "male",

},
{
  value: "female",
  label: "female",
  name: "female",
}];

function convertBase64 (file,type) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        // console.log(fileReader.result);
       
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
    .then(files => {
        if(type == 'Add'){
            setValues(previous => ({
                
                ...previous,
                image: files
            }))
        }
          })
  }

const handleFileChange = (e) => {
    console.log(e.target.files);
    setDelImgName(e.target.files);
    convertBase64(e.target.files[0],'Add')
  };

  const deleteselectImage = () => {
    let deleteicon = document.getElementById('delImg')
    let iconclass = document.getElementsByClassName('fa-trash')
          setDelImgName((prevtxt) => ({
            ...prevtxt,
            deleteimageName:delete[deleteimageName]
          }))

    setValues((prevDel) => ({
        ...prevDel,
        image:""
    }))
    if(image === ""){
        iconclass.setAttribute('class',"")
    }
  }
  return (
    <div>
      <div class="container">
        <header class="header">
          <h1 id="title" class="text-center">
            Survey Form
          </h1>
          <p id="description" class="text-center">
            Thank you for taking the time to help us improve the platform
          </p>
        </header>
        <div class="form-wrap">
          <form id="survey-form">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label id="name-label" for="name">
                    Firstname
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="Enter your name"
                    class="form-control"
                    value={firstname}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label id="email-label" for="email">
                    Lastname
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Enter your email"
                    class="form-control"
                    value={lastname}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label id="number-label" for="number">
                    email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    min="10"
                    max="99"
                    class="form-control"
                    placeholder="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="mobileno"
                    id="mobileno"
                    min="10"
                    max="99"
                    class="form-control"
                    placeholder="mobile"
                    value={mobileno}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Date of birth</label>
                <input
                  type="date"
                  name="DOB"
                  id="DOB"
                  min="10"
                  max="99"
                  class="form-control"
                  placeholder="Date of birth"
                  value={DOB ? moment(DOB) : null}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Addresline1</label>
                  <input
                    type="text"
                    name="addressline1"
                    id="addressline1"
                    min="10"
                    max="99"
                    class="form-control"
                    placeholder="addressline1"
                    value={addressline1}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label>Addressline2</label>
                  <input
                    type="text"
                    name="addressline2"
                    id="addressline2"
                    min="10"
                    max="99"
                    class="form-control"
                    placeholder="addressline2"
                    value={addressline2}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>city</label>
                  <Select
                    isClearable={true}
                    isSearchable={true}
                    isMulti={true}
                    classNamePrefix="input__select"
                    placeholder="Select city"
                    //   name="shopkeeper"
                    value={{ value: city, label: city }}
                    onChange={(e) => {
                      handleSelectChange(e, "city");
                    }}
                    // options={cityoptions}
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label>country</label>
                  <Select
                    isClearable={true}
                    isSearchable={true}
                    isMulti={true}
                    classNamePrefix="input__select"
                    placeholder="Select country"
                    //   name="shopkeeper"
                    value={{ value: country, label: country }}
                    onChange={(e) => {
                      handleSelectChange(e, "country");
                    }}
                    // options={countryOptions}
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>state</label>
                  <Select
                    isClearable={true}
                    isSearchable={true}
                    isMulti={true}
                    classNamePrefix="input__select"
                    placeholder="Select state"
                    //   name="shopkeeper"
                    value={{value:state,label:state}}
                    onChange={(e) => {
                      handleSelectChange(e, "state");
                    }}
                    // options={stateOptions}
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>gender</label>
                  <Select
                    isClearable={false}
                    isSearchable={true}
                    classNamePrefix="input__select"
                    placeholder="Select gender"
                    //   name="shopkeeper"
                    value={{value:gender,label:gender}}                   
                     onChange={(e) => {
                        handleSelectChange(e, "gender");
                    }}
                    options={genderOptions}
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Role</label>
                  <Select
                    isClearable={false}
                    isSearchable={true}
                    classNamePrefix="input__select"
                    placeholder="Select role"
                    isMulti={false}
                    //   name="shopkeeper"
                    // value={{value:role,label:role}}
                    onChange={(e) => {
                        handleMultiSelectChange(e, "role");
                    }}
                    options={roleOptions}
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>postcode</label>
                  <input
                    type="text"
                    name="postcode"
                    id="postcode"
                    min="10"
                    max="99"
                    class="form-control"
                    placeholder="postcode"
                    onChange={handleChange}
                    value={postcode}
                  />
                </div>
              </div>
            </div>
            <div class="row">
            <div class="col-md-6">
                <div class="form-group" id="file-input-container">
                  <label className="">image<span><i class="fa-solid fa-trash" id="delImg" onClick={deleteselectImage}></i></span></label>
                  <img src={image} width="100px" />
                  
                  <br/>
                  <br/>
                  <input
                  className="file-input"
                    type="file"
                    accept=".jpg,.png,.jpeg"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                  />
                  {/* <i class="fa fa-trash" id="remove-icon" onClick={event => removeimage(event)}></i> */}
                </div>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-success"
              onClick={() => handlesubmit(fetchId.id)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
