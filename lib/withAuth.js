import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
// import { getSession } from "next-auth/react";

export default function withAuth(Component) {
  return function WithAuth(props) {
    const router = useRouter();

    useEffect(() => {
      async function checkAuth() {
        if (localStorage.getItem("authToken") == null) {
          toast.warning("Please signup or login to proceed");
          router.push("/auth/signup");
        }
      }

      checkAuth();
    }, []);

    return <Component {...props} />;
  };
}
