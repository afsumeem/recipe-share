import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase/firebase.auth";

const ViewRecipe = ({ recipe }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await fetch(
            `https://recipe-share-backend-40a5.onrender.com/users/${user.email}`
          );
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleViewRecipe = async () => {
    if (!user) {
      // Case 1: User Not Logged in
      Swal.fire({
        icon: "warning",
        title: "Please Log in to view the recipe",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (user.email === recipe.creatorEmail) {
      // Case 2: User is the creator of the recipe
      navigate(`/recipe-detail/${recipe._id}`);
      return;
    }

    if (user.coin < 10) {
      // Case 3: User doesn't have enough coins
      Swal.fire({
        icon: "warning",
        title: "You need at least 10 coins to view this recipe",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/purchase-coins"); // Redirect to purchase coins page
      return;
    }

    if (recipe?.purchased_by?.includes(user?.email)) {
      // Case 5: User already purchased the recipe
      navigate(`/recipe-detail/${recipe._id}`);
      return;
    }

    // Case 4: User has enough coins and hasn't purchased the recipe
    Swal.fire({
      title: "Confirm",
      text: "Are you sure you want to spend 10 coins to view this recipe?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, view recipe",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://recipe-share-backend-40a5.onrender.com/unlock-recipe/${recipe._id}`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                email: user.email,
              },
            }
          );
          const data = await response.json();
          if (data.success) {
            // Show alert for spending 10 coins
            Swal.fire({
              icon: "success",
              title: "You have successfully viewed the recipe",
              showConfirmButton: false,
              timer: 1500,
            });
            // Update user and recipe details
            // Redirect to recipe details page
            navigate(`/recipe-detail/${recipe._id}`);
          } else {
            // Show error message
            Swal.fire({
              icon: "error",
              title: "Error",
              text: data.message,
            });
          }
        } catch (error) {
          console.error("Error viewing recipe:", error);
          // Show error message
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while viewing the recipe",
          });
        }
        setIsLoading(false);
      }
    });
  };

  return (
    <button onClick={handleViewRecipe} disabled={isLoading}>
      {isLoading ? "Loading..." : "View Recipe"}
    </button>
  );
};

ViewRecipe.propTypes = {
  recipe: PropTypes.object.isRequired,
  user: PropTypes.object,
};

export default ViewRecipe;
