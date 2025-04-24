import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Myprofile = () => {
  const [useData,setUseData]=useState({
    name:"Edward vincent",
    image:assets.profile_pic,
    email:'richardjameswap@gmail.com',
    phone:'+1 123 456 7890',
    address:{
      line1:"57th cross ,Richmond",
      line2:"circle,church Road ,london"
    },
    gender:'Male',
    dob:'2000-01-20 '

  })
  return (
    <div>
      <img src={useData.image} alt="" />
     
    </div>
  )
}

export default Myprofile
