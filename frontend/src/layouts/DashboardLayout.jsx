import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import logo from "../assets/logo.png";

function DashboardLayout({ children }) {

  // DARK MODE

  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "dark") {

      setDarkMode(true);

      document.documentElement.classList.add(
        "dark"
      );

    } else {

      setDarkMode(false);

      document.documentElement.classList.remove(
        "dark"
      );
    }

  }, []);

  const toggleDarkMode = () => {

    if (darkMode) {

      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );

      setDarkMode(false);

    } else {

      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

      setDarkMode(true);
    }
  };

  // LOGOUT

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem(
      "access_token"
    );

    localStorage.removeItem(
      "refresh_token"
    );

    localStorage.removeItem(
      "role"
    );

    navigate("/");
  };

  return (

    <div
      className="
      flex
      min-h-screen
      bg-slate-100
      dark:bg-slate-950
      transition-all duration-500
      "
    >

      {/* SIDEBAR */}

      <div
        className="
        w-72
        bg-white/90
        dark:bg-slate-900
        backdrop-blur-xl
        border-r
        border-slate-200
        dark:border-slate-800
        p-6
        shadow-xl
        flex
        flex-col
        justify-between
        transition-all duration-500
        "
      >

        {/* TOP SECTION */}

        <div>

          {/* LOGO */}

          <div className="mb-12">

            <div
              className="
              flex
              items-center
              gap-4
              mb-4
              "
            >

              {/* LOGO IMAGE */}

              <div
                className="
                w-14 h-14
                rounded-2xl
                bg-white
                dark:bg-slate-800
                flex
                items-center
                justify-center
                shadow-lg
                overflow-hidden
                "
              >

                <img
                  src={logo}
                  alt="Medora Logo"
                  className="
                  w-10
                  h-10
                  object-contain
                  "
                />

              </div>

              {/* BRAND */}

              <div>

                <h1
                  className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                  "
                >

                  Medora

                </h1>

                <p
                  className="
                  text-slate-500
                  dark:text-slate-400
                  text-sm
                  mt-1
                  "
                >

                  Healthcare Intelligence

                </p>

              </div>

            </div>

          </div>

          {/* NAVIGATION */}

          <nav className="space-y-3">

            <Link
              to="/dashboard"
              className="
              block
              px-5 py-4
              rounded-2xl
              bg-slate-100
              dark:bg-slate-800
              hover:bg-blue-600
              dark:hover:bg-blue-600
              hover:text-white
              dark:text-white
              transition-all duration-300
              hover:translate-x-1
              hover:shadow-lg
              font-medium
              "
            >

              Dashboard

            </Link>

            <Link
              to="/inventory"
              className="
              block
              px-5 py-4
              rounded-2xl
              bg-slate-100
              dark:bg-slate-800
              hover:bg-blue-600
              dark:hover:bg-blue-600
              hover:text-white
              dark:text-white
              transition-all duration-300
              hover:translate-x-1
              hover:shadow-lg
              font-medium
              "
            >

              Inventory

            </Link>

            <Link
              to="/alerts"
              className="
              block
              px-5 py-4
              rounded-2xl
              bg-slate-100
              dark:bg-slate-800
              hover:bg-blue-600
              dark:hover:bg-blue-600
              hover:text-white
              dark:text-white
              transition-all duration-300
              hover:translate-x-1
              hover:shadow-lg
              font-medium
              "
            >

              Alerts

            </Link>

            <Link
              to="/reports"
              className="
              block
              px-5 py-4
              rounded-2xl
              bg-slate-100
              dark:bg-slate-800
              hover:bg-blue-600
              dark:hover:bg-blue-600
              hover:text-white
              dark:text-white
              transition-all duration-300
              hover:translate-x-1
              hover:shadow-lg
              font-medium
              "
            >

              Reports

            </Link>

          </nav>

        </div>

        {/* BOTTOM SECTION */}

        <div className="space-y-4">

          {/* DARK MODE BUTTON */}

          <button
            onClick={toggleDarkMode}
            className="
            w-full
            bg-slate-100
            dark:bg-slate-800
            dark:text-white
            hover:bg-slate-200
            dark:hover:bg-slate-700
            px-4 py-4
            rounded-2xl
            transition-all duration-300
            font-medium
            shadow-sm
            hover:shadow-lg
            "
          >

            {darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}

          </button>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="
            w-full
            bg-red-500
            hover:bg-red-600
            transition-all duration-300
            py-4
            rounded-2xl
            font-semibold
            shadow-lg
            text-white
            active:scale-[0.98]
            "
          >

            Logout

          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div
        className="
        flex-1
        p-8
        overflow-y-auto
        text-slate-900
        dark:text-white
        transition-all duration-500
        "
      >

        {children}

      </div>

    </div>
  );
}

export default DashboardLayout;