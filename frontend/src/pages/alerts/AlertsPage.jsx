import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";

import DashboardLayout from "../../layouts/DashboardLayout";

import axiosInstance from "../../api/axios";

function AlertsPage() {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    fetchAlerts();

  }, []);

  const fetchAlerts = async () => {

    try {

      const token =
        localStorage.getItem("access_token");

      const response =
        await axiosInstance.get(
          "inventory/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      generateAlerts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const generateAlerts = (medicines) => {

    const today = new Date();

    let alertList = [];

    medicines.forEach((medicine) => {

      const expiryDate =
        new Date(medicine.expiry_date);

      const difference =
        expiryDate - today;

      const daysRemaining =
        difference / (1000 * 60 * 60 * 24);

      if (daysRemaining < 0) {

        alertList.push({
          type: "expired",
          medicine: medicine.name,
          message:
            "Medicine has expired and requires action.",
        });
      }

      else if (daysRemaining < 30) {

        alertList.push({
          type: "warning",
          medicine: medicine.name,
          message:
            "Medicine is expiring within 30 days.",
        });
      }

      if (medicine.quantity < 20) {

        alertList.push({
          type: "stock",
          medicine: medicine.name,
          message:
            "Medicine stock is critically low.",
        });
      }

    });

    setAlerts(alertList);
  };

  const getBadgeStyle = (type) => {

    if (type === "expired") {

      return "bg-red-100 text-red-600";
    }

    if (type === "warning") {

      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-orange-100 text-orange-700";
  };

  return (

    <PageTransition>

    <DashboardLayout>

      {/* HEADER */}

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">

            Alerts Center

          </h1>

          <p className="text-slate-500 mt-2 dark:text-white">

            Monitor medicine expiry and inventory risks.

          </p>

        </div>

        <div
          className="
          bg-white
          border border-slate-200
          rounded-2xl
          px-6 py-4
          shadow-sm
          "
        >

          <p className="text-sm text-slate-500">

            Active Alerts

          </p>

          <h2 className="text-3xl font-bold text-slate-900">

            {alerts.length}

          </h2>

        </div>

      </div>

      {/* ALERTS */}

      <div className="space-y-5">

        {alerts.length > 0 ? (

          alerts.map((alert, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              whileHover={{
                y: -4,
                scale: 1.01,
              }}
              className="
              bg-white
              border border-slate-200
              rounded-3xl
              p-6
              shadow-sm
              hover:shadow-xl
              transition-all duration-300
              "
            >

              <div className="flex items-start justify-between">

                <div>

                  <div className="flex items-center gap-3 mb-3">

                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

                    <h2 className="text-xl font-semibold text-slate-900">

                      {alert.medicine}

                    </h2>

                    <span
                      className={`
                      px-3 py-1
                      rounded-full
                      text-xs
                      font-medium
                      ${getBadgeStyle(alert.type)}
                      `}
                    >

                      {alert.type}

                    </span>

                  </div>

                  <p className="text-slate-500 leading-relaxed">

                    {alert.message}

                  </p>

                </div>

              </div>

            </motion.div>
          ))

        ) : (

          <div
            className="
            bg-white
            border border-slate-200
            rounded-3xl
            p-16
            text-center
            shadow-sm
            "
          >

            <div className="text-5xl mb-5">

              ✨

            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">

              No Active Alerts

            </h2>

            <p className="text-slate-500">

              Everything is running smoothly.

            </p>

          </div>
        )}

      </div>

    </DashboardLayout>
    </PageTransition>
  );
}

export default AlertsPage;