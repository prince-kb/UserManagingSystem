import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div>
        <div className="flex gap-x-[5vw] justify-around items-center mx-[5vw]">
      <h1 className="h1 container my-[3vh]"><b>User Management System</b></h1>
        <Link to="/users" className="btn btn-outline-success text-lg font-semibold">Users</Link>
        <Link to="/teams" className="btn btn-outline-success text-lg font-semibold">Teams</Link>
        </div>
        <hr />
    </div>
  )
}

export default Header
