// import "../public/css/auth.css";
// import "../public/css/custom.css";
// import "../public/css/dashboard.css";
// import "../public/css/responsive.css";
// import "../public/font/stylesheet.css";
// import "react-toastify/dist/ReactToastify.css";
// import 'react-phone-input-2/lib/style.css';
// import { ToastContainer } from "react-toastify";
// import DashboardLayout from "../components/layout/dashboardLayout";
// import { useEffect, useState } from "react";
// import Router, { useRouter } from "next/router";
// import Cookies from "universal-cookie";
// import { wrapper } from "../redux";
// import StepContext from "../context/stepContext";
// import initializeAOS from "../utilities/aos";
// import { initGA, logPageView, pageview } from "../utilities/analytics";

// function App({ Component, pageProps }) {
//   const router = useRouter()
//   useEffect(() => {
//     initializeAOS();
//   }, []);

//   useEffect(() => {
//     if (!window.GA_INITIALIZED) {
//       initGA();
//       window.GA_INITIALIZED = true;
//     }
//     logPageView();
//     router.events.on("routeChangeComplete", logPageView);

//     return () => {
//       router.events.off("routeChangeComplete", logPageView);
//     };
//   }, [router.events]);

//   useEffect(() => {
//     const handleRouteChange = (url) => {
//       pageview(url)
//     }
//     //When the component is mounted, subscribe to router changes
//     //and log those page views
//     router.events.on('routeChangeComplete', handleRouteChange)

//     // If the component is unmounted, unsubscribe
//     // from the event with the `off` method
//     return () => {
//       router.events.off('routeChangeComplete', handleRouteChange)
//     }
//   }, [router.events])

//   const userLogin = true;

//   const publicPages = ['/']

//   return (
//     <>
//       <StepContext>
//         {!publicPages.includes(router.pathname) ? <DashboardLayout >
//           <Component {...pageProps} />
//           <ToastContainer
//             autoClose={800}
//           />
//         </DashboardLayout>: <>          <Component {...pageProps} />
//           <ToastContainer
//             autoClose={800}
//           /></> }
//       </StepContext>
//     </>
//   );
// }

// export default wrapper.withRedux(App);

import "../public/css/auth.css";
import "../public/css/custom.css";
import "../public/css/dashboard.css";
import "../public/css/responsive.css";
import "../public/font/stylesheet.css";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";
import { ToastContainer } from "react-toastify";
import DashboardLayout from "../components/layout/dashboardLayout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { wrapper } from "../redux";
import StepContext from "../context/stepContext";
import initializeAOS from "../utilities/aos";
import { initGA, logPageView, pageview } from "../utilities/analytics";
import { ClientProvider } from "../context/ClientContext";

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    initializeAOS();
  }, []);

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    router.events.on("routeChangeComplete", logPageView);

    return () => {
      router.events.off("routeChangeComplete", logPageView);
    };
  }, [router.events]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const userLogin = true;
  const publicPages = ["/"];

  useEffect(() => {
    // Disable Ctrl + Scroll zoom
    const preventZoom = (event) => {
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
        }
    };
    window.addEventListener('wheel', preventZoom, { passive: false });

    // Disable keyboard zoom (Ctrl + '+' or '-')
    const preventKeyZoom = (event) => {
        if (
            (event.ctrlKey || event.metaKey) &&
            (event.key
=== '+' || event.key
=== '-' || event.key
=== '=')
        ) {
            event.preventDefault();
        }
    };
    window.addEventListener('keydown', preventKeyZoom);

    // Cleanup listeners on unmount
    return () => {
        window.removeEventListener('wheel', preventZoom);
        window.removeEventListener('keydown', preventKeyZoom);
    };
}, []);
  return (
    <ClientProvider>
      <StepContext>
        {!publicPages.includes(router.pathname) ? (
          <DashboardLayout>
            <Component {...pageProps} />
            <ToastContainer autoClose={800} />
          </DashboardLayout>
        ) : (
          <>
            <Component {...pageProps} />
            <ToastContainer autoClose={800} />
          </>
        )}
      </StepContext>
    </ClientProvider>
  );
}

export default wrapper.withRedux(App);
