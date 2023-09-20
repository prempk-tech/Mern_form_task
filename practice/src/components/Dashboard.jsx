import React, { useEffect, useState } from "react";
import request from "../api/api";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import Select from "react-select";
import Pagination from "react-js-pagination";
import FileSaver from "file-saver";
import AOS from "aos";
import "aos/dist/aos.css";

import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Edituser from "./Edituser";
import swal from "sweetalert";
import "../styles/dashboard.css";
import FormPage from "./FormPage";
import Setting from "./Setting";
import useCustomForm from "../UseCustomForm";

//redux part
import { useDispatch, useSelector } from 'react-redux';
import { addImage, setImages } from '../redux/imageSlice';
import store from "../store/store";
import Test from "./Test";
import Value from "./Value";
const initialValues = {
    image:""
}

// import something from '../../../practice_backend/src/uploads/userProfilePhoto/gNuwNlkC8Mad..jpg';

export default function Dashboard() {
  let [userInfo, setUserinfo] = useState([]);
  let [AdminImage, setAdminimage] = useState([]);
  let [AggregateUser, setAggregateuser] = useState([]);
  let [settinginfo, setSettinginfo] = useState([]);
  const [viewImage, setViewImage] = useState();
  const [count, setCount] = useState(0);


  const {
    values: inputs,
    setValues,
    // handleChange,
    // handleSelectChange,
    validateEmail,
  } = useCustomForm({
    initialValues,
    onSubmit: () => onsubmit(),
  });

  const {
image
  } = inputs;

  let [editModal, setEditModal] = useState(false);
  const [id, setID] = useState({});
  const [aggregate, setAggregate] = useState({
    search: "",
    State:"",
    gender: "",
    roles: "",
    pageLimit: "5",
    skip: "0",
  });
  const [Model, setOpenModal] = useState(false);
  const [imagefile,setimagefile] = useState()
  const [settingModel, setSettingOpenModal] = useState(false);

  //pages
  const [pages, setPages] = useState();
  const [activepage, setActivepage] = useState(1);
  const [currentPage, setCurrentpage] = useState(parseInt(aggregate.pageLimit));
  console.log(currentPage);

  //redux states
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
console.log('..'+images);

  const paginate = (data) => {
    const limit = (typeof aggregate.pageLimit != 'string') ? aggregate.pageLimit[0].value : aggregate.pageLimit;
    if (data) {
      setActivepage(data);
      setAggregate((state) => {
        return {
          ...state,
          skip: data * limit - limit,
        };
      });
    }
  };
  const pageLimitOption = [
    {
      label: "5",
      value: "5",
    },
    {
      label: "10",
      value: "10",
    },
    {
      label: "20",
      value: "20",
    },
  ];

  const toggle = () => {
    setOpenModal(!Model);
  };
  const settingToggle = () => {
    setSettingOpenModal(!settingModel);
  };

  for (let key in aggregate) {
    console.log(key);
    if (key.includes("Value")) {
      delete aggregate[key];
    }
  }

  let aggregateApi = async () => {
    // console.log(aggregate);
    request({
      url: `forms/userData/aggregate`,
      method: "POST",
      data: aggregate,
    }).then((res) => {
      setAggregateuser(res.response.result);
      console.log(res.response.fullcount);
      setPages(res.response.fullcount);
    });
  };

  useEffect(() => {
    aggregateApi();
  }, [aggregate]);

  console.log(AggregateUser);
  const handleChange = (e) => {
    console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    // console.log("value",value);
    setTimeout(() => {
      setAggregate((state) => ({
        ...state,
        [name]: value,
      }));
    }, 1000);
  };

  const fetchUser = async () => {
    await request({
      url: `forms/getuser`,
      method: "GET",
      //    headers: {
      //      Authorization: window.localStorage.getItem("myapptoken"),
      //    },
    })
      .then((res) => {
        console.log(res);
        setUserinfo(res);
      })
      .catch((res) => {
        toast.error(res.data.message);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const editToggle = (e, dataId) => {
    e.stopPropagation();
    setID({ id: dataId });
    setEditModal(!editModal);
  };

  const closeEditToggle = () => {
    setEditModal(!editModal);
  };

  //   const closeToggle = () => {
  //     setOpenModal(!Model);
  //   };

  const deleteuserData = (id) => {
    console.log(id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Item Details!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        request({
          url: `forms/deleteuser/${id}`,
          method: "DELETE",
          // headers: {
          //   Authorization: window.localStorage.getItem("myapptoken"),
          // },
        })
          .then((res) => {
            toast.success(res.message);
            aggregateApi();
          })
          .catch((res) => {
            //   toast.error(res.data.message);
          });
      }
    });
  };

  const roleOptions = settinginfo?.map((e) => {
    console.log(e);
    return {
      value: `${e.role}`,
      label: `${e.role}`,
      name: `${e.role}`,
    };
  });

  const stateOptions = settinginfo?.map((e) => {
    console.log(e);
    return {
      value: `${e.state}`,
      label: `${e.state}`,
      name: `${e.state}`,
    };
  });
  console.log(stateOptions);

  //   const roleOptions = [{
  //     value: "web developer",
  //     label: "web developer",
  //     name: "web developer",

  // },
  // {
  //   value: "web designer",
  //   label: "web designer",
  //   name: "web designer",
  // },
  // {
  //   value: "software developer",
  //   label: "software developer",
  //   name: "software developer",
  // }];

  const genderOptions = [
    {
      value: "male",
      label: "male",
      name: "male",
    },
    {
      value: "female",
      label: "female",
      name: "female",
    },
  ];

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

  const handlepagechange = (event, state) => {
    console.log("pagination", event);
    var data = event;
    if (data) {
      const { value } = data;
      const array = Array.of(data);
      setAggregate({ ...aggregate, [state]: value, [state]: array });
    } else {
      setAggregate({ ...aggregate, [state]: "", [state]: "" });
    }
  };

  const handleSelectChange = (event, state) => {
    console.log(event);
    var data = event[0]?.value;
    console.log(data);
    if (data) {
      const { value } = data;
      console.log(value);
      const array = Array.of(data);
      setAggregate({ ...aggregate, [state]: value, [state]: array });
    } else {
      setAggregate({ ...aggregate, [state]: "", [state]: "" });
    }
  };

//   const handlestatechange = (event, state) => {
//     alert(event)
//     var data = event[0]?.value;
//     if (data) {
//       const { value } = data;
//       console.log(value);
//       const array = Array.of(data);
//       setAggregate({ ...aggregate, [state]: value, [state]: array });
//     } else {
//       setAggregate({ ...aggregate, [state]: "", [state]: "" });
//     }
//   };


  console.log(inputs.image);

  const downloadPdf=(userid)=>{
    console.log(userid);
    toast.loading("Downloading....");
    request({
      url: `forms/download/test`,
      method: "POST",
      responseType: 'blob',
      data:{userId:userid},
    })
      .then((res) => {
        toast.remove()
        const file = new Blob([res], { type: 'application/pdf' });
        console.log(file);
      FileSaver.saveAs(file, `test.pdf`);
      toast.success('Download success !');
      })
      .catch((res) => {
        toast.error(res.data.message);
      });
  }

  const handleFileChange = (data) => {
console.log(data.target.files);
    const [file] = data.target.files;

    if (!file || !file.type.startsWith("image/") || file.size > 5242880) {
      toast.error("Maximum Size 5MB or format should be png,jpg,jpge");
      return;
    }
console.log(file);
    setViewImage(URL.createObjectURL(file));
    setValues({ ...inputs, image: file });
  };

  const handleUpload = () => {
    console.log(image);
    var formdata = {};
    formdata['image'] = image

      console.log(formdata);
      var imageform = new FormData;
      var photo = formdata.image
      imageform.append('imgdata',photo)
        console.log(imageform);

        request({
          url: `forms/uploadImage`,
          method: "POST",
          data: imageform,
        }).then((res) => {
        // dispatch(addImage(res.result.image))
        });
    
    //   useEffect(() => {
    //     aggregateApi();
    //   }, [aggregate]);

  }

  const fetchAdminImage = async () => {
    await request({
      url: `forms/getAdminImage`,
      method: "GET",
      //    headers: {
      //      Authorization: window.localStorage.getItem("myapptoken"),
      //    },
    })
      .then((res) => {
        console.log(res)
        dispatch(setImages(res[0].image))

  //  var redimage = res.map((item) => item.image)

      })
      .catch((res) => {
        toast.error(res.data.message);
      });
  };
  useEffect(() => {
    fetchAdminImage();
  }, []);

const handleIncrement = () => {
  for (let index = 0; index < 5; index++) {
    setCount(prevCount => prevCount + 1) 
  }

}

const handleDecrement = () => {
  for (let index = 0; index < 5; index++) {
    setCount(prevCount => prevCount - 1) 
  }
}

const handleAdd = () => {
  
}

  return (
    <div>
      <nav
        class="navbar navbar-expand-md navbar-dark"
        style={{ backgroundColor: "blue" }}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <span>User Dashboard</span>
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
          <div>
              <img src={`..${images}`} />
              {console.log(`..${images}`)}
            <input type="file" accept=".jpg,.png,.jpeg" id="image" name="image" onChange={e => handleFileChange(e)}/>
                      <button type="button" class="btn btn-success btn-lg add" onClick={handleUpload}>

        Change image
      </button>
          </div>
        </div>

        <div class="container-fluid">
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="text"
              id="search"
              name="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleChange}
            />
            <button class="btn btn-outline-info" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <button type="button" class="btn btn-primary btn-lg add" onClick={toggle}>
        Add user
      </button>
      <Modal centered isOpen={Model} toggle={toggle} className="custom-modal">
        <ModalHeader>
          <h2>users</h2>
        </ModalHeader>
        <ModalBody>
          <FormPage toggle={toggle} fetch={aggregateApi} />
        </ModalBody>
      </Modal>
      <br />

<div data-aos="flip-right">
      <button
        type="button"
        class="btn btn-warning btn-lg add"
        onClick={settingToggle}
      >
        Settings
      </button>
      </div>
      <div>
        <button onClick={handleDecrement}>-</button>
        <input type="text" value={count} placeholder="" />
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleAdd}>Add</button>
      </div>
      <Modal
        centered
        isOpen={settingModel}
        toggle={settingToggle}
        className="custom-modal"
      >
        <ModalHeader>
          <h2>Roles and states</h2>
        </ModalHeader>
        <ModalBody>
          <Setting toggle={settingToggle} fetch={fetchsettingUser} />
        </ModalBody>
      </Modal>

   
      <div class="s-flex">
        {/* <div class="row">
              <div class="col-md-2"> */}
        <div class="form-group">
          {/* <label>state</label> */}
          <Select
            isClearable={false}
            isSearchable={true}
            classNamePrefix="input__select"
            className="inselect"
            placeholder="roles"
            isMulti={true}
            //   name="shopkeeper"
            // defaultValue={state}
            onChange={(e) => {
              handleSelectChange(e, "roles");
            }}
            options={roleOptions}
          />
          {/* </div>
              </div> */}
        </div>
        <Select
          isSearchable={false}
          isClearable={false}
          classNamePrefix="filter__select"
          placeholder="Page Limit"
          name="pageLimit"
          // styles={filterStyles}
          options={pageLimitOption}
          onChange={(e) => handlepagechange(e, "pageLimit")}
        />

        <Select
          isSearchable={false}
          isClearable={true}
          classNamePrefix="filter__select"
          className="inselect"
          placeholder="State"
          name="State"
          isMulti={true}
          // styles={filterStyles}
          options={stateOptions}
          onChange={(e) => handleSelectChange(e, "State")}
        />
        {/* <div class="row">
              <div class="col-md-2"> */}
        <div class="form-group">
          {/* <label>state</label> */}
          <Select
            isClearable={false}
            isSearchable={true}
            classNamePrefix="input__select"
            className="inselect"
            placeholder="gender"
            isMulti={true}
            //   name="shopkeeper"
            // defaultValue={state}
            onChange={(e) => {
              handleSelectChange(e, "gender");
            }}
            options={genderOptions}
          />
          {/* </div>
              </div> */}
        </div>
      </div>
      <Value />
      <table class="table">
        <thead>
          <tr>
            <th scope="col">S.no</th>
            <th scope="col">Profile Image</th>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">email</th>
            <th scope="col">mobile</th>
            <th scope="col">DOB</th>
            <th scope="col">Roles</th>
            <th scope="col">States</th>
            <th scope="col">Gender</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {AggregateUser?.map((data, index) => {
            console.log(data);
            return (
              <tr class="table-primary">
                <th scope="row">{index + 1}</th>
                <td><img src={data?.image} style={{width:'100px'}} /></td>
                <td>{data?.firstname}</td>
                <td>{data?.lastname}</td>
                <td>{data?.email}</td>
                <td>{data?.mobileno}</td>
                <td>{new Date(data?.DOB).toLocaleDateString("en-GB")}</td>
                <td>{data?.role}</td>
                <td>{data?.state}</td>
                <td>{data?.gender}</td>
                <td class="table-info">
                  <Link to={`/detailpage/${data._id}`}>
                    <i class="fa-regular fa-eye"></i>|
                  </Link>
                  <i
                    class="fa-regular fa-pen-to-square"
                    onClick={(e) => editToggle(e, data._id)}
                  ></i>
                  |
                  <i class="fa fa-download" aria-hidden="true" onClick={()=>{downloadPdf(data._id)}}></i>
                  
                  <i
                    class="fa-regular fa-trash-can"
                    onClick={() => deleteuserData(data._id)}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {AggregateUser.length === 0 ? (
        <div className="text-center">No Records Available</div>
      ) : (
        ""
      )}
      <Modal
        centered
        isOpen={editModal}
        toggle={editToggle}
        className="custom-modal"
      >
        <ModalHeader>
          <h4 className="modal-title">Edit User</h4>
        </ModalHeader>
        <ModalBody>
          <Edituser
            toggle={editToggle}
            fetchId={id}
            close={closeEditToggle}
            editfetch={aggregateApi}
          />
        </ModalBody>
      </Modal>
      <Pagination
        //   prevPageText={<img src={pageLeftArrow} alt="arrow" />}
        //   nextPageText={<img src={pageRightArrow} alt="arrow" />}
        //   firstPageText={<img src={pageLeftDoubleArrow} alt="arrow" />}
        //   lastPageText={<img src={pageRightDoubleArrow} alt="arrow" />}
        activePage={activepage}
        itemsCountPerPage={currentPage}
        totalItemsCount={pages}
        pageRangeDisplayed={4}
        onChange={paginate}
        itemClass="page-item"
        linkClass="page-link"
      />
      <Test />
    </div>
  );
}
