import { useEffect, useState } from "react";


import PageTransition from "../../components/PageTransition";

import DashboardLayout from "../../layouts/DashboardLayout";

import axiosInstance from "../../api/axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function DashboardPage() {

  const [medicines, setMedicines] =
    useState([]);

  useEffect(() => {

    fetchMedicines();

  }, []);

  // FETCH MEDICINES

  const fetchMedicines = async () => {

    try {

      const token =
        localStorage.getItem(
          "access_token"
        );

      const response =
        await axiosInstance.get(
          "inventory/",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setMedicines(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // STATUS COUNTS

  const today = new Date();

  let lowStock = 0;

  let expiringSoon = 0;

  let expired = 0;

  medicines.forEach((medicine) => {

    const expiryDate =
      new Date(
        medicine.expiry_date
      );

    const difference =
      expiryDate - today;

    const daysRemaining =
      difference /
      (1000 * 60 * 60 * 24);

    if (daysRemaining < 0) {

      expired++;

    } else if (daysRemaining < 30) {

      expiringSoon++;
    }

    if (medicine.quantity < 20) {

      lowStock++;
    }
  });

  // HEALTHY COUNT

  const healthy =
    medicines.length -
    lowStock -
    expiringSoon -
    expired;

  // CHART DATA

  const chartData = [

    {
      name: "Low Stock",
      value: lowStock,
    },

    {
      name: "Expiring Soon",
      value: expiringSoon,
    },

    {
      name: "Expired",
      value: expired,
    },

    {
      name: "Healthy",
      value: healthy,
    },
  ];

  // ALERTS

  const alerts = [];

  if (lowStock > 0) {

    alerts.push({
      type: "warning",
      message:
        `${lowStock} medicines are low in stock.`,
    });
  }

  if (expiringSoon > 0) {

    alerts.push({
      type: "warning",
      message:
        `${expiringSoon} medicines are expiring soon.`,
    });
  }

  if (expired > 0) {

    alerts.push({
      type: "danger",
      message:
        `${expired} medicines are expired.`,
    });
  }

  // CHART COLORS

  const COLORS = [

    "#f97316",
    "#eab308",
    "#dc2626",
    "#10b981",
  ];

  return (

    <PageTransition>

      <DashboardLayout>

        {/* HEADER */}

        <div className="mb-10">

          <h1
            className="
            text-4xl
            font-bold
            text-slate-900
            dark:text-white
            "
          >

            Dashboard Analytics

          </h1>

          <p
            className="
            text-slate-500
            dark:text-slate-400
            mt-2
            "
          >

            Monitor medicine inventory
            health and operational insights.

          </p>

        </div>

        {/* ALERTS */}

        <div className="space-y-4 mb-10">

          {alerts.map(
            (alert, index) => (

              <div
                key={index}
                className={`
                flex
                items-center
                justify-between
                px-6 py-5
                rounded-[24px]
                border
                shadow-sm
                transition-all duration-300
                hover:shadow-lg
                ${
                  alert.type === "danger"
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-amber-50 border-amber-200 text-amber-700"
                }
                `}
              >

                <div
                  className="
                  flex
                  items-center
                  gap-4
                  "
                >

                  <div
                    className={`
                    w-3 h-3
                    rounded-full
                    animate-pulse
                    ${
                      alert.type === "danger"
                        ? "bg-red-500"
                        : "bg-amber-500"
                    }
                    `}
                  />

                  <p className="font-medium">

                    {alert.message}

                  </p>

                </div>

              </div>
            )
          )}

        </div>

        {/* STATS */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          mb-10
          "
        >

          {/* TOTAL */}

          <div
            className="
            bg-white/90
            dark:bg-slate-900
            backdrop-blur-sm
            rounded-[28px]
            border border-slate-200
            dark:border-slate-700
            p-7
            shadow-sm
            hover:shadow-xl
            transition-all duration-500
            "
          >

            <p
              className="
              text-slate-500
              dark:text-slate-400
              text-sm
              mb-3
              "
            >

              Total Medicines

            </p>

            <h2
              className="
              text-5xl
              font-bold
              text-slate-900
              dark:text-white
              "
            >

              {medicines.length}

            </h2>

          </div>

          {/* LOW STOCK */}

          <div
            className="
            bg-orange-50
            dark:bg-orange-950/40
            rounded-[28px]
            border border-orange-100
            dark:border-orange-900
            p-7
            shadow-sm
            hover:shadow-xl
            transition-all duration-500
            "
          >

            <p
              className="
              text-orange-600
              dark:text-orange-300
              text-sm
              mb-3
              "
            >

              Low Stock

            </p>

            <h2
              className="
              text-5xl
              font-bold
              text-orange-700
              dark:text-orange-200
              "
            >

              {lowStock}

            </h2>

          </div>

          {/* EXPIRING */}

          <div
            className="
            bg-amber-50
            dark:bg-amber-950/40
            rounded-[28px]
            border border-amber-100
            dark:border-amber-900
            p-7
            shadow-sm
            hover:shadow-xl
            transition-all duration-500
            "
          >

            <p
              className="
              text-amber-600
              dark:text-amber-300
              text-sm
              mb-3
              "
            >

              Expiring Soon

            </p>

            <h2
              className="
              text-5xl
              font-bold
              text-amber-700
              dark:text-amber-200
              "
            >

              {expiringSoon}

            </h2>

          </div>

          {/* EXPIRED */}

          <div
            className="
            bg-red-50
            dark:bg-red-950/40
            rounded-[28px]
            border border-red-100
            dark:border-red-900
            p-7
            shadow-sm
            hover:shadow-xl
            transition-all duration-500
            "
          >

            <p
              className="
              text-red-600
              dark:text-red-300
              text-sm
              mb-3
              "
            >

              Expired

            </p>

            <h2
              className="
              text-5xl
              font-bold
              text-red-700
              dark:text-red-200
              "
            >

              {expired}

            </h2>

          </div>

        </div>

        {/* CHART SECTION */}

        <div
          className="
          bg-white/90
          dark:bg-slate-900
          backdrop-blur-sm
          rounded-[32px]
          border border-slate-200
          dark:border-slate-700
          shadow-sm
          hover:shadow-xl
          transition-all duration-500
          p-8
          "
        >

          <div className="mb-8">

            <h2
              className="
              text-3xl
              font-bold
              text-slate-900
              dark:text-white
              "
            >

              Inventory Analytics

            </h2>

            <p
              className="
              text-slate-500
              dark:text-slate-400
              mt-2
              "
            >

              Visual overview of inventory
              conditions and medicine health.

            </p>

          </div>

          <div className="w-full h-[450px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={150}
                  innerRadius={80}
                  paddingAngle={4}
                >

                  {chartData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </DashboardLayout>

    </PageTransition>
  );
}

export default DashboardPage;