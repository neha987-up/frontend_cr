import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useClient } from "../../context/ClientContext";
import CheckoutSubscribe from "./CheckoutSubscribe";

const stripePromise = loadStripe(String(process.env.STRIPE_PUBLISHABLE_KEY));

const StripeSubscribe = ({
  subData,
  close
}) => {

  const isClient = useClient();
  if (!isClient) return null;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="stripe-payment-container">
      {isLoading ? (
        <div className="text-center ">
          <span
            className="spinner-border spinner-border-sm-30  stripeSpan"
            role="status"
            aria-hidden="true"
          ></span>
        </div>
      ) : (
        <>
          <Elements
            stripe={stripePromise}
          >
            <CheckoutSubscribe
              subData={subData}
              close={close}
            />
          </Elements>
        </>
      )}
    </div>
  );
};

export default StripeSubscribe;
