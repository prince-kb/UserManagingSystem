import { useEffect, useState,useLayoutEffect } from "react";
import UserItem from "./components/UserItem";
import la from './assets/svg/leftarrow.svg'
import ra from './assets/svg/rightarrow.svg'
function App() {

  const[fixedUsers,setFixedUsers] = useState([{"id":1000,"first_name":"Haydon","last_name":"Polly","email":"hpollyrr@upenn.edu","gender":"Male","avatar":"https://robohash.org/sequiquiabeatae.png?size=50x50&set=set1","domain":"Business Development","available":true}])
  const [loading,setLoading]= useState(false);
  const p = async()=>{
    const response = await fetch(`https://ums-backend-seven.vercel.app/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  const n = await response.json();
  return n;
  // console.log(n.users)
}

useEffect(()=>{
  // console.log(fixedUsers)
  p().then((data)=>{setFixedUsers(data)
  });
  // console.log(fixedUsers)
  // setList(fixedUsers)
  // setL(list);
})
  const [list,setList]=useState(fixedUsers);
  const [i,setI]=useState(0);
  const [l,setL] = useState(list.slice(20*i,20*i+20<list.length ? 20*i+20 : list.length))

  const [suser,setSuser]=useState({s : ""})
 
  const onChange=(e)=>{
    setSuser({...suser,[e.target.name] : e.target.value})
    let z = e.target.value.toLowerCase()
    !loading && setList(list.filter((val)=>{
      return val.first_name.slice(0,z.length).toLowerCase()===z || val.last_name.slice(0,z.length).toLowerCase()===z
    }))
  }

    const submit=async (e)=>{
    e.preventDefault();
    if(!loading){
    setI(0);
    let z = suser.s.toLowerCase
    !loading && setList(list.filter((val)=>{
      return val.first_name.slice(0,z.length).toLowerCase()===z|| val.last_name.slice(0,z.length).toLowerCase()===z
    }))
    setList(fixedUsers)
  }}

  return (
    <div className=" text-center flex-col">
      <h1 className="h1 container bg-emerald-300">Welcome</h1>
      <div className="mx-2 flex items-center justify-center gap-[2vw]">
      <input type="text" onBlur={()=>setList(fixedUsers)} className="form-control" id="s" placeholder="Search user by name" name="s" value={suser.s} onChange={onChange} minLength={1}/>
        <button type="button" className="btn btn-primary" onClick={submit}>Search</button>
        </div>

      <div className="card card-body" style={{width: "100vw"}}>
            <div className="row">
                <h2 className="h2 d-flex justify-content-center"> <b>All Users</b> </h2>
                {!loading && l.length>0 ? l.map((user,index) =>(
                  <UserItem key={index} user = {user}/>)
                 ) : <h2 className="h2">No Users available</h2>}
              </div>    
            </div>

            <div className="w-full bg-red-200 flex justify-center ">
            <div className="flex items-center">
            <button><img src={la} alt="" className="h-[4vh]" onClick={()=>{i > 0 ? setI(i-1) : setI(i)}}/></button>
            <h3 className="h3 mx-3">Page : {i+1}</h3>
            <button><img src={ra} alt="" className="h-[4vh]" onClick={()=>{(list.length/20)>i+1 ? setI(i+1) : setI(i)}}/></button>
            </div>
            </div>
    </div>
  );
}

export default App;
