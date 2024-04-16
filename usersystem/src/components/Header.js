import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

  const [device,setDevice]= useState(window.innerWidth < 768 ? 'mobile':'desktop');

  useEffect(() => {
    window.addEventListener("resize", () => {
    window.innerWidth < 768 ? setDevice('mobile') : setDevice('desktop');
    })
  })


  return (
    <div>
        <div className={`${device === 'desktop' ? 'flex' : 'flex-col'} gap-x-[5vw] my-2 justify-around items-center mx-[5vw] `}>
      <h1 className="h1 text-center my-[3vh]"><b>User Management System</b></h1>
      <div className=" flex gap-[2vw] justify-center">
      <Link to="/users" className="btn btn-outline-success text-lg font-semibold">Users</Link>
        <Link to="/teams" className="btn btn-outline-success text-lg font-semibold">Teams</Link>

      </div>
        </div>
        <hr />
    </div>
  )
}

export default Header
