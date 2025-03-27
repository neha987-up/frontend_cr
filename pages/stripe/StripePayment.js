import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../redux/slices/token";
import { useClient } from "../../context/ClientContext";

const stripePromise = loadStripe(String(process.env.STRIPE_PUBLISHABLE_KEY));

const StripePayment = ({
  purchaseToken,
  amount,
}) => {

  <style>
    {`
          :where(.de7zKgf4__p-Root) {
            color: var(--colorText);
            font-family: var(--fontFamily);
            font-weight: var(--fontWeightNormal);
            line-height: var(--p-fontLineHeightSingleLine);
          }

          #card-panel .label.p-FieldLabel.Label.Label--empty {
            color: red !important;
          }
        `}
  </style>
  const isClient = useClient();
  if (!isClient) return null;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentIntentData, setPaymentIntentData] = useState(null);

  const getPaymentIntent = async () => {
    setIsLoading(true);
    const params = {
      amount: Number(amount) * 100,
    };

    dispatch(
      createPaymentIntent({
        params: params,
        callback: (resp) => {
          setIsLoading(false);
          if (resp?.status) {
            setPaymentIntentData(resp?.data?.payload);
          }
        },
      })
    );
  };

  useEffect(() => {
    getPaymentIntent();
    return () => { };
  }, []);

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
          {paymentIntentData !== null ? (
            <div className="stripeOuter">
              <Elements
                stripe={stripePromise}
                options={{ clientSecret: paymentIntentData?.client_secret, appearance: { rules: { '.Label': { 'color': '#FFF' } } } }}
              >
                <CheckoutForm
                  clientSecret={paymentIntentData?.client_secret}
                  paymentIntent={paymentIntentData}
                  purchaseToken={() => purchaseToken(paymentIntentData)}
                />
              </Elements>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default StripePayment;
