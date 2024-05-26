import { NavLink } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../../firebase/firebase.auth";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  // google auth provider
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        const { photoURL, displayName, email } = user;
        const newUser = { image: photoURL, coin: 50, name: displayName, email };

        fetch("https://recipe-share-backend-40a5.onrender.com/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            fetch(
              "https://recipe-share-backend-40a5.onrender.com/generate-token",
              {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({ email }),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                localStorage.setItem("token", data.token);
                fetchUserData(email, data.token);
              });
          });
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  //

  const fetchUserData = (email, token) => {
    fetch(`https://recipe-share-backend-40a5.onrender.com/users/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const token = localStorage.getItem("token");
        if (token) {
          setUser(user);
          fetchUserData(user.email, token);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // sign out
  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        setUser(null);
        localStorage.removeItem("token");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar bg-black text-orange-600">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/recipes">Recipes</NavLink>
            </li>
            <li>
              <NavLink to="/add-recipes">Add-Recipes</NavLink>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Recipe Share</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/recipes">Recipes</NavLink>
          </li>
          <li>
            <NavLink to="/add-recipes">Add-Recipes</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {user && (
          <>
            <p>{userData?.coin}</p>
            <p>{userData?.name}</p>
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={userData?.image} alt="userImg" />
              </div>
            </div>
          </>
        )}
        {user ? (
          <button onClick={handleSignOut}>Logout</button>
        ) : (
          <button onClick={handleGoogleSignIn}>Google Login</button>
        )}
      </div>
    </div>
  );
};

export default Header;
