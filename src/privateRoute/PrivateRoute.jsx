import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/firebase.auth";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return children;
  }

  //   window.alert("You need to be logged in to access this page.");
  Swal.fire({
    icon: "error",
    text: "You need to be logged in to access this page.",
  });
  return <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
