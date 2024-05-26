import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const AllRecipes = () => {
  const navigate = useNavigate();
  const initialRecipes = useLoaderData();
  const [recipes, setRecipes] = useState(initialRecipes);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://recipe-share-backend-40a5.onrender.com/current-user",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  //

  //
  const handleViewRecipe = async (recipe) => {
    if (
      user.email === recipe.creatorEmail ||
      recipe?.purchased_by?.includes(user.email)
    ) {
      navigate(`/recipe-detail/${recipe._id}`);
      return;
    } else if (user?.coin < 10) {
      navigate("/purchase-coins");
      return;
    }

    // const confirm = window.confirm("Spending 10 coins to view this recipe?");

    const result = await Swal.fire({
      title: "Confirm Purchase",
      text: "Spending 10 coins to view this recipe?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, purchase it!",
    });
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://recipe-share-backend-40a5.onrender.com/unlock-recipe/${recipe._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();

        if (data.success) {
          setUser((prevUser) => ({ ...prevUser, coin: prevUser.coin - 10 }));
          navigate(`/recipe-detail/${recipe._id}`);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.message,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  // filter

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      (selectedCategory === "" || recipe.category === selectedCategory) &&
      (selectedCountry === "" || recipe.country === selectedCountry) &&
      recipe?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const uniqueCategories = [
    ...new Set(recipes.map((recipe) => recipe.category)),
  ];
  const uniqueCountries = [...new Set(recipes.map((recipe) => recipe.country))];

  //

  const loadMoreRecipes = async () => {
    try {
      const response = await fetch(
        `https://recipe-share-backend-40a5.onrender.com/recipes?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      if (data.length > 0) {
        setRecipes((prevRecipes) => [...prevRecipes, ...data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // No more recipes to load
      }
    } catch (error) {
      console.error("Error fetching more recipes:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        !hasMore
      )
        return;
      loadMoreRecipes();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-3">
        {/* filter by country */}
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          className="border p-2 rounded-lg border-orange-600 text-orange-600 focus:outline-2 outline-orange-600"
        >
          <option value="">All Countries</option>
          {uniqueCountries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* search bar */}
        <div className="relative w-full md:w1/2 lg:w-1/3">
          <input
            type="text"
            placeholder="Search recipe by title..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border w-full p-2 rounded-lg border-orange-600 placeholder:text-orange-600 focus:outline-2 outline-orange-600 pl-10"
          />
          <SlMagnifier className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600" />
        </div>
      </div>
      <hr />

      <div className="flex gap-2 my-4 flex-wrap">
        <button
          className={`px-4 py-2 rounded-lg border text-sm  ${
            selectedCategory === ""
              ? "bg-orange-600 border-orange-600 text-white font-semibold"
              : "bg-white border-gray-300"
          }`}
          onClick={() => handleCategoryChange("")}
        >
          All Categories
        </button>
        {uniqueCategories?.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg border text-sm  ${
              selectedCategory === category
                ? "bg-orange-600 border-orange-600 text-white font-semibold"
                : "bg-white border-gray-300 "
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* section title */}

      <h2 className="text-orange-600 text-2xl font-bold uppercase my-8 text-center relative">
        All Recipes
        <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-14 border-b-[3px] border-orange-600"></span>
      </h2>

      {/* display all recipes */}
      <div className="grid grid-cols-1 gap-4">
        {filteredRecipes.map((recipe, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3  gap-4 bg-orange-50 shadow-md rounded"
          >
            <img
              className=" h-auto md:h-72 w-full col-span-1 rounded-l"
              src={recipe.image}
              alt=""
            />
            <div className="p-7 flex flex-col justify-center">
              <h2 className="text-orange-600 text-2xl font-bold mb-5">
                {recipe.name}
              </h2>
              <p>
                Purchased by:{" "}
                {recipe?.purchased_by.length !== 0 ? (
                  <>{recipe?.purchased_by?.join(", ")}</>
                ) : (
                  "N/A"
                )}
              </p>
              <p className=" mt-2 italic text-orange-600">
                Recipe Creator - {recipe.creatorEmail}
              </p>
              <p className="flex items-center gap-1 font-bold mt-3">
                <IoLocationOutline /> {recipe.country}
              </p>

              <button
                onClick={() => handleViewRecipe(recipe)}
                className="border-b-2 border-orange-600 py-2   mt-5 w-fit text-orange-600 font-semibold hover:bg-orange-600 duration-300 hover:text-white hover:px-3 hover:rounded-lg"
              >
                View the Recipe
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* infinite scrolling  */}
      {hasMore && (
        <p className="text-center text-orange-600 font-semibold flex items-center justify-center gap-3 my-10 text-lg">
          Loading more recipes
          <span className="loading loading-dots loading-md mt-1"></span>
        </p>
      )}
    </div>
  );
};

export default AllRecipes;
