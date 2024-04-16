import React,{useEffect,useState} from 'react'
import add from '../../assets/svg/add.svg'
import del from '../../assets/svg/delete.svg'
import edit from '../../assets/svg/edit.svg'
import nouser from '../../assets/svg/nouser.svg';
import Tooltip from '@mui/material/Tooltip';

const UserItem = (props) => {

  const [device,setDevice]= useState(window.innerWidth < 768 ? 'mobile':'desktop');
  const [mobile,setMobile]= useState(window.innerWidth < 500 ? 'small':'large');

  useEffect(() => {
    window.addEventListener("resize", () => {
    window.innerWidth < 768 ? setDevice('mobile') : setDevice('desktop');
    window.innerWidth < 500 ? setMobile('small') : setMobile('large');
    })
  })

  const idd=props.user;

    return (
        <div className="col-md-3 my-3 ">

          <div className={`card ${window.innerWidth < 768 ? 'flex-row justify-center' : '' } `} >
            
            <div className={`my-2 ${device==='mobile' ? `flex ${window.innerWidth > 500 ? 'mx-3' : ''} gap-[1vh]` : ''}`}>
              <div className={`${mobile==='large' && device==='mobile' ? 'flex items-center' : window.innerWidth > 1100 ? 'flex justify-center':'flex-col'} bg-red-100 rounded-xl mx-1 my-2`}>
                <div className='justify-center flex'><img src={!idd.avatar || idd.avatar.slice(0,5)!=='https' ? nouser : idd.avatar} alt="Not available" className='h-[10vh]'/></div>

              <div className='py-2 px-2 flex-row justify-center text-center  mr-1'>
                <h6 className='h5'>{idd.id}</h6>
                <h6 className='font-semibold'>{idd.gender}</h6>
                <h6><small>{idd.available ? <h3 className='text-green-500'>Available</h3> : <h3 className='text-red-600'>Not Available</h3>}</small></h6>
                </div>
              </div>
                <div className={`flex justify-around ${device==='mobile' ? 'flex-col' : '' }`}>
                  <Tooltip arrow title="Add User to Team"><img onClick={()=>{props.addUserToTeam(idd.id)}} src={add} alt="Add to team" className='h-[3vh] cursor-pointer' /></Tooltip>
                  <Tooltip arrow title="Delete User"><img onClick={()=>{props.deleteUser(idd)}} src={del} alt="Delete User" className='h-[3.2vh] cursor-pointer'/></Tooltip>
                  <Tooltip arrow title="Edit User"><img onClick={()=>{props.editUser(idd)}} src={edit} alt="Edit User" className='h-[3vh] cursor-pointer'/></Tooltip>
            </div>
            </div>
            
            <div className="card-body my-auto flex-col mx-0">
              <h2 className="h5">{idd.first_name} {idd.last_name}</h2>
              <h6 className="h6 mb-2 text-body-secondary">{idd.email.length > 20  && window.innerWidth<500 ? idd.email.slice(0,15) : idd.email }</h6>
              <p>{idd.domain}</p>

            </div>
          </div> 
        </div>
      );
}

export default UserItem

// type="button" aria-expanded="false"