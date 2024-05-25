import { useLoaderData } from "react-router-dom";

const RecipeDetail = () => {
  const recipe = useLoaderData();
  return (
    <div>
      <h2>recipe details page</h2>
      <p>{recipe.name}</p>
    </div>
  );
};

export default RecipeDetail;
