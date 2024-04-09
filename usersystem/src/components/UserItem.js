import React,{useState,useRef} from 'react'
import add from '../assets/svg/add.svg'
import del from '../assets/svg/delete.svg'
import edit from '../assets/svg/edit.svg'
import Tooltip from '@mui/material/Tooltip';



const UserItem = (props) => {
  const [n,setN]=useState({});
  const ref = useRef(null)
  const refClose = useRef(null)
    const idd=props.user;


    const onChangeee=()=>{

    }
    const submittt=()=>{
      setN({})
    }
    const edituser=(e)=>{
      ref.current.click();
    }

    return (
        <div className="col-md-3 my-3 mx-auto">



        {/*Modale */}
        
        <div className="d-flex justify-content-center my-3">
          <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#staticBackdrop">
            Edit Note
          </button>
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">Add User</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body">
                <h5 className="h5 container">Edit the user data</h5>
                  <form className="container mb-3">

                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="eid" name="eid" value={n.eid} onChange={onChangeee}/>
                    <label htmlFor="eid">ID of the user</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="efname" name="efname" value={n.efname} onChange={onChangeee}/>
                    <label htmlFor="efname">First Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="elname" name="elname" value={n.lname} onChange={onChangeee}/>
                    <label htmlFor="elname">Last Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="egender" name="egender" value={n.egender} onChange={onChangeee}/>
                    <label htmlFor="egender">Gender of user</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="eavatar" name="eavatar" value={n.eavatar} onChange={onChangeee}/>
                    <label htmlFor="eavatar">Avatar Link</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="edomain" name="edomain" value={n.edomain} onChange={onChangeee}/>
                    <label htmlFor="edomain">Domain</label>
                  </div>
                  

                  </form>
                </div>

                <div className="modal-footer">
                  <button type="button" ref={refClose} className="btn btn-danger" data-bs-dismiss="modal">X</button>
                  <button type="submit" className="btn btn-primary" onClick={submittt}>Edit Note</button>
                </div>
              </div>
            </div>
          </div>
          </div>




          <div className={`card m-auto ${window.innerWidth < 768 ? 'flex-row' : '' } `} >
            <div className='my-1'>
                <img src={idd.avatar} alt="" className='mx-auto h-[10vh] w-[10vh]'/>
                <h6>{idd.id}</h6>
                <h6>{idd.gender}</h6>
                <h6><small>{idd.available ? <h3 className='text-green-500'>Available</h3> : <h3 className='text-red-600'>Not Available</h3>}</small></h6>
                <div className="flex justify-around mt-[2vh]">
                  <Tooltip arrow title="Add User"><img src={add} alt="Add to team" className='h-[3vh] cursor-pointer'/></Tooltip>
                  <Tooltip arrow title="Edit User"><img onClick={edituser} src={edit} alt="Edit User" className='h-[3vh] cursor-pointer'/></Tooltip>
                  <Tooltip arrow title="Delete User"><img src={del} alt="Delete User" className='h-[3vh] cursor-pointer'/></Tooltip>
                  
                  
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
