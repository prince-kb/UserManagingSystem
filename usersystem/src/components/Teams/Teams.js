import React, { useEffect, useState } from "react";
import TeamItem from "./TeamItem";
import spinner from "../../assets/svg/spinner.svg";

const Teams = () => {
  const colors = [ "#fff1f2","#fdf2f8","#fdf4ff","#faf5ff","#f5f3ff","#eef2ff","#eff6ff","#f0f9ff","#ecfeff","#f0fdfa","#ecfdf5","#f0fdf4","#f7fee7","#fefce8","#fffbeb","#fff7ed","#fef2f2","#fafaf9","#f3f4f6",
    // "red","blue","green","orange","yellow","violet",
    // "Slate","Zinc","Emerald","fuchsia","cyan","rose","teal","emerald","lime","amber","zinc","neutral","stone","slate",
];
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [fetchedTeams, setFetchedTeams] = useState([]);
  const [hidden, setHidden] = useState(false);

  let randCol = ()=>{
    return colors[Math.floor(Math.random() * colors.length)]
  }

  useEffect(() => {
    fetchTeamsReq()
      .then((data) => {
        setFetchedTeams(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetchUsersReq()
      .then((data) => {
        setFetchedUsers(data.users);
        setHidden(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchTeamsReq = async () => {
    const res = await fetch(`${process.env.REACT_APP_HOST}/teamapi/teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const n = await res.json();
    return n.teams;
  };

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
  const y = {
    available: false,
    avatar: "",
    date: "2024-04-13T15:10:52.343Z",
    domain: "No Domain",
    email: "Email not available",
    first_name: "ABCD",
    gender: "Male",
    id: "XXXX",
    last_name: "EFGH",
    _id: "",
  };

  const del = (team)=>{
    
  }

  return (
    <div className="">
      <div className="text-center h2">ALL TEAMS</div>

      {/* Spinner */}
      {!hidden && (
        <div className="flex justify-center ">
          <img src={spinner} alt="Loading....." />
        </div>
      )}

      {/* Teams */}

      {hidden &&
        fetchedTeams.map((team, i) => {
          return (
            <div className={`row mx-2 my-[3vh] flex justify-center ${hidden} rounded-2xl mx-2`} style={{backgroundColor : randCol()}} key={i}>
              <h3 className="text-center h3"><b>{team.name}</b></h3>
              {team.id.map((teamMember, j) => {
                let x = fetchedUsers.filter((users) => users.id === teamMember);
                return <TeamItem del={del} key={j} user={x.length === 0 ? y : {...x[0],teamName : team.name}} />;
              })}
            </div>
          );
        })}
    </div>
  );
};

export default Teams;
