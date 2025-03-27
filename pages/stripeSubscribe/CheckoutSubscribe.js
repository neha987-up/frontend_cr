import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";
import { useClient } from "../../context/ClientContext";
import { ApiClient } from "../../utilities/api";
import { AUTH_API_URL } from "../../utilities/config";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, selectLoginAuth } from "../../redux/slices/auth";

const CheckoutSubscribe = ({ subData, close }) => {
  const dispatch = useDispatch()
  const isClient = useClient();
  if (!isClient) return null;
  const authData = useSelector(selectLoginAuth);

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    try {
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements?.getElement(CardElement),
        billing_details: {
          name: authData?.usersInfo?.user?.name,
          email: authData?.usersInfo?.user?.email,
        },
      });

      const response = await ApiClient.post(`${AUTH_API_URL}/api/v1/users/buy/subscription`, {
        "customer_id": authData?.usersInfo?.customer ?? authData?.usersInfo?.user?.customer_id,
        "priceId": subData?.price_id,
        "paymentMethodId": paymentMethod?.paymentMethod?.id,
        "amount": subData?.cost,
        "membership_id": subData?.id
      })

      const confirmPayment = await stripe?.confirmCardPayment(
        response.data.payload.clientSecret
      );

      console.log(confirmPayment, '+++')

      if (confirmPayment?.error) {
        toast.error(confirmPayment.error.message);
      } else {
        toast.success("Subscription Purchased Successfully!");
      }
      dispatch(
        getUserProfile({
          params: {},
          callback: (res, error) => { },
        })
      );
      close()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{
        hidePostalCode: true,
        style: {
          base: {
            color: "#FFF",
            "::placeholder": {
              color: "rgba(255, 255, 255, 0.7)",
            },
          }
        }
      }} />
      <div className="d-flex justify-content-center align-items-center mt-3">
        <button disabled={!stripe || loading} className="payNowButton">
          {loading ? (
            <span className="spinner-border spinner-border-sm ms-1"></span>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutSubscribe;
