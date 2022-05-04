import { useEffect, useState } from "react";
import './App.scss';

function App() {

  const [username, setUsername] = useState('Qu4k3');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((user) => setUserData(user));
  }, [username]);

  console.log(userData)

  return (
    <div className="app">

      <div className="header">
        <h3>devfinder</h3>
        <button>Light </button>
      </div>

      <div className="block">

      </div>

      <div className="block">
        <div className="user-info">
          <img className="avatar" src={userData.avatar_url} alt={userData.login} />
          <div className="user-profile">
            <h3>{userData.name}</h3>
            <a href={userData.url}>@{userData.login}</a>
            <p>{userData.bio ? userData.bio : 'This profile has no bio'}</p>
          </div>
          <div>
            <p>{new Date(userData.created_at).toDateString()}</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
