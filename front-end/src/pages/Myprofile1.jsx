import React from 'react'
import { assets } from '../assets/assets'

const Myprofile1 = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: 'richardjameswap@gmail.com',
    phone: '+1 123 456 7890',
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London"
    },
    gender: 'Male',
    dob: '2000-01-20'
  })
  return (
    <div className="p-4 max-w-xl mx-auto text-zinc-700">
    <img
      src={userData.image}
      alt="Profile"
      className="w-32 h-32 rounded-full object-cover mx-auto"
    />
    <h2 className="text-xl font-semibold mt-4 text-center">{userData.name}</h2>
    <div className="mt-4 space-y-1">
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Phone:</strong> {userData.phone}</p>
      <p><strong>Address:</strong> {userData.address.line1}, {userData.address.line2}</p>
      <p><strong>Gender:</strong> {userData.gender}</p>
      <p><strong>Date of Birth:</strong> {userData.dob}</p>
    </div>
  </div>
  )
}

export default Myprofile1
