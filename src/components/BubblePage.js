import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  // 1. Make an axios call to retrieve all color data and push to state on mounting.
  useEffect(() => {
    getData()
  }, [])


 const getData = () => {
   // making call using axios with auth
   axiosWithAuth()
   .get('http://localhost:5000/api/colors', {
     headers: {
       authorization: localStorage.getItem('token')
     }
   })
   .then(res => {
     // set the state of the colors to the response
     setColorList(res.data)
   })
   .catch(err => {
     // if something breaks, the console log tells where the error is
     console.log('error getting data: ', err)
   })
 }
 

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

//Task List:
