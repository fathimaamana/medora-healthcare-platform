import { motion } from "framer-motion";

import PageTransition from "../../components/PageTransition";

import DashboardLayout from "../../layouts/DashboardLayout";

function ReportsPage() {

  const exportReports = () => {

    const reportData = [

      [
        "Report Name",
        "Description",
        "Status",
      ],

      [
        "Inventory Summary",
        "Overview of current medicine inventory and stock movement.",
        "Generated Today",
      ],

      [
        "Expiry Analysis",
        "Track medicines nearing expiry and expired products.",
        "Updated 2 Hours Ago",
      ],

      [
        "Low Stock Report",
        "Monitor medicines with critically low inventory levels.",
        "Live Monitoring",
      ],
    ];

    const csvContent = reportData
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const link =
      document.createElement("a");

    const url =
      URL.createObjectURL(blob);

    link.setAttribute("href", url);

    link.setAttribute(
      "download",
      "medora_reports.csv"
    );

    link.style.visibility =
      "hidden";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const reports = [

    {
      title: "Inventory Summary",
      description:
        "Overview of current medicine inventory and stock movement.",
      status: "Generated Today",
    },

    {
      title: "Expiry Analysis",
      description:
        "Track medicines nearing expiry and expired products.",
      status: "Updated 2 Hours Ago",
    },

    {
      title: "Low Stock Report",
      description:
        "Monitor medicines with critically low inventory levels.",
      status: "Live Monitoring",
    },
  ];

  return (

    <PageTransition>

      <DashboardLayout>

        {/* HEADER */}

        <div
          className="
          mb-10
          flex
          items-center
          justify-between
          "
        >

          <div>

            <h1
              className="
              text-4xl
              font-bold
              text-slate-900
              dark:text-white
              "
            >

              Reports Center

            </h1>

            <p
              className="
              text-slate-500
              dark:text-slate-300
              mt-2
              "
            >

              Analyze inventory performance and generate operational reports.

            </p>

          </div>

          {/* EXPORT BUTTON */}

          <motion.button
            onClick={exportReports}
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
            bg-slate-900
            dark:bg-slate-800
            hover:bg-slate-800
            dark:hover:bg-slate-700
            text-white
            px-6 py-4
            rounded-2xl
            shadow-sm
            hover:shadow-lg
            transition-all duration-300
            font-medium
            "
          >

            Export Reports

          </motion.button>

        </div>

        {/* STATS */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mb-10
          "
        >

          {/* TOTAL REPORTS */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="
            bg-white
            dark:bg-slate-900
            rounded-3xl
            border
            border-slate-200
            dark:border-slate-700
            p-6
            shadow-sm
            hover:shadow-xl
            transition-all duration-300
            "
          >

            <p
              className="
              text-slate-500
              dark:text-slate-400
              text-sm
              mb-2
              "
            >

              Total Reports

            </p>

            <h2
              className="
              text-4xl
              font-bold
              text-slate-900
              dark:text-white
              "
            >

              12

            </h2>

          </motion.div>

          {/* ACTIVE MONITORING */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="
            bg-white
            dark:bg-slate-900
            rounded-3xl
            border
            border-slate-200
            dark:border-slate-700
            p-6
            shadow-sm
            hover:shadow-xl
            transition-all duration-300
            "
          >

            <p
              className="
              text-slate-500
              dark:text-slate-400
              text-sm
              mb-2
              "
            >

              Active Monitoring

            </p>

            <h2
              className="
              text-4xl
              font-bold
              text-slate-900
              dark:text-white
              "
            >

              24/7

            </h2>

          </motion.div>

          {/* LAST EXPORT */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="
            bg-white
            dark:bg-slate-900
            rounded-3xl
            border
            border-slate-200
            dark:border-slate-700
            p-6
            shadow-sm
            hover:shadow-xl
            transition-all duration-300
            "
          >

            <p
              className="
              text-slate-500
              dark:text-slate-400
              text-sm
              mb-2
              "
            >

              Last Export

            </p>

            <h2
              className="
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
              "
            >

              Today

            </h2>

          </motion.div>

        </div>

        {/* REPORTS LIST */}

        <div className="space-y-5">

          {reports.map(
            (report, index) => (

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
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -3,
                }}
                className="
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-700
                rounded-3xl
                p-6
                shadow-sm
                hover:shadow-xl
                transition-all duration-300
                cursor-pointer
                "
              >

                <div
                  className="
                  flex
                  items-start
                  justify-between
                  "
                >

                  {/* LEFT */}

                  <div>

                    <div
                      className="
                      flex
                      items-center
                      gap-3
                      mb-3
                      "
                    >

                      <div
                        className="
                        w-3 h-3
                        rounded-full
                        bg-emerald-500
                        animate-pulse
                        "
                      />

                      <h2
                        className="
                        text-2xl
                        font-semibold
                        text-slate-900
                        dark:text-white
                        "
                      >

                        {report.title}

                      </h2>

                    </div>

                    <p
                      className="
                      text-slate-500
                      dark:text-slate-300
                      leading-relaxed
                      max-w-3xl
                      "
                    >

                      {report.description}

                    </p>

                  </div>

                  {/* RIGHT */}

                  <div>

                    <span
                      className="
                      bg-slate-100
                      dark:bg-slate-800
                      text-slate-700
                      dark:text-slate-200
                      px-4 py-2
                      rounded-full
                      text-sm
                      font-medium
                      "
                    >

                      {report.status}

                    </span>

                  </div>

                </div>

              </motion.div>
            )
          )}

        </div>

      </DashboardLayout>

    </PageTransition>
  );
}

export default ReportsPage;