import { useEffect, useState } from "react";
import UserItem from "./components/UserItem";
import la from "./assets/svg/leftarrow.svg";
import ra from "./assets/svg/rightarrow.svg";
import spinner from "./assets/svg/spinner.svg";

function App() {
  const [fixedUsers, setFixedUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [suser, setSuser] = useState();
  const [list, setList] = useState([]);
  const [n, setN] = useState({});
  const [h, setH] = useState("hidden");
  const [l, setL] = useState([]);
  const [i, setI] = useState(0);


  const p = async () => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const n = await response.json();
    return n;
  };

  useEffect(() => {
    p()
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
    setL(
      list.slice(20 * i, 20 * i + 20 < list.length ? 20 * i + 20 : list.length)
    );
  }, [list, i]);

  const onChange = (e) => {
    // console.log(e)
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
    setL(
      list.slice(20 * i, 20 * i + 20 < list.length ? 20 * i + 20 : list.length)
    );
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
    console.log(e);
  };

  const addUs =(e)=>{
    e.preventDefault()
    console.log("Submitted");
    setN({});
}

  return (
    <div className=" text-center flex-col">
      {/* <div><div className="tenor-gif-embed" data-postid="23918898" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/loading-gif-gif-23918898">Loading Gif Sticker</a>from <a href="https://tenor.com/search/loading+gif-stickers">Loading Gif Stickers</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script></div> */}
      <h1 className="h1 container my-[3vh]">User Management System</h1>
      <div className="mx-2 flex items-center justify-center gap-[2vw] my-[3vh]">
        <input
          type="text"
          onBlur={() => setList(fixedUsers)}
          className="form-control ml-[10vw]"
          id="s"
          placeholder="Search user by name"
          name="s"
          value={suser}
          onChange={onChange}
          minLength={1}
        />
        <button type="button" className="btn btn-primary mr-[10vw]" onClick={submit}>
          Search
        </button>
      </div>

      {/* Add User */}
      <button className={`btn btn-outline-primary m-2 ${h==='hidden' ? '' : 'hidden'}`} onClick={() => {h === "hidden" ? setH("") : setH("hidden")}}>Add a user</button>
      <div className={`m-4 ${h}`}>
        <div className="flex justify-center">
        <h2 className="h2 container " >Add user details</h2>
        <h2 className="h2 mx-[10vw] cursor-pointer" onClick={()=>{h==="hidden" ? setH("") : setH("hidden")}}>X</h2>
        </div>
        <form className="container mb-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="eid"
              name="eid"
              value={n.eid}
              onChange={onChangeee}
            />
            <label htmlFor="eid">ID of the user</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="efname"
              name="efname"
              value={n.efname}
              onChange={onChangeee}
            />
            <label htmlFor="efname">First Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="elname"
              name="elname"
              value={n.lname}
              onChange={onChangeee}
            />
            <label htmlFor="elname">Last Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="egender"
              name="egender"
              value={n.egender}
              onChange={onChangeee}
            />
            <label htmlFor="egender">Gender of user</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="eavatar"
              name="eavatar"
              value={n.eavatar}
              onChange={onChangeee}
            />
            <label htmlFor="eavatar">Avatar Link</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="edomain"
              name="edomain"
              value={n.edomain}
              onChange={onChangeee}
            />
            <label htmlFor="edomain">Domain</label>
          </div>
          <div class="flex items-center justify-around mb-3">
            <div className="flex items-center">
            <input
              type="checkbox"
              name="avail"
              id="avail"
              className="h-[3vh] w-[3vh] mx-3"
            />
            <label for="avail" className=""><strong>Availability</strong></label>
            </div>
            <button type="submit"  className="btn btn-primary" onClick={addUs}>Add Note</button>

          </div>

        </form>
      </div>

      <div className="card card-body" style={{ width: "100vw" }}>
        <div className="row">
          <h2 className="h2 d-flex justify-content-center">
            {" "}
            <b>All Users</b>{" "}
          </h2>

          {isLoading && (
            <div className="flex justify-center">
              <img src={spinner} alt="Loading....." />
            </div>
          )}
          {l.length > 0 ? (
            l.map((user, index) => <UserItem key={index} user={user} />)
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
