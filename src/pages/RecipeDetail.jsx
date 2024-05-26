import { useLoaderData } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";

const RecipeDetail = () => {
  const recipe = useLoaderData();
  const [recipes, setRecipes] = useState([]);
  const [showLikedText, setShowLikedText] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  //

  const toggleFavorite = () => {
    if (!isFavorite) {
      setShowLikedText(true);
      setTimeout(() => {
        setShowLikedText(false);
      }, 1000); // Hide "Liked" text after 1 second
    }
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
    <div>
      <h2>Recipe details page</h2>
      {/* <iframe
        width="713"
        height="401"
        src="https://www.youtube.com/embed/GgOIdkV5PPQ?si=YJ_ffoJqoEEwtC6l"
        title="MOIST CHOCOLATE CAKE"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe> */}
      <p>{recipe.name}</p>
      <p>{recipe.country}</p>
      <button
        onClick={toggleFavorite}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
      {showLikedText && <p>Liked..</p>}

      {/*  section title*/}

      <h2 className="text-orange-600 text-2xl font-bold uppercase my-8 text-center relative">
        Similar Recipes
        <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-14 border-b-[3px] border-orange-600"></span>
      </h2>

      {/* display similar recipes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {similarRecipes.map((similarRecipe) => (
          <div key={similarRecipe._id} className="border p-2 flex ">
            <img
              className=" h-32  col-span-1 rounded-l"
              src={similarRecipe?.image}
              alt=""
            />
            <h4>{similarRecipe.name}</h4>
            <p>{similarRecipe.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetail;
