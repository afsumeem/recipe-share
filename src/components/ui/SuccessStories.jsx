import { NavLink } from "react-router-dom";

const SuccessStories = () => {
  return (
    <div>
      {" "}
      <div className="success-stories">
        {/* Introduction */}
        <div className="success-stories-intro text-center p-8 bg-orange-100">
          <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl">
            Discover how our community members have unlocked their culinary
            potential. Read their inspiring stories and see why you should join
            us on this flavorful journey!
          </p>
        </div>

        {/* Featured Stories */}
        <div className="featured-stories grid md:grid-cols-2 gap-8 p-8">
          <div className="story flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
            <img
              src="/images/user1.jpg"
              alt="User 1"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">
              Emmas Culinary Transformation
            </h3>
            <p className="text-lg">
              Using this platform, Ive discovered new recipes that have
              transformed my cooking skills. My family loves the meals I prepare
              now!
            </p>
          </div>
          <div className="story flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
            <img
              src="/images/user2.jpg"
              alt="User 2"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">
              Johns Recipe for Success
            </h3>
            <p className="text-lg">
              Thanks to the recipe sharing community, Ive perfected my baking
              skills. Sharing my recipes has been a rewarding experience!
            </p>
          </div>
        </div>

        {/* User Testimonials */}
        <div className="testimonials bg-gray-100 p-8">
          <h3 className="text-3xl font-bold text-center mb-6">
            What Our Users Say
          </h3>
          <div className="testimonial-grid grid md:grid-cols-3 gap-6">
            <div className="testimonial flex flex-col items-center bg-white p-4 shadow rounded-lg">
              <img
                src="/images/user3.jpg"
                alt="User 3"
                className="w-20 h-20 rounded-full mb-4"
              />
              <p className="text-lg text-center">
                Ive made so many new friends through this platform. We share
                recipes and cooking tips regularly!
              </p>
              <span className="text-sm text-gray-500 mt-2">- Sarah</span>
            </div>
            <div className="testimonial flex flex-col items-center bg-white p-4 shadow rounded-lg">
              <img
                src="/images/user4.jpg"
                alt="User 4"
                className="w-20 h-20 rounded-full mb-4"
              />
              <p className="text-lg text-center">
                The variety of recipes is amazing! Ive tried dishes from all
                over the world.
              </p>
              <span className="text-sm text-gray-500 mt-2">- Mike</span>
            </div>
            <div className="testimonial flex flex-col items-center bg-white p-4 shadow rounded-lg">
              <img
                src="/images/user5.jpg"
                alt="User 5"
                className="w-20 h-20 rounded-full mb-4"
              />
              <p className="text-lg text-center">
                Sharing my grandmothers recipes has brought me closer to my
                roots. Its wonderful to see others enjoy them!
              </p>
              <span className="text-sm text-gray-500 mt-2">- Anya</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta bg-orange-600 text-white p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Share Your Story</h3>
          <p className="text-lg mb-6">
            Wed love to hear how our platform has helped you in your culinary
            journey. Share your story with us and inspire others!
          </p>
          <NavLink
            to="/share-story"
            className="bg-white text-orange-600 px-4 py-2 rounded-full font-bold hover:bg-gray-200 duration-300"
          >
            Share Your Success Story
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
