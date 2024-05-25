import CountUp from "react-countup";

const Counter = () => {
  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="flex gap-5 flex-col items-center justify-center w-full p-10 border border-orange-600 rounded-lg">
          <CountUp end={100} />
          Total Recipes
        </div>
        <div className="flex gap-5 flex-col items-center justify-center w-full p-10 border border-orange-600 rounded-lg">
          <CountUp end={100} />
          Total Users
        </div>
        <div className="flex gap-5 flex-col items-center justify-center w-full p-10 border border-orange-600 rounded-lg">
          <CountUp end={100} />
          Total Categories
        </div>
      </div>
    </div>
  );
};

export default Counter;
