import { useEffect, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";

const AllRecipes = () => {
  const recipes = useLoaderData();
  const [user, setUser] = useState(null);
  //
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/current-user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  //

  //
  const handleViewRecipe = async (recipe) => {
    if (
      user.email === recipe.creatorEmail ||
      recipe?.purchased_by?.includes(user.email)
    ) {
      window.location.href = `/recipe-detail/${recipe._id}`;
      return;
    } else if (user?.coin < 10) {
      window.location.href = "/purchase-coins";
      return;
    }

    const confirm = window.confirm("Spending 10 coins to view this recipe?");
    if (confirm) {
      try {
        const response = await fetch(
          `http://localhost:5000/unlock-recipe/${recipe._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();

        if (data.success) {
          setUser((prevUser) => ({ ...prevUser, coin: prevUser.coin - 10 }));
          window.location.href = `/recipe-detail/${recipe._id}`;
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <h2>all recipes</h2>

      <div className="grid grid-cols-1">
        {recipes.map((recipe, index) => (
          <div key={index} className="flex">
            <img className="w-20" src={recipe.image} alt="" />
            <div>
              <h2>{recipe?.name}</h2>
              <p>Purchased_by :{recipe?.purchased_by?.length}</p>

              <p>creator email: {recipe?.creatorEmail}</p>
              <p>country: {recipe?.country}</p>
              <NavLink to={`/recipe-detail/${recipe._id}`}>
                View the Recipe
              </NavLink>

              <button onClick={() => handleViewRecipe(recipe)}>
                View the Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
