import React from 'react'
import add from '../assets/svg/add.svg'
import del from '../assets/svg/delete.svg'
import edit from '../assets/svg/edit.svg'
import Tooltip from '@mui/material/Tooltip';



const UserItem = (props) => {

  const idd=props.user;

    return (
        <div className="col-md-3 my-3 mx-auto">


          <div className={`card ${window.innerWidth < 768 ? 'flex-row' : '' } `} >
            <div className='m-3 '>
              <div className="bg-red-100 p-[1vh] rounded-xl">
              <img src={idd.avatar} alt="Not available" className='mx-auto h-[10vh] w-[10vh]'/>
                <h6>{idd.id}</h6>
                <h6>{idd.gender}</h6>
                <h6><small>{idd.available ? <h3 className='text-green-500'>Available</h3> : <h3 className='text-red-600'>Not Available</h3>}</small></h6>
              </div>
                <div className="flex justify-around mt-[2vh]">
                  <Tooltip arrow title="Add User"><img src={add} alt="Add to team" className='h-[3vh] cursor-pointer'/></Tooltip>
                  <Tooltip arrow title="Edit User"><img onClick={()=>{props.editUser(idd)}} src={edit} alt="Edit User" className='h-[3vh] cursor-pointer'/></Tooltip>
                  <Tooltip arrow title="Delete User"><img onClick={()=>{props.deleteUser(idd)}} src={del} alt="Delete User" className='h-[3vh] cursor-pointer'/></Tooltip>
                  
                  
                </div>
            </div>
            <div className="card-body my-auto">
              <h2 className="h5 card-title">{idd.first_name} {idd.last_name}</h2>
              <h6 className="h6 card-subtitle mb-2 text-body-secondary">
                {idd.email}

              </h6>
              <p className="card-text">{idd.domain}</p>

            </div>
          </div> 
        </div>
      );
}

export default UserItem
