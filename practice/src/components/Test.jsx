import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Test() {
   useSelector((state) => console.log(state.images));

  return (
    <div>
        {/* <img src={images} /> */}
    </div>
  )
}
