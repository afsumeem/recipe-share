import { useLoaderData } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

const RecipeDetail = () => {
  const recipe = useLoaderData();
  const [showLikedText, setShowLikedText] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
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

  return (
    <div>
      <h2>Recipe details page</h2>
      <p>{recipe.name}</p>
      <p>{recipe.country}</p>
      <button
        onClick={toggleFavorite}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
      {showLikedText && <p>Liked..</p>}
    </div>
  );
};

export default RecipeDetail;
