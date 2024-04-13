import React, { useEffect, useState } from 'react'

const Teams = () => {
  const [fetchedUsers,setFetchedUsers] = useState([]);
  const [fetchedTeams,setFetchedTeams]= useState([]);
  const [hideLoader,setHideLoader] = useState(0);


  useEffect(()=>{
    fetchTeamsReq()
      .then((data)=>{
        setFetchedTeams(data);
        setHideLoader(1);
      })
      .catch((err)=>{
        console.log(err)
      })

    fetchUsersReq()
      .then((data)=>{
        setFetchedUsers(data.users);
        setHideLoader(2);
      })
      .catch((err)=>{
        console.log(err)
      })
  },[])



  const fetchTeamsReq = async()=>{
    const res = await fetch(`${process.env.REACT_APP_HOST}/teamapi/teams`,{
      method : "GET",
      headers : {
        "Content-Type" : "application/json"
      }
    })
    const n = await res.json();
    return n.teams;
  }

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


  const showData=()=>{
    console.log(fetchedUsers)
    fetchedTeams.map((item,index)=>{
      item.id.map((item1,index1)=>{
        // let x = fetchedUsers.find({id : item1});
        // console.log(x);
      })
    })
  }

  return (
    <div className=''>
      <div className="h2">TEAMS</div>
      <h1 className="h1">{hideLoader}</h1>
      <button onClick={showData}>FETCH</button>

    </div>
  )
}

export default Teams
