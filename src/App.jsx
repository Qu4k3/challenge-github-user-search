import { useEffect, useState } from "react";
import { ReactComponent as LocationSvg } from './assets/icon-location.svg';
import { ReactComponent as CompanySvg } from './assets/icon-company.svg';
import { ReactComponent as TwitterSvg } from './assets/icon-twitter.svg';
import { ReactComponent as WebsiteSvg } from './assets/icon-website.svg';
import { ReactComponent as SearchIconSvg } from './assets/icon-search.svg';
import { ReactComponent as MoonSvg } from './assets/icon-moon.svg';
import { ReactComponent as SunSvg } from './assets/icon-sun.svg';
import userPlaceholder from './assets/image-user-placeholder.png';
import './App.scss';

function App() {

  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState();
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState({
    "login": "octocat",
    "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
    "html_url": "https://github.com/octocat",
    "name": "The Octocat",
    "company": "@github",
    "blog": "https://github.blog",
    "location": "San Francisco",
    "bio": null,
    "twitter_username": null,
    "public_repos": 8,
    "followers": 12048,
    "following": 9,
    "created_at": "2011-01-25T18:44:36Z",
  });

  const dateFormat = (dateAccountCreation) => {
    const date = new Date(dateAccountCreation);
    const formatConfig = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const formatedDate = date.toLocaleDateString('en-UK', formatConfig);

    return formatedDate;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError('User not found');
        } else {
          setError(`Error: ${response.statusText}`);
        }
        return;
      }

      const userData = await response.json();

      setError(null)
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSwitch = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };

  const checkLocalStorageSetState = () => {
    let theme = localStorage.getItem("theme");

    if (
      theme == "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }

    if (theme == "light") {
      setIsDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  useEffect(() => {
    checkLocalStorageSetState();
  }, []);

  return (
    <div className="app">

      <div className="header">
        <h1>devfinder</h1>
        <button onClick={handleSwitch} type="button">{isDarkMode ? <>Light <SunSvg /></> : <>Dark <MoonSvg /></>}</button>
      </div>

      <div className="search">
        <form onSubmit={handleSubmit}>
          <SearchIconSvg />
          <input
            type="text"
            placeholder="Search GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="error">{error}</span>
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="block">
        <div className="user-info">
          <img
            className="avatar"
            src={userData.avatar_url ? userData.avatar_url : userPlaceholder}
            alt={userData.login}
          />
          <div className="user-profile">
            <div className="user-data">
              <div>
                <div>
                  <h2>{userData.name}</h2>
                  <a href={userData.html_url}>@{userData.login}</a>
                </div>
                <p>{userData.bio ? userData.bio : 'This profile has no bio'}</p>
              </div>
              <p>Joined {dateFormat(userData.created_at)}</p>
            </div>

            <div className="user-repos">
              <div>
                <small>Repos</small>
                <p>{userData.public_repos}</p>
              </div>
              <div>
                <small>Followers</small>
                <p>{userData.followers}</p>
              </div>
              <div>
                <small>Following</small>
                <p>{userData.following}</p>
              </div>
            </div>

            <div className="user-social">
              <div className={!userData.location ? "not-available" : ""}>
                <span><LocationSvg /></span>
                <span>
                  {userData.location
                    ? userData.location
                    : "Not Available"}
                </span>
              </div>
              <div className={!userData.twitter_username ? "not-available" : ""}>
                <span><TwitterSvg /></span>
                <span>
                  {userData.twitter_username
                    ? userData.twitter_username
                    : "Not Available"}
                </span>
              </div>
              <div className={!userData.blog ? "not-available" : ""}>
                <span><WebsiteSvg /></span>
                <span>
                  {userData.blog
                    ? <a href={userData.blog}>{userData.blog}</a>
                    : "Not Available"}
                </span>
              </div>
              <div className={!userData.company ? "not-available" : ""}>
                <span><CompanySvg /></span>
                <span>
                  {userData.company
                    ? userData.company
                    : "Not Available"}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
