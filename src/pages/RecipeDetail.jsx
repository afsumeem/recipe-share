import { useLoaderData } from "react-router-dom";
const RecipeDetail = () => {
  const recipe = useLoaderData();

  return (
    <div>
      <h2>Recipe details page</h2>
      <p>{recipe.name}</p>
      <p>{recipe.country}</p>
    </div>
  );
};

export default RecipeDetail;
