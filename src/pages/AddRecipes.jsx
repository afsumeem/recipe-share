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
    <div className="container mx-auto my-10">
      {/* section title */}
      <h2 className="text-orange-600 text-2xl font-bold uppercase mt-10 mb-16  relative text-center">
        Add New Recipe
        <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-14 border-b-[3px] border-orange-600"></span>
      </h2>

      {/* add recipe form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-2/3 block mx-auto"
      >
        <div className="flex gap-3 items-center justify-between">
          <input
            type="text"
            placeholder="Recipe Name"
            className="border w-full max-w-xs"
            {...register("name", { required: true })}
          />
          <input
            type="file"
            placeholder="Image"
            className=" w-full border"
            {...register("image", { required: true })}
          />
        </div>

        <textarea
          type="text"
          placeholder="Recipe Details"
          className=" w-full border"
          {...register("detail", { required: true })}
        />
        <br />
        <input
          type="text"
          placeholder="Youtube link"
          className="border w-full mb-3"
          {...register("youtube", { required: true })}
        />
        <input
          type="text"
          placeholder="Country"
          className="border w-full mb-3"
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
        <br />
        <button
          disabled={isSubmitting}
          type="submit"
          className="border-orange-600 border  px-3 py-2 rounded mt-5 w-full"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipes;
