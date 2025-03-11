import React from 'react'
import { NavLink } from 'react-router-dom'
const navbar = () => {
  return (
    <div>
      <img src="front-end/src/assets/admin_logo.svg" alt="" />
      <ul>
        <NavLink>
          <li>Home</li>
          <hr />
        </NavLink>
      </ul>
    </div>
  )
}

export default navbar
