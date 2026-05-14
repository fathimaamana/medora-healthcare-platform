import { useState } from "react";

import logo from "../../assets/logo.png";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import axiosInstance from "../../api/axios";

function LoginPage() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await axiosInstance.post(
          "auth/login/",
          formData
        );

      localStorage.setItem(
        "access_token",
        response.data.access
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      toast.success(
        "Login successful"
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      toast.error(
        "Invalid username or password"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-100
      via-white
      to-blue-50
      flex
      items-center
      justify-center
      p-6
      "
    >

      <div
        className="
        w-full
        max-w-6xl
        grid
        grid-cols-1
        lg:grid-cols-2
        bg-white/70
        backdrop-blur-xl
        rounded-[40px]
        overflow-hidden
        border border-white/40
        shadow-2xl
        "
      >

        {/* LEFT SIDE */}

        <div
          className="
          hidden
          lg:flex
          flex-col
          justify-between
          p-14
          bg-gradient-to-br
          from-slate-900
          to-slate-800
          text-white
          relative
          overflow-hidden
          "
        >

          {/* BACKGROUND EFFECT */}

          <div
            className="
            absolute
            w-96 h-96
            rounded-full
            bg-blue-500/20
            blur-3xl
            top-[-100px]
            right-[-100px]
            "
          />

          <div
            className="
            absolute
            w-80 h-80
            rounded-full
            bg-cyan-400/10
            blur-3xl
            bottom-[-100px]
            left-[-100px]
            "
          />

          {/* CONTENT */}

          <div className="relative z-10">

            <div
  className="
  w-20 h-20
  rounded-3xl
  bg-white/10
  backdrop-blur-sm
  flex
  items-center
  justify-center
  mb-8
  overflow-hidden
  "
>

  <img
    src={logo}
    alt="Medora Logo"
    className="
    w-14
    h-14
    object-contain
    "
  />

</div>

            <h1
              className="
              text-5xl
              font-bold
              leading-tight
              "
            >

              Medora

            </h1>

            <p
              className="
              text-slate-300
              mt-6
              text-lg
              leading-relaxed
              max-w-md
              "
            >

              Smart medicine inventory and healthcare analytics platform for modern pharmacies and medical operations.

            </p>

          </div>

          {/* FOOTER */}

          <div className="relative z-10">

            <p className="text-slate-400 text-sm">

              Real-time monitoring • Analytics • Smart inventory tracking

            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div
          className="
          flex
          items-center
          justify-center
          p-8
          lg:p-14
          "
        >

          <div className="w-full max-w-md">

            <div className="mb-10">

              <h2
                className="
                text-4xl
                font-bold
                text-slate-900
                "
              >

                Welcome back

              </h2>

              <p className="text-slate-500 mt-3">

                Sign in to continue to your dashboard.

              </p>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* USERNAME */}

              <div>

                <label
                  className="
                  block
                  text-sm
                  font-medium
                  text-slate-600
                  mb-2
                  "
                >

                  Username

                </label>

                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="
                  w-full
                  bg-slate-50
                  border border-slate-200
                  focus:border-blue-500
                  focus:ring-4 focus:ring-blue-100
                  outline-none
                  rounded-2xl
                  px-5 py-4
                  transition-all
                  "
                />

              </div>

              {/* PASSWORD */}

              <div>

                <label
                  className="
                  block
                  text-sm
                  font-medium
                  text-slate-600
                  mb-2
                  "
                >

                  Password

                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="
                  w-full
                  bg-slate-50
                  border border-slate-200
                  focus:border-blue-500
                  focus:ring-4 focus:ring-blue-100
                  outline-none
                  rounded-2xl
                  px-5 py-4
                  transition-all
                  "
                />

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="
                w-full
                bg-slate-900
                hover:bg-slate-800
                text-white
                py-4
                rounded-2xl
                font-semibold
                transition-all duration-300
                hover:shadow-xl
                active:scale-[0.98]
                disabled:opacity-70
                "
              >

                {loading
                  ? "Signing In..."
                  : "Sign In"}

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;