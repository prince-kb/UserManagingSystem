import { useEffect, useState} from "react";
import UserItem from "./components/UserItem";
import la from './assets/svg/leftarrow.svg'
import ra from './assets/svg/rightarrow.svg'
import spinner from './assets/svg/spinner.svg'


function App() {
  const [fixedUsers,setFixedUsers]= useState([]);
  const [isLoading,setLoading]=useState(true);
  const [suser,setSuser]=useState()
  const [list,setList]=useState([]);
  const [l,setL] = useState([]);
  const [i,setI]=useState(0);


  const p = async()=>{
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  const n = await response.json();
  return n;
}

useEffect(()=>{
  p().then((da)=>{
    setFixedUsers(da.users)})
},[])

useEffect(()=>{
  if(fixedUsers.length >0 ){
    setList(fixedUsers)
    setLoading(false);
  }
},[fixedUsers])
 
useEffect(()=>{
  setL(list.slice(20*i,20*i+20<list.length ? 20*i+20 : list.length));
},[list,i])


  const onChange=(e)=>{
    // console.log(e)
    setSuser(e.target.value)
    let z = e.target.value.toLowerCase()
    setList(list.filter((val)=>{
      return val.first_name.slice(0,z.length).toLowerCase()===z || val.last_name.slice(0,z.length).toLowerCase()===z
    }))
  }

    const submit=(e)=>{
    e.preventDefault()
    setI(0);
    setL(list.slice(20*i,20*i+20<list.length ? 20*i+20 : list.length));
    let z = suser.toLowerCase
    setList(list.filter((val)=>{
      return val.first_name.slice(0,z.length).toLowerCase()===z|| val.last_name.slice(0,z.length).toLowerCase()===z
    }))
  }

    // setList(fixedUsers)}

  return (
    <div className=" text-center flex-col">
      {/* <div><div className="tenor-gif-embed" data-postid="23918898" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/loading-gif-gif-23918898">Loading Gif Sticker</a>from <a href="https://tenor.com/search/loading+gif-stickers">Loading Gif Stickers</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script></div> */}
      <h1 className="h1 container bg-emerald-300">Welcome</h1>
      <div className="mx-2 flex items-center justify-center gap-[2vw]">
      <input type="text" onBlur={()=>setList(fixedUsers)} className="form-control" id="s" placeholder="Search user by name" name="s" value={suser} onChange={onChange} minLength={1}/>
        <button type="button" className="btn btn-primary" onClick={submit}>Search</button>
        </div>

      <div className="card card-body" style={{width: "100vw"}}>
            <div className="row">
                <h2 className="h2 d-flex justify-content-center"> <b>All Users</b> </h2>
                {isLoading && <div className="flex justify-center"><img src={spinner} alt="Loading....." /></div>}
                {l.length>0 ? l.map((user,index) =>(
                  <UserItem key={index} user = {user}/>)
                 ) : <h2 className="h2">No Users available</h2>}
              </div>    
            </div>

            <div className="w-full flex justify-center ">
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
