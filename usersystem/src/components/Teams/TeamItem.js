import React,{useState,useEffect} from "react";
import cross from "../../assets/svg/cross.svg";
import nouser from "../../assets/svg/nouser.svg";

const TeamItem = (props) => {
  let idd = props.user;
  const [device,setDevice]= useState(window.innerWidth < 768 ? 'mobile':'desktop');
  useEffect(() => {
    window.addEventListener("resize", () => {
    window.innerWidth < 768 ? setDevice('mobile') : setDevice('desktop');
    })
  })
  return (
      <div className="col-md-4 my-2">
        <div className={`card rounded-2xl ${device==='mobile' ? "flex-row" : "flex"} `}>
            <div>
              <img src={cross} alt="X" className={`${device==='mobile' ? 'h-[2.5vh]' : 'h-[4.5vh]'} absolute right-0 cursor-pointer`} onClick={()=>(props.del(idd))}/>
            </div>
            <div className={` bg-blue-100 p-[2vw]  ${device==='mobile' ? "rounded-l-xl" : "rounded-t-xl"} flex items-center text-center`}>
              <img src={!idd.avatar || idd.avatar.slice(0,5)!=='https' ? nouser : idd.avatar} alt="Not available" className={`mx-auto w-[10vh] h-[10vh]`}/>
              <div className="py-2 px-2 flex-row justify-center text-center">
              <h6>{idd.id}</h6>
              <h6>{idd.gender}</h6>
              <h6><small>{idd.available ? <h3 className="text-green-500">Available</h3> : <h3 className="text-red-700">Not Available</h3>}</small></h6>
              </div>
            </div>
          <div className={`text-center ${device==='mobile' ? 'ml-[1vh]' : ''}`}>
            <h2 className="h4 mt-[0.6vw] py-1">{idd.first_name ? idd.first_name : "User not found"} {idd.last_name}</h2>
            <h6 className="h6 mb-2 text-body-secondary">{idd.email && idd.email.length > 20  && window.innerWidth<500 ? idd.email.slice(0,15) : idd.email }</h6>
            <p>{idd.domain}</p>
          </div>
        </div>
      </div>
  );
};

export default TeamItem;
