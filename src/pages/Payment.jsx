import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "../components/ui/Checkout";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_stripe);

const Payment = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const { dollarAmount } = location.state || {};

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

  return (
    <div>
      <Elements stripe={stripePromise}>
        <Checkout dollarAmount={dollarAmount} user={user} />
      </Elements>
    </div>
  );
};

export default Payment;
