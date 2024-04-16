import React from "react";
import cross from "../../assets/svg/cross.svg";


const TeamItem = (props) => {
  let idd = props.user;
//   console.log(idd);
  return (
      <div className="col-md-4 my-2">
        <div className={`card rounded-2xl relative ${window.innerWidth < 768 ? "flex-row justify-normal" : ""} `}>
            <div>
              <img src={cross} alt="X" className="h-[4.5vh] absolute right-0 cursor-pointer" onClick={()=>(props.del(idd))}/>
            </div>
            <div className={` bg-blue-100 p-[2vw]  ${window.innerWidth < 768 ? "rounded-l-xl" : "rounded-t-xl"} flex items-center`}>
              <img src={idd.avatar ? idd.avatar : "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"} alt="Not available" className={`mx-auto w-[10vh] h-[10vh]`}/>
              <div className="py-2 px-2 flex-row justify-center text-center">
              <h6>{idd.id}</h6>
              <h6>{idd.gender}</h6>
              <h6><small>{idd.available ? <h3 className="text-green-500">Available</h3> : <h3 className="text-red-700">Not Available</h3>}</small></h6>
              </div>
            </div>
          <div className={`text-center ${window.innerWidth < 768 ? 'ml-[10vh]' : ''}`}>
            <h2 className="h4 mt-[0.6vw] py-1">{idd.first_name ? idd.first_name : "User not found"} {idd.last_name}</h2>
            <h6 className="h6 mb-2 text-body-secondary">{idd.email}</h6>
            <p>{idd.domain}</p>
          </div>
        </div>
      </div>
  );
};

export default TeamItem;
