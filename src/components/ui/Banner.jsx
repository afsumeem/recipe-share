import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative h-screen bg-black flex flex-col items-center justify-center w-full">
      <div className="w-full">
        <video autoPlay="autoplay" muted loop id="myVideo" playsInline>
          <source src="/videos/banner.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="text-white z-10 flex flex-col items-center justify-center">
        <h2 className="text-5xl font-bold">
          Unlock the <span className="text-orange-600">Chef</span> in You
        </h2>
        <h2 className="text-2xl ">
          Share Your <span className="text-orange-600">Culinary </span>Creations
        </h2>
        <div className="mt-5  flex gap-2">
          <NavLink
            to="/recipes"
            className="border border-orange-600 px-3 py-2 rounded hover:bg-orange-600 duration-300"
          >
            See Recipes
          </NavLink>
          <NavLink
            to="/add-recipes"
            className="border border-orange-600 bg-orange-600 px-3 py-2  rounded hover:bg-orange-700 duration-300"
          >
            Add Recipes
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Banner;
