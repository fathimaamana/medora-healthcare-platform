import {
  isAdmin,
  isViewer,
} from "../../utils/auth";

import toast from "react-hot-toast";


import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import axiosInstance from "../../api/axios";
import PageTransition from "../../components/PageTransition";

function InventoryPage() {

  const [medicines, setMedicines] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    batch_number: "",
    quantity: "",
    price: "",
    expiry_date: "",
  });

  useEffect(() => {

    fetchMedicines();

  }, []);

  // FETCH MEDICINES

  const fetchMedicines = async () => {

    try {

      setLoading(true);

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

      setMedicines(
        Array.isArray(response.data)
          ? response.data
          : []
      );

      setLoading(false);

    } catch (error) {

      setLoading(false);

      console.log(error);
    }
  };

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD / UPDATE

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("access_token");

      if (editingId) {

        await axiosInstance.put(
          `inventory/${editingId}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      } else {

        await axiosInstance.post(
          "inventory/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      toast.success(
        editingId
          ? "Medicine updated successfully."
          : "Medicine added successfully."
      );

      fetchMedicines();

      setFormData({
        name: "",
        manufacturer: "",
        batch_number: "",
        quantity: "",
        price: "",
        expiry_date: "",
      });

      setEditingId(null);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to save medicine."
      );
    }
  };

  // EDIT

  const handleEdit = (medicine) => {

    setEditingId(medicine.id);

    setFormData({
      name: medicine.name,
      manufacturer: medicine.manufacturer,
      batch_number: medicine.batch_number,
      quantity: medicine.quantity,
      price: medicine.price,
      expiry_date: medicine.expiry_date,
    });
  };

  // DELETE

  const handleDelete = async (id) => {

    try {

      const token =
        localStorage.getItem("access_token");

      await axiosInstance.delete(
        `inventory/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMedicines();

      toast.success(
        "Medicine deleted successfully."
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete medicine."
      );
    }
  };

  // STATUS

  const getMedicineStatus = (medicine) => {

    const today = new Date();

    const expiryDate =
      new Date(medicine.expiry_date);

    const difference =
      expiryDate - today;

    const daysRemaining =
      difference / (1000 * 60 * 60 * 24);

    if (daysRemaining < 0) {

      return {
        text: "Expired",
        color:
          "bg-red-100 text-red-700",
      };
    }

    if (daysRemaining < 30) {

      return {
        text: "Expiring Soon",
        color:
          "bg-amber-100 text-amber-700",
      };
    }

    if (medicine.quantity < 20) {

      return {
        text: "Low Stock",
        color:
          "bg-orange-100 text-orange-700",
      };
    }

    return {
      text: "In Stock",
      color:
        "bg-emerald-100 text-emerald-700",
    };
  };

  // EXPORT CSV

  const exportToCSV = () => {

    const headers = [
      "Name",
      "Manufacturer",
      "Batch",
      "Quantity",
      "Price",
      "Expiry Date",
      "Status",
    ];

    const rows = filteredMedicines.map(
      (medicine) => [

        medicine.name,

        medicine.manufacturer,

        medicine.batch_number,

        medicine.quantity,

        medicine.price,

        medicine.expiry_date,

        getMedicineStatus(medicine).text,
      ]
    );

    const csvContent = [

      headers.join(","),

      ...rows.map(
        (row) => row.join(",")
      ),
    ].join("\n");

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
      "inventory_report.csv"
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    toast.success(
      "Inventory exported successfully."
    );
  };

  // FILTER

  const filteredMedicines =
    medicines.filter((medicine) => {

      const matchesSearch =

        medicine.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        medicine.manufacturer
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const status =
        getMedicineStatus(medicine).text;

      if (filterStatus === "low-stock") {

        return (
          matchesSearch
          &&
          status === "Low Stock"
        );
      }

      if (filterStatus === "expiring") {

        return (
          matchesSearch
          &&
          status === "Expiring Soon"
        );
      }

      if (filterStatus === "expired") {

        return (
          matchesSearch
          &&
          status === "Expired"
        );
      }

      if (filterStatus === "in-stock") {

        return (
          matchesSearch
          &&
          status === "In Stock"
        );
      }

      return matchesSearch;
    });

  return (
    <PageTransition>
    <DashboardLayout>

      {/* TITLE */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">

          Inventory Management

        </h1>

        <p className="text-slate-500 mt-2 dark:text-white
        ">

          Monitor medicine stock,
          expiry tracking and inventory health.

        </p>

      </div>

      {/* FORM */}

      {!isViewer() && (

        <form
          onSubmit={handleSubmit}
          className="
          bg-white/90
          backdrop-blur-sm
          p-8
          rounded-[28px]
          border border-slate-200
          shadow-sm
          hover:shadow-xl
          transition-all duration-500
          mb-10
          "
        >

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-5
            "
          >

            <input
              type="text"
              name="name"
              placeholder="Medicine Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="
              w-full
              border border-slate-300
              bg-slate-50 dark:bg-slate-800
              focus:bg-white dark:focus:bg-slate-900
              focus:border-blue-500
              focus:ring-4 focus:ring-blue-100
              outline-none
              rounded-2xl
              px-4 py-3
              transition-all
              "
            />

            <input
              type="text"
              name="manufacturer"
              placeholder="Manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              required
              className="
              w-full
              border border-slate-300
              bg-slate-50 dark:bg-slate-800
              focus:bg-white dark:focus:bg-slate-900
              focus:border-blue-500
              focus:ring-4 focus:ring-blue-100
              outline-none
              rounded-2xl
              px-4 py-3
              transition-all
              "
            />

            <input
              type="text"
              name="batch_number"
              placeholder="Batch Number"
              value={formData.batch_number}
              onChange={handleChange}
              required
              className="
              w-full
              border border-slate-300
              bg-slate-50 dark:bg-slate-800
              focus:bg-white dark:focus:bg-slate-900
              focus:border-blue-500
              focus:ring-4 focus:ring-blue-100
              outline-none
              rounded-2xl
              px-4 py-3
              transition-all
              "
            />

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="
              w-full
              border border-slate-300
              bg-slate-50 dark:bg-slate-800
              focus:bg-white dark:focus:bg-slate-900
              focus:border-blue-500
              focus:ring-4 focus:ring-blue-100
              outline-none
              rounded-2xl
              px-4 py-3
              transition-all
              "
            />

            <input
              type="number"
              step="0.01"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="
              w-full
              border border-slate-300
              bg-slate-50 dark:bg-slate-800
              focus:bg-white dark:focus:bg-slate-900
              focus:border-blue-500
              focus:ring-4 focus:ring-blue-100
              outline-none
              rounded-2xl
              px-4 py-3
              transition-all
              "
            />

            <input
              type="date"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
              required
              className="
              w-full
              border border-slate-300
              bg-slate-50 dark:bg-slate-800
              focus:bg-white dark:focus:bg-slate-900
              focus:border-blue-500
              focus:ring-4 focus:ring-blue-100
              outline-none
              rounded-2xl
              px-4 py-3
              transition-all
              "
            />

          </div>

          <button
            type="submit"
            className="
            mt-6
            bg-slate-900
            hover:bg-slate-800
            active:scale-95
            transition-all duration-200
            text-white
            font-semibold
            px-6 py-3
            rounded-2xl
            shadow-sm
            hover:shadow-lg
            "
          >

            {editingId
              ? "Update Medicine"
              : "Add Medicine"}

          </button>

        </form>
      )}

      {/* TOP ACTIONS */}

      <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-5
        mb-8
        "
      >

        {/* EXPORT */}

        <button
          onClick={exportToCSV}
          className="
          bg-slate-900
          hover:bg-slate-800
          text-white
          px-6 py-3
          rounded-2xl
          transition-all duration-300
          shadow-sm
          hover:shadow-lg
          active:scale-95
          font-medium
          "
        >

          Export CSV

        </button>

        {/* SEARCH + FILTER */}

        <div
          className="
          flex
          flex-col
          md:flex-row
          gap-4
          bg-white/90
          backdrop-blur-sm
          p-5
          rounded-[24px]
          border border-slate-200
          shadow-sm
          "
        >

          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="
            w-full
            md:w-72
            border border-slate-300
            bg-slate-50 dark:bg-slate-800
            focus:bg-white dark:focus:bg-slate-900
            focus:border-blue-500
            focus:ring-4 focus:ring-blue-100
            outline-none
            rounded-2xl
            px-4 py-3
            transition-all
            "
          />

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value)
            }
            className="
            border border-slate-300
            bg-slate-50 dark:bg-slate-800
            focus:bg-white dark:focus:bg-slate-900
            focus:border-blue-500
            focus:ring-4 focus:ring-blue-100
            outline-none
            rounded-2xl
            px-4 py-3
            transition-all
            "
          >

            <option value="all">
              All Medicines
            </option>

            <option value="low-stock">
              Low Stock
            </option>

            <option value="expiring">
              Expiring Soon
            </option>

            <option value="expired">
              Expired
            </option>

            <option value="in-stock">
              In Stock
            </option>

          </select>

        </div>

      </div>

      {/* LOADING SKELETON */}

      {loading ? (

        <div
          className="
          bg-white/90
          backdrop-blur-sm
          rounded-[28px]
          border border-slate-200
          p-8
          shadow-sm
          animate-pulse
          "
        >

          <div className="space-y-5">

            {[1, 2, 3, 4, 5].map((item) => (

              <div
                key={item}
                className="
                h-16
                rounded-2xl
                bg-slate-200
                "
              />

            ))}

          </div>

        </div>

      ) : (

        /* TABLE */

        <div
          className="
          bg-white/90
          backdrop-blur-sm
          rounded-[28px]
          border border-slate-200
          overflow-hidden
          shadow-sm
          hover:shadow-xl
          transition-all duration-500
          "
        >

          <table className="w-full">

            <thead
              className="
              bg-slate-50 dark:bg-slate-800
              border-b border-slate-200
              text-slate-500 dark:text-slate-300
              uppercase
              tracking-wider
              text-sm
              "
            >

              <tr>

                <th className="px-6 py-5 text-left font-semibold">
                  Name
                </th>

                <th className="px-6 py-5 text-left font-semibold">
                  Manufacturer
                </th>

                <th className="px-6 py-5 text-left font-semibold">
                  Batch
                </th>

                <th className="px-6 py-5 text-left font-semibold">
                  Quantity
                </th>

                <th className="px-6 py-5 text-left font-semibold">
                  Price
                </th>

                <th className="px-6 py-5 text-left font-semibold">
                  Expiry
                </th>

                <th className="px-6 py-5 text-left font-semibold">
                  Status
                </th>

                <th className="px-6 py-5 text-left font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredMedicines.map((medicine) => (

                <tr
                  key={medicine.id}
                  className="
                  border-b border-slate-100
                  hover:bg-slate-50/80 dark:bg-slate-800
                  transition-all duration-300
                  "
                >

                  <td className="px-6 py-5 text-slate-700 dark:text-slate-200">
                    {medicine.name}
                  </td>

                  <td className="px-6 py-5 text-slate-700 dark:text-slate-200">
                    {medicine.manufacturer}
                  </td>

                  <td className="px-6 py-5 text-slate-700 dark:text-slate-200">
                    {medicine.batch_number}
                  </td>

                  <td className="px-6 py-5 text-slate-700 dark:text-slate-200 ">
                    {medicine.quantity}
                  </td>

                  <td className="px-6 py-5 text-slate-700 dark:text-slate-200">
                    ₹{medicine.price}
                  </td>

                  <td className="px-6 py-5 text-slate-700 dark:text-slate-200">
                    {medicine.expiry_date}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`
                      px-4 py-2
                      rounded-full
                      text-xs
                      font-semibold
                      tracking-wide
                      shadow-sm
                      ${getMedicineStatus(medicine).color}
                      `}
                    >

                      {getMedicineStatus(medicine).text}

                    </span>

                  </td>

                  <td className="px-6 py-5 flex gap-3">

                    {!isViewer() && (

                      <button
                        onClick={() =>
                          handleEdit(medicine)
                        }
                        className="
                        bg-slate-100
                        hover:bg-slate-200
                        text-slate-700 dark:text-slate-200
                        px-4 py-2
                        rounded-xl
                        transition-all duration-200
                        font-medium
                        "
                      >

                        Edit

                      </button>
                    )}

                    {isAdmin() && (

                      <button
                        onClick={() =>
                          handleDelete(medicine.id)
                        }
                        className="
                        bg-red-50
                        hover:bg-red-100
                        text-red-600
                        px-4 py-2
                        rounded-xl
                        transition-all duration-200
                        font-medium
                        "
                      >

                        Delete

                      </button>
                    )}

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </DashboardLayout>
    </PageTransition>
  );
}

export default InventoryPage;