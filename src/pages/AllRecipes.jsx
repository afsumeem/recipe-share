import { NavLink, useLoaderData } from "react-router-dom";

const AllRecipes = () => {
  const recipes = useLoaderData();

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
