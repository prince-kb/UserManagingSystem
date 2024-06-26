import { useEffect, useState,useRef } from "react";
import UserItem from "./UserItem";
import la from "../../assets/svg/leftarrow.svg";
import ra from "../../assets/svg/rightarrow.svg";
import spinner from "../../assets/svg/spinner.svg";
import cross from "../../assets/svg/cross.svg";
import refresh from "../../assets/svg/refresh.svg";

function App() {
  const [fixedUsers, setFixedUsers] = useState([]);
  const [teams,setTeams] = useState([]);
  const [list, setList] = useState([]);
  const [suser, setSuser] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [access, setAccess] = useState('Add');
  const [teamUser, setTeamUser] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [n, setN] = useState({id : "",first_name : "",last_name : "",email : "",gender : "",avatar : "",domain : "",available : true});
  const [h, setH] = useState('hidden');
  const [h1, setH1] = useState('hidden');
  const [h2, setH2] = useState('hidden');
  const [l, setL] = useState([]);
  const [i, setI] = useState(0);
  const [device,setDevice]= useState(window.innerWidth < 768 ? 'mobile':'desktop');
  const ref=useRef();



  useEffect(() => {
    window.addEventListener("resize", () => {
    window.innerWidth < 768 ? setDevice('mobile') : setDevice('desktop');
    })
  })

  useEffect(() => {
    fetchUsersReq()
      .then((da) => {
        setFixedUsers(da.users);
      })
      .catch((err) => {
        console.log("Error occured! Try refreshing");
      });

      fetchTeams()
        .then((data)=>{
          setTeams(data);
        })
        .catch((err)=>{
          console.log("Error in fetching teams")
        })
  }, []);

  useEffect(() => {
    if (fixedUsers.length > 0) {
      setList(fixedUsers);
      setLoading(false);
    }
  }, [fixedUsers]);

  
  useEffect(() => {
    setL(list.slice(20 * i, 20 * i + 20 < list.length ? 20 * i + 20 : list.length));
  }, [list, i]);


  const fetchUsersReq = async () => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const n = await response.json();
    return n;
  };

  const addUserReq=async (id,first_name,last_name,email,gender,avatar,domain,available)=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({id,first_name,last_name, email,gender,avatar,domain,available}),
      });
      const res = await response.json();
      return res;
    }
    catch(err){
      console.log("Error occured while adding user")
      return err;
    }
  }

  const editUserReq=async (id,first_name,last_name, email,gender,avatar,domain,available)=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({id,first_name,last_name, email,gender,avatar,domain,available}),
      });
      const res = await response.json();
      return res;
      // setFixedUsers(fixedUsers.concat(res.user));
    }
    catch(err){
      console.log("Error occured while editing user")
      return err;
    }
  }
  const deleteUserReq=async (id)=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      });
      const res = await response.json();
      return res;
    }
    catch(err){
      console.log("Error occured while deleting user")
      return err;
    }
  }

  const fetchTeams = async()=>{
    try{
      const x = await fetch(`${process.env.REACT_APP_HOST}/teamapi/teams`,{
        method : "GET",
        headers : {
          "Content-type" : "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      })
      const res = await x.json();
      return res.teams
      
    }catch(err){
      console.log("Cannot fetch teams")
    }
  }

  const addToTeamReq = async(id,name)=>{
    try{
      const x = await fetch(`${process.env.REACT_APP_HOST}/teamapi/team/${id}`,{
        method : "PUT",
        headers : {
          "Content-type" : "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body : JSON.stringify({name})
      })
      const res = await x.json();
      return res;
    }catch(err){
      console.log("Cannot add user to team ",name)
    }
  }

  const onChange = (e) => {
    setH1("");
    setSuser(e.target.value);
    setI(0);
    let z = e.target.value.toLowerCase();
    let x = []
    z.split(' ').map((val) => {
      x.push(val);
      return null;
    });
    if(x.length===2){
      setList(fixedUsers.filter((val) => {
        return (
          val.first_name.slice(0, x[0].length).toLowerCase() === x[0] && val.last_name.slice(0, x[1].length).toLowerCase() === x[1]
        );
      })
    )}
  else {
    setList(fixedUsers.filter((val) => {
      return (
        val.first_name.slice(0, z.length).toLowerCase() === z || val.last_name.slice(0, z.length).toLowerCase() === z
      );
    })
  );
  }};

  const onChangeee = (e) => {
    if(e.target.type==='checkbox'){
      setN({...n,available : e.target.checked})
    }
    else if(e.target.type === 'select-one'){
      setN({...n,gender : e.target.value})
    }
    else setN({...n,[e.target.name]:[e.target.value]});
  };


  const addUser =async (e)=>{
    e.preventDefault();
    const id = n.id[0];
    const first_name = n.first_name.toString();
    const last_name = n.last_name.toString();
    const email = n.email.toString();
    const avatar = n.avatar.toString();
    const domain = n.domain.toString();
    await addUserReq(id,first_name,last_name,email,n.gender,avatar,domain,n.available);

    ref.current.click();
    setLoading(true);
    fetchUsersReq()
    .then((da) => {
      setFixedUsers(da.users);
    })
    .catch(() => {
      console.log("Error occured! Try refreshing");
    });
}

    const editUserPanel = (props)=>{
      setAccess("Edit")
      setH('')
      setN(props);
      ref.current.click();
    }

    const closeModale=()=>{
      if(h==="hidden"){
        setH('')
      }
      else {
        setH("hidden")
    }
      }

    
    const hideSearch=async ()=>{
      setH1("hidden")
      setSuser('');
      setList(fixedUsers)
    }

    const editUser=async (e)=>{
      e.preventDefault();
      const first_name = n.first_name.toString();
      const last_name = n.last_name.toString();
      const email = n.email.toString();
      const avatar = n.avatar.toString();
      const domain = n.domain.toString();

        await editUserReq(n.id,first_name,last_name,email,n.gender,avatar,domain,n.available);
        setN({id : "",first_name : "",last_name : "",email : "",gender : "Male",avatar : "",domain : "",available : true});
        setAccess("Add");
        ref.current.click();

        setLoading(true);
        fetchUsersReq()
        .then((da) => {
          setFixedUsers(da.users);
        })
        .catch((err) => {
          console.log("An error occured! Try refreshing");
        });
    }

    const deleteUser=async(props)=>{
        await deleteUserReq(props.id);

        setLoading(true);
        fetchUsersReq()
        .then((da) => {
          setFixedUsers(da.users);
        })
        .catch((err) => {
          console.log("An error occured! Try refreshing");
        });
    }

    const addUserModale=() => {
      setH("")
      setAccess("Add")
      setN({id : "",first_name : "",last_name : "",email : "",gender : "Male",avatar : "",domain : "",available : true});
    }

    const addUserToTeam=(e)=>{
      setTeamUser(e);
      setH2("");
    }

    const addToTeam = (e)=>{
      setTeamName(e.target.innerText)
      setH2("hidden");
      addToTeamReq(teamUser,e.target.innerText)
    }
    
    const pageNo=(e)=>{
      setI(e.target.value -1)
    }
    
    const addToNewTeam=()=>{
      addToTeamReq(teamUser,teamName)
      setH2("hidden");

    }

    const refr = ()=>{
      setLoading(true);
      fetchUsersReq()
      .then((da) => {
        setFixedUsers(da.users);
        setLoading(false);
      })
      .catch((err) => {
        console.log("An error occured! Try refreshing");
      });
    }




  return (
    <div className=" text-center flex-col border-solid my-2 ">      

      {/* MODALE */}
      <div className="flex justify-center">
      <div className={`m-4 ${h} fixed z-10 w-[80vw] rounded-2xl backdrop-brightness-75 backdrop-blur-md`}>
        <div className="flex justify-center">
        <h2 className="h2 container " >{access} user details</h2>
        {/* <h2 className="h2 mx-[10vw] cursor-pointer" ref={ref} onClick={()=>{h==="hidden" ? setH("") : setH("hidden")}}>X</h2> */}
        <img src={cross} alt="X" className={` cursor-pointer h-[5.5vh] w-[5.5vh]`} ref={ref} onClick={closeModale}/>
        </div>

        <form className="container mb-3" onSubmit={access==="Add" ? addUser : editUser}>
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="id"
              name="id"
              value={n.id}
              onChange={onChangeee}
              disabled={access==="Edit"}
              minLength={1}
              required
            />
            <label htmlFor="id">ID of the user</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="first_name"
              name="first_name"
              value={n.first_name}
              onChange={onChangeee}
              minLength={3}
              required
            />
            <label htmlFor="first_name">First Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="last_name"
              name="last_name"
              value={n.last_name}
              onChange={onChangeee}
            />
            <label htmlFor="last_name">Last Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={n.email}
              onChange={onChangeee}
              disabled={access==="Edit"}
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="avatar"
              name="avatar"
              value={n.avatar}
              onChange={onChangeee}
            />
            <label htmlFor="avatar">Avatar Link</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="domain"
              name="domain"
              value={n.domain}
              onChange={onChangeee}
            />
            <label htmlFor="domain">Domain</label>
          </div>

          <div className="mb-3 flex justify-around">

              <label htmlFor="gender">Select gender</label>
              <select id="gender" name="gender" 
              value={n.gender}
              onChange={onChangeee}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Agender">Agender</option>
                <option value="Bigender">Bigender</option>
                <option value="Polygender">Polygender</option>
                <option value="Genderfluid">Genderfluid</option>
                <option value="NonBinary">NonBinary</option>
                <option value="GenderQueer">GenderQueer</option>
                <option value="GenderQueer">Prefer not to say</option>
              </select>
            
            </div>
          
          <div className="flex items-center justify-around mb-3">
            <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              name="available"
              onChange={onChangeee}
              checked={n.available}
              value={n.available}
              className="h-[3vh] w-[3vh] mx-3"
            />
            <label htmlFor="available" className=""><strong>Available</strong></label>
            </div>

          </div>
            <button type="submit" className="btn btn-primary" >{access} User</button>

        </form>
      </div>
      </div>

      <div className={`flex gap-2 items-center p-3 rounded-3xl ${h2} top-[30vh] left-[50vw] -translate-x-1/2 z-[3] fixed bg-green-300`}>
                  <button className="" aria-expanded="true"  data-bs-toggle="dropdown" >Select Team to add User</button>
                  <img src={cross} alt="X" className="h-[2vh] w-[2vh] cursor-pointer" onClick={()=>setH2("hidden")}/>
                  <ul className="dropdown-menu">
                    {
                      teams.map((item,i)=>{
                  return <li key={i}><h3  className="dropdown-item" value={item.name} onClick={(e)=>{setTeamName(e.target.innerText); addToTeam(e)}}>{item.name}</h3></li>
                      })
                    }
                    <div >
                      <li className="">
                        <input type="text" id="newTeam" className="border my-1" onChange={(e)=>{setTeamName(e.target.value)}} placeholder="New Team" />
                        <button className="btn btn-primary btn-sm submit" onClick={addToNewTeam}>Add to new team</button>
                        </li>
                      </div>

                  </ul>
                </div>


      <div className="overflow-hidden">
          <div className={` my-[2vh] ${device==="desktop" ? 'flex items-center justify-around gap-[2vw]' : 'flex-col justify-center items-center'}`}>
            <h2 className="h2"> <b>All Users</b></h2>
              <div className="flex items-center gap-[1.5vw] justify-center">
              <input
                type="text"
                className="px-3 py-2 bg-blue-100 rounded-xl my-2"
                id="s"
                placeholder="Search user by name"
                name="s"
                value={suser}
                onChange={onChange}
                onClick={()=>setH1("")}
                minLength={1}
              />
              {/* <button type="button" className="btn btn-outline-primary " onClick={submit}>Search</button> */}
              <img src={cross} alt="X" className={` ${h1} cursor-pointer h-[30px] w-[30px]`} onClick={hideSearch}/>
              </div>
            <button className={`btn btn-outline-primary${h==='hidden' ? '' : 'hidden'}`} onClick={addUserModale}>Add a user</button>
              <div className="flex justify-center">
              <img src={refresh} alt="REFRESH" className={`h-[50px] cursor-pointer `} onClick={refr}/>
            </div>
          </div>

          {isLoading && (
            <div className="flex justify-center ">
              <img src={spinner} alt="Loading....." />
            </div>
          )}
        <div className="row">

          {l.length > 0 ? (
            l.map((user, index) => <UserItem addUserToTeam={addUserToTeam} editUser={editUserPanel} deleteUser={deleteUser} key={index} user={user} />)
          ) : (
            <h2 className="h2">No Users available</h2>
          )}
        </div>
      </div>

      <div className=" flex justify-around items-center gap-">

        <div className="flex">
          <button><img src={la} alt="" className="h-[4vh]" onClick={() => { i > 0 ? setI(i - 1) : setI(i) }} /></button>
          <h3 className="h3 mx-3">Page : {i + 1}</h3>
          <button><img src={ra} alt="" className="h-[4vh]" onClick={() => {list.length / 20 > i + 1 ? setI(i + 1) : setI(i)}}/></button>
        </div>

        <div className=" flex items-center justify-center gap-2 " >
          <label htmlFor="page"><h3 className="h3">Page</h3></label>
          <select id="page" className=" border-2 text-[1.5em] py-0" value={i+1} onChange={pageNo}>
          {
            !isLoading && Array.from({length: list.length / 20 +1}, (_, j) => j + 1).map((item,i)=>{
              return  <option key = {i} className='font-bold' value={item}>{item}</option>
            })
          }
            </select>
            <label htmlFor="page"><h3 className="h3">of {Math.floor(list.length/20)+1}</h3></label>
          </div>
      </div>
    </div>
  );
}

export default App;
