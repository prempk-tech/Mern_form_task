import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
  role:[],
  gender:[],
  country: [],
  city: [],
  state: [],
  postcode: "",
};
export default function FormPage({toggle,fetch}) {
  let [Country, setCountry] = useState([]);
  let [states, setStates] = useState([]);
  const [viewImage, setViewImage] = useState();
  let [settinginfo, setSettinginfo] = useState([]);
  let [City, setCity] = useState([]);
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

  const {
    firstname,
    lastname,
    email,
    mobileno,
    DOB,
    image,
    addressline1,
    addressline2,
    gender,
    role,
    country,
    city,
    state,
    postcode,
  } = inputs;

  const cityoptions = City?.map((e) => {
    return{
        value: `${e.name}`,
      label: `${e.name}`,
      name: `${e.name}`,
    }
  })

  const countryOptions = Country?.map((e) => {
    return {
      value: `${e.name}`,
      label: `${e.name}`,
      name: `${e.name}`,
    };
  });



// const roledata = roleOptions.map((e) => {
//     return e.value
// })


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

const stateOptions = settinginfo?.map((e) => {
    return {
      value: `${e.state}`,
      label: `${e.state}`,
      name: `${e.stae}`,
    };
  });

  const roleOptions = settinginfo?.map((e) => {
    return {
      value: `${e.role}`,
      label: `${e.role}`,
      name: `${e.role}`,
    };
  });

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

  const fetchcities = async () => {
    await request({
      url: `https://api.countrystatecity.in/v1/countries/IN/cities`,
      method: "GET",
         headers: {
            'X-CSCAPI-KEY': 'R3kxa1gwUlc5TVU3bDhqa0lmZXd5Mko0QUdVU1hkZzJhZGtBOVo2Qg=='
         },
    })
      .then((res) => {
        console.log(res);
        setCity(res);
      })
      .catch((res) => {
        toast.error(res.data.message);
      });
  };

  useEffect(() => {
    fetchcities();
  }, []);

  const fetchStates = async () => {
    await request({
      url: `https://api.countrystatecity.in/v1/states`,
      method: "GET",
         headers: {
            'X-CSCAPI-KEY': 'R3kxa1gwUlc5TVU3bDhqa0lmZXd5Mko0QUdVU1hkZzJhZGtBOVo2Qg=='
         },
    })
      .then((res) => {
        console.log(res);
        setStates(res);
      })
      .catch((res) => {
        toast.error(res.data.message);
      });
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchCountries = async () => {
    await request({
      url: `https://api.countrystatecity.in/v1/countries`,
      method: "GET",
         headers: {
            'X-CSCAPI-KEY': 'R3kxa1gwUlc5TVU3bDhqa0lmZXd5Mko0QUdVU1hkZzJhZGtBOVo2Qg=='
         },
    })
      .then((res) => {
        console.log(res);
        setCountry(res);
      })
      .catch((res) => {
        toast.error(res.data.message);
      });
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  const handlesubmit = (e) => {
    e.preventDefault()
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
      if (image === "") {
        swal({
            title: "image required",
          })
      }
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
      url: `forms/Reguser`,
      method: "POST",
      data: inputs,
      //   headers: {
      //     Authorization: window.localStorage.getItem("myapptoken"),
      //   },
    })
      .then((res) => {
        console.log(res);
        toast.success(res.message);
        toggle();
        fetch();
      })
      .catch((res) => {
        // toast.error(res.data.message);
      });
  };

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
    convertBase64(e.target.files[0],'Add')

//     const [file] = e.target.files;

//     if (!file || !file.type.startsWith("image/") || file.size > 5242880) {
//       toast.error("Maximum Size 5MB or format should be png,jpg,jpge");
//       return;
//     }
// console.log(file);
//     setViewImage(URL.createObjectURL(file));
//     setValues({ ...inputs, image: file });
  };

  const removeimage = (event) => {
    console.log(event.target.id);
    const removeIcon = document.getElementById("remove-icon");

    const selectedFile = event.target.id;

    if (selectedFile) {
        removeIcon.style.display = "inline-block"; // Show the remove icon
      }

        // Event listener to trigger when remove icon is clicked
        // Reset the file input value to remove the selected file
        // fileInput.value = "";
        // removeIcon.style.display = "none"; // Hide the remove icon again
  
  }

  const deleteselectImage = () => {
    let deleteicon = document.getElementById('delImg')
    let iconclass = document.getElementsByClassName('fa-trash')
        //   setDelImgName((prevtxt) => ({
        //     ...prevtxt,
        //     deleteimageName:delete[deleteimageName]
        //   }))

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
                  value={DOB}
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
                    isClearable={false}
                    isSearchable={true}
                    classNamePrefix="input__select"
                    placeholder="Select city"
                    isMulti={true}
                    //   name="shopkeeper"
                    defaultValue={city}
                    onChange={(e) => {
                        handleMultiSelectChange(e, "city");
                    }}
                    options={cityoptions}
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>state</label>
                  <Select
                    isClearable={false}
                    isSearchable={true}
                    classNamePrefix="input__select"
                    placeholder="Select state"
                    isMulti={true}
                    //   name="shopkeeper"
                    defaultValue={state}
                    onChange={(e) => {
                        handleMultiSelectChange(e, "state");
                    }}
                    options={stateOptions}
                  />
                </div>
              </div>
              
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>country</label>
                  <Select
                    isClearable={false}
                    isSearchable={true}
                    classNamePrefix="input__select"
                    placeholder="Select country"
                    isMulti={true}
                    //   name="shopkeeper"
                    defaultValue={country}
                    onChange={(e) => {
                        handleMultiSelectChange(e, "country");
                    }}
                    options={countryOptions}
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
                    defaultValue={gender}
                    onChange={(e) => {
                        handleSelectChange(e, "gender");
                    }}
                    options={genderOptions}
                  />
                </div>
              </div>
            </div>
            <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                  <label>Role</label>
                  <Select
                    isClearable={false}
                    isSearchable={true}
                    classNamePrefix="input__select"
                    placeholder="Select role"
                    isMulti={true}
                    //   name="shopkeeper"
                    defaultValue={role}
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
              onClick={(e) => handlesubmit(e)}
            >
              Submit   
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
