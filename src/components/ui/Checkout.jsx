import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Checkout = ({ dollarAmount, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();
  //
  useEffect(() => {
    axios
      .post("http://localhost:5000/create-payment-intent", { dollarAmount })
      .then((res) => {
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [dollarAmount]);

  //

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    //
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    //
    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log(paymentMethod);
    }

    //
    try {
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              email: user.email,
            },
          },
        });

      if (confirmError) {
        setError(confirmError.message);
      } else if (paymentIntent.status === "succeeded") {
        await axios.post(
          "http://localhost:5000/update-coin-balance",
          {
            email: user.email,
            coinAmount: dollarAmount * 100,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        navigate("/recipes");

        console.log("Payment succeeded:", paymentIntent);
      }
    } catch (error) {
      console.error("Error confirming card payment:", error);
      setError("An error occurred during payment. Please try again.");
    }
    // confirm payment
    // const { paymentIntent, error: confirmError } =
    //   await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: card,
    //       billing_details: {
    //         email: user?.email,
    //         // coin: user?.coin,
    //       },
    //     },
    //   });

    // if (confirmError) {
    //   console.log("confirm error");
    // } else {
    //   if (paymentIntent.status === "succeeded") {
    //     console.log("transaction ID:", paymentIntent.id);
    //   }
    // }
  };

  //
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe}
          className="bg-orange-600 px-5 text-white my-5 py-1"
        >
          Pay {dollarAmount}
        </button>
      </form>
      <p>{error}</p>
    </div>
  );
};
Checkout.propTypes = {
  dollarAmount: PropTypes.number.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};
export default Checkout;
