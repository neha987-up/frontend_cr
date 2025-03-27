import Navbar from "../navbar.js";
import Footer from "../footer.js";
import { useRouter } from "next/router";
import SideBar from "../sidebar.js";
import { useState, useEffect } from "react";
import Header from "../Header.js";

export default function Layout({ children }) {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleToggleSidebar = (flag) => {
    setToggleSidebar((prev) => !prev);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1200px)');

    const shouldLockScroll = mediaQuery.matches && toggleSidebar;
    document.body.style.overflow = shouldLockScroll ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [toggleSidebar]);

  return (
    <>
      <div className="mainBox">
        <SideBar
          toggleSidebar={toggleSidebar}
          handleToggleSidebar={handleToggleSidebar}
        />
        <main className={toggleSidebar ? "dashboard full" : "dashboard hide"}>
          <Header
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
            handleToggleSidebar={handleToggleSidebar}
          />
          {children}
        </main>
      </div>
    </>
  );
}
