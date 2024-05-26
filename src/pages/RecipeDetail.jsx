import { useLoaderData } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

const RecipeDetail = () => {
  const recipe = useLoaderData();
  const [recipes, setRecipes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  //

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  //
  useEffect(() => {
    fetch("https://recipe-share-backend-40a5.onrender.com/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  // const filterSimilarRecipes = () => {
  const filterSimilarRecipes = useCallback(() => {
    const filteredRecipes = recipes.filter(
      (r) =>
        r._id !== recipe._id &&
        (r.category === recipe.category || r.country === recipe.country)
    );
    setSimilarRecipes(filteredRecipes);
  }, [recipes, recipe]);
  useEffect(() => {
    filterSimilarRecipes();
  }, [filterSimilarRecipes]);

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-orange-600 text-2xl font-bold uppercase mt-10 mb-16  relative text-center">
        Recipe Details
        <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-14 border-b-[3px] border-orange-600"></span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
        <iframe
          width="100%"
          height="450"
          src={`https://www.youtube.com/embed/${recipe?.youtube}`}
          title="MOIST CHOCOLATE CAKE"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
        {/* recipe details */}
        <div className="">
          <p className="bg-orange-100 w-fit px-3 py-1 rounded text-orange-600 font-semibold mb-3 text-sm">
            {recipe.category}
          </p>
          <div className="flex gap-3 justify-between items-center">
            <h2 className="text-orange-600 text-2xl font-bold mb-3">
              {recipe.name}
            </h2>
            <button
              onClick={toggleFavorite}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {isFavorite ? (
                <FaHeart className="text-3xl text-orange-600" />
              ) : (
                <FaRegHeart className="text-3xl text-orange-600" />
              )}
            </button>
          </div>

          <p className="text-orange-600 text-xl mb-5">{recipe.detail}</p>
          <p>Purchased by: [{recipe.purchased_by.join(", ")}]</p>
          <p className="mt-1">
            Watch Count:
            <span className="font-semibold "> {recipe?.watchCount}</span>
          </p>
          <p className=" mt-2 italic text-orange-600">
            Recipe Creator - {recipe.creatorEmail}
          </p>
          <p className="flex items-center gap-1 font-bold mt-3">
            <IoLocationOutline /> {recipe.country}
          </p>
          <img
            className="h-64 lg:h-44 w-auto mt-5"
            src={recipe?.image}
            alt=""
          />
        </div>
      </div>

      {/*  section title*/}

      <h2 className="text-orange-600 text-2xl font-bold uppercase mt-20 mb-8 text-center relative">
        Similar Recipes
        <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-14 border-b-[3px] border-orange-600"></span>
      </h2>

      {/* display similar recipes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {similarRecipes.map((similarRecipe) => (
          <div
            key={similarRecipe._id}
            className="border p-2 flex flex-col shadow-lg"
          >
            <img
              className="rounded-l h-auto md:h-64 lg:h-56 w-full block mx-auto"
              src={similarRecipe?.image}
              alt=""
            />
            <div className="flex gap-1 justify-between mt-2 items-center">
              <h4 className="text-orange-600 font-semibold text-lg my-2">
                {similarRecipe.name}
              </h4>
              <p className="bg-orange-100 w-fit px-2 py-1 rounded text-orange-600 font-semibold  text-sm">
                {similarRecipe.category}
              </p>
            </div>
            <p>
              Purchased by:{" "}
              {similarRecipe?.purchased_by.length !== 0 ? (
                <>{similarRecipe?.purchased_by?.join(", ")}</>
              ) : (
                "N/A"
              )}
            </p>
            <p className=" mt-2 italic text-orange-600">
              Recipe Creator - {similarRecipe?.creatorEmail}
            </p>
            <p className="flex items-center gap-1 font-bold mt-3">
              <IoLocationOutline /> {similarRecipe.country}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetail;
