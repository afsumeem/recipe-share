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
    fetch("http://localhost:5000/recipes")
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

      {/*  */}

      <h3>Similar Recipes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {similarRecipes.map((similarRecipe) => (
          <div key={similarRecipe._id} className="border p-2">
            <h4>{similarRecipe.name}</h4>
            <p>{similarRecipe.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetail;
