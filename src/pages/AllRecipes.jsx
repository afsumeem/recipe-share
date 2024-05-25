import { useEffect } from "react";
import { useState } from "react";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/recipes`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

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
              <button>View the Recipe</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
