import { useEffect, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";

const AllRecipes = () => {
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
        const response = await fetch("http://localhost:5000/current-user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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
      window.location.href = `/recipe-detail/${recipe._id}`;
      return;
    } else if (user?.coin < 10) {
      window.location.href = "/purchase-coins";
      return;
    }

    const confirm = window.confirm("Spending 10 coins to view this recipe?");
    if (confirm) {
      try {
        const response = await fetch(
          `http://localhost:5000/unlock-recipe/${recipe._id}`,
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
          window.location.href = `/recipe-detail/${recipe._id}`;
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
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
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        `http://localhost:5000/recipes?page=${page}`,
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
      <div className="flex justify-between mb-4">
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
        <input
          type="text"
          placeholder="Search recipe by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border w-full md:w1/2 lg:w-1/3 p-2 rounded-lg border-orange-600 placeholder:text-orange-600 focus:outline-2 outline-orange-600"
        />
      </div>
      <hr />

      {/* filter by recipe category */}
      {/* <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {uniqueCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select> */}

      <div className="flex gap-2 my-4 flex-wrap">
        <button
          className={`px-4 py-2 rounded-lg border ${
            selectedCategory === ""
              ? "bg-orange-600 border-orange-600 text-white"
              : "bg-white border-gray-300"
          }`}
          onClick={() => handleCategoryChange("")}
        >
          All Categories
        </button>
        {uniqueCategories?.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg border ${
              selectedCategory === category
                ? "bg-orange-600 border-orange-600 text-white"
                : "bg-white border-gray-300"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <h2>all recipes</h2>

      <div className="grid grid-cols-1">
        {filteredRecipes.map((recipe, index) => (
          <div key={index} className="flex">
            <img className="w-20" src={recipe.image} alt="" />
            <div>
              <h2>{recipe.name}</h2>
              <p>Purchased by: {recipe.purchased_by?.length}</p>
              <p>Creator email: {recipe.creatorEmail}</p>
              <p>Country: {recipe.country}</p>
              <NavLink to={`/recipe-detail/${recipe._id}`}>
                View the Recipe
              </NavLink>

              <button onClick={() => handleViewRecipe(recipe)}>
                View the Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
      {hasMore && <p>Loading more recipes...</p>}
    </div>
  );
};

export default AllRecipes;
