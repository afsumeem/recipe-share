import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/firebase.auth";

// image hosting api
const image_hosting_key = import.meta.env.VITE_Imgbb;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddRecipes = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // user email
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    //image upload
    const imageFile = { image: data.image[0] };

    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const recipeInfo = {
        name: data.name,
        detail: data.detail,
        image: res.data.data.display_url,
        youtube: data.youtube,
        country: data.country,
        category: data.category,
        creatorEmail: userEmail,
        watchCount: 0,
        purchased_by: [],
      };

      const uploadRecipe = await axios.post(
        "https://recipe-share-backend-40a5.onrender.com/recipes",
        recipeInfo,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (uploadRecipe.data.insertedId) {
        reset();
        setIsSubmitting(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Recipe Added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to Add Recipe",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSubmitting(false);
      }
    }
  };
  return (
    <div>
      <h2>add recipes</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Recipe Name"
          className="input input-bordered w-full max-w-xs"
          {...register("name", { required: true })}
        />
        <input
          type="file"
          placeholder="Image"
          className="input input-bordered w-full max-w-xs"
          {...register("image", { required: true })}
        />
        <textarea
          type="text"
          placeholder="Recipe Details"
          className="input input-bordered w-full max-w-xs"
          {...register("detail", { required: true })}
        />
        <input
          type="text"
          placeholder="Youtube link"
          className="input input-bordered w-full max-w-xs"
          {...register("youtube", { required: true })}
        />
        <input
          type="text"
          placeholder="Country"
          className="input input-bordered w-full max-w-xs"
          {...register("country", { required: true })}
        />
        <select
          defaultValue="default"
          className="select select-primary w-full max-w-xs"
          {...register("category", { required: true })}
        >
          <option disabled value="default">
            Recipe Category
          </option>
          <option value="Desserts">Desserts</option>
          <option value="Vegan">Vegan</option>
          <option value="Meat">Meat</option>
          <option value="Sea-food">Sea Food</option>
          <option value="Soups-stews">Soups & Stews</option>
          <option value="Salads">Salads</option>
          <option value="Snacks">Snacks</option>
          <option value="Baking-breads">Baking & Breads</option>
          <option value="Ethnic-cuisine">Ethnic Cuisine</option>
          <option value="Healthy-recipes">Healthy Recipes</option>
          <option value="Beverages">Beverages</option>
        </select>
        <button disabled={isSubmitting} type="submit">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipes;
