import React, { useEffect, useState } from 'react'
import axios from 'axios'
const UseApi = (url) => {
  const [data,setData]=useState(null)
  const [load,setLoad]=useState(false)
  const [error,setError]=useState(null)
const getData=async()=>{
  try {    
    setLoad(true)
    const response=await axios.get(url)
    setData(response.data)
    setLoad(false)
  } catch (err) {
    console.log(err)
    setLoad(false)
    setError(err.message)
  }
  }
useEffect(()=>{
  getData()
},[])
  return [data,load,error]
}

export default UseApi