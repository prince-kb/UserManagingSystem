import { useEffect, useState,useRef } from "react";
import UserItem from "./UserItem";
import la from "../../assets/svg/leftarrow.svg";
import ra from "../../assets/svg/rightarrow.svg";
import spinner from "../../assets/svg/spinner.svg";
import cross from "../../assets/svg/cross.svg";

function App() {
  const [fixedUsers, setFixedUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [suser, setSuser] = useState("");
  const [list, setList] = useState([]);
  const [access, setAccess] = useState('Add');
  const [n, setN] = useState({id : "",first_name : "",last_name : "",email : "",gender : "",avatar : "",domain : "",available : true});
  const [h, setH] = useState('hidden');
  const [h1, setH1] = useState('hidden');
  const [l, setL] = useState([]);
  const [i, setI] = useState(0);
  const ref=useRef();
  const ref1 = useRef();


  const fetchUsersReq = async () => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const n = await response.json();
    return n;
  };

  const addUserReq=async (id,first_name,last_name, email,gender,avatar,domain,available)=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id,first_name,last_name, email,gender,avatar,domain,available}),
      });
      const res = await response.json();
      return res;
      // setFixedUsers(fixedUsers.concat(res.user));
    }
    catch(err){
      console.log(err)
      return err;
    }
  }

  const editUserReq=async (id,first_name,last_name, email,gender,avatar,domain,available)=>{
    console.log(id);
    try{
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id,first_name,last_name, email,gender,avatar,domain,available}),
      });
      const res = await response.json();
      return res;
      // setFixedUsers(fixedUsers.concat(res.user));
    }
    catch(err){
      console.log(err)
      return err;
    }
  }
  const deleteUserReq=async (id)=>{
    console.log(id);
    try{
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const res = await response.json();
      return res;
    }
    catch(err){
      console.log(err)
      return err;
    }
  }

  useEffect(() => {
    fetchUsersReq()
      .then((da) => {
        setFixedUsers(da.users);
      })
      .catch((err) => {
        console.log("Error occured! Try refreshing");
      });
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

  const onChange = (e) => {
    setH1("");
    setSuser(e.target.value);
    setI(0);
    let z = e.target.value.toLowerCase();
    setList(
      list.filter((val) => {
        return (
          val.first_name.slice(0, z.length).toLowerCase() === z ||
          val.last_name.slice(0, z.length).toLowerCase() === z
        );
      })
    );
  };

  const submit = (e) => {
    e.preventDefault();
    setI(0);
    setL(list.slice(20 * i, 20 * i + 20 < list.length ? 20 * i + 20 : list.length));
    let z = suser.toLowerCase;
    setList(
      list.filter((val) => {
        return (
          val.first_name.slice(0, z.length).toLowerCase() === z ||
          val.last_name.slice(0, z.length).toLowerCase() === z
        );
      })
    );
  };

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

    fetchUsersReq()
    .then((da) => {
      setFixedUsers(da.users);
    })
    .catch((err) => {
      console.log("Error occured! Try refreshing");
    });
}

    const editUserPanel = (props)=>{
      setAccess("Edit")
      setH(h==='hidden' ? '' : 'hidden')
      setN(props);
      ref.current.click();
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

    const hideSearch=async ()=>{
      setH1("hidden")
      setList(fixedUsers)
    }

  return (
    <div className=" text-center flex-col border-solid mx-2 my-2">      

      {/* MODALE */}
      <div className={`m-4 ${h}`}>
        <div className="flex justify-center">
        <h2 className="h2 container " >{access} user details</h2>
        <h2 className="h2 mx-[10vw] cursor-pointer" ref={ref} onClick={()=>{h==="hidden" ? setH("") : setH("hidden")}}>X</h2>
        </div>

        <form className="container mb-3" onSubmit={access==="Add" ? addUser : editUser}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="id"
              name="id"
              value={n.id}
              onChange={onChangeee}
              disabled={access==="Edit"}
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
            <button type="submit" className="btn btn-primary" >{access} Note</button>

        </form>
      </div>


      <div className="" style={{ width: "full" }}>
          <div className=" flex items-center justify-around gap-[2vw] my-[3vh] mx-[3vw]">
            <h2 className="h2 inline-block "> <b>All Users</b></h2>
              <div className="flex items-center gap-[1.5vw]">
              <input
                type="text"
                className="px-3 py-2 bg-blue-100 rounded-xl"
                id="s"
                placeholder="Search user by name"
                name="s"
                value={suser}
                onChange={onChange}
                onClick={()=>setH1("")}
                onBlur={hideSearch}
                minLength={1}
              />
              <button type="button" className="btn btn-primary " onClick={submit}>Search</button>
              <img src={cross} alt="X" className={` ${h1} h2 cursor-pointer h-[30px] w-[30px]`} ref1={ref1} onClick={hideSearch}/>
              </div>
            <button className={` btn btn-outline-primary ${h==='hidden' ? '' : 'hidden'}`} onClick={() => {h === "hidden" ? setH("") : setH("hidden")}}>Add a user</button>

          </div>
        <div className="row">

          {isLoading && (
            <div className="flex justify-center">
              <img src={spinner} alt="Loading....." />
            </div>
          )}
          {l.length > 0 ? (
            l.map((user, index) => <UserItem editUser={editUserPanel} deleteUser={deleteUser} key={index} user={user} />)
          ) : (
            <h2 className="h2">No Users available</h2>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center ">
        <div className="flex items-center">
          <button>
            <img
              src={la}
              alt=""
              className="h-[4vh]"
              onClick={() => {
                i > 0 ? setI(i - 1) : setI(i);
              }}
            />
          </button>
          <h3 className="h3 mx-3">Page : {i + 1}</h3>
          <button>
            <img
              src={ra}
              alt=""
              className="h-[4vh]"
              onClick={() => {
                list.length / 20 > i + 1 ? setI(i + 1) : setI(i);
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
