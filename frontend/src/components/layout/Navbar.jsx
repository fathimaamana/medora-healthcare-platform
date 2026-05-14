import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {

  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">

      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <span className="font-medium">
          {user?.username}
        </span>

        <button
          onClick={logoutUser}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;