import React from 'react'




const UserItem = (props) => {
    const idd=props.user;
    return (
        <div className="col-md-3 my-3 mx-auto">
          <div className={`card m-auto ${window.innerWidth < 768 ? 'flex-row' : '' } `} >
            <div className='my-1'>
                <img src={idd.avatar} alt="" className='mx-auto h-[10vh] w-[10vh]'/>
                <h6>{idd.id}</h6>
                <h6>{idd.gender}</h6>
                <h6><small>{idd.available ? "Available" : "Not Available"}</small></h6>
            </div>
            <div className="card-body my-auto">
              <h2 className="card-title">{idd.first_name} {idd.last_name}</h2>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {idd.email}

              </h6>
              <p className="card-text">{idd.domain}</p>

            </div>
          </div> 
        </div>
      );
}

export default UserItem
