import React, { useState, useEffect } from "react";
import useCustomForm from "../UseCustomForm";
import request from "../api/api";
import { toast } from "react-hot-toast";
const initialValues = {
  role: "",
  state: "",
};
export default function Setting({toggle,fetch}) {

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

  let { role, state } = inputs;

  const handlesubmit = (e) => {

    for (let key in inputs) {
        if (key.includes("Role")) {
          delete inputs[key];
        }
      }

    console.log(inputs);
    request({
        url: `setting/Regrole`,
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
  return (
    <div>
      {/* <div className='container'>
            <div>
                <inpu
            </div>
        </div> */}
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label id="name-label" for="name">
              Roles
            </label>
            <input
              type="text"
              name="role"
              id="role"
              placeholder="Enter your Role"
              class="form-control"
              value={role}
              onChange={handleChange}
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label id="email-label" for="email">
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              placeholder="Enter your State"
              class="form-control"
              value={state}
              onChange={handleChange}
            />
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
    </div>
  );
}
