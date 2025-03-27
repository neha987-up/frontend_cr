import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useClient } from "../../context/ClientContext";

const CheckoutForm = ({ purchaseToken }) => {
  const isClient = useClient();
  if (!isClient) return null;
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        // redirect: "if_required",
        // return_url: "http://localhost:3000/home",
      },
    });
    setLoading(true);
    if (result?.error) {
      toast.error(result.error.message);
      setLoading(false);
    } else {
      setLoading(false);
      purchaseToken();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <PaymentElement />
      <div className="d-flex justify-content-center align-items-center mt-3 main_label_heading">
        <button disabled={!stripe || loading} className="payNowButton">
          {loading ? (
            <span className="spinner-border spinner-border-sm ms-1"></span>
          ) : (
            "Pay Now"
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
