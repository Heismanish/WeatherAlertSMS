import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navigation() {
  const { loggedIn } = useAuth();
  return (
    <div className=" flex px-2 py-2 justify-between">
      {" "}
      <h1 className="text-2xl font-semibold  ">
        Nami:
        <span className="bg-gradient-to-r from-gray-200 dark:to-blue-600 to-blue-300 text-transparent bg-clip-text">
          Weather Alert
        </span>
      </h1>
      {!loggedIn ? (
        <div className="flex gap-4">
          <Link
            to={"/signup"}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-800 text-white font-normal py-1 px-2 rounded transition-colors"
          >
            Register
          </Link>
          <Link
            to={"/login"}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-800 text-white font-normal py-1 px-2 rounded transition-colors"
          >
            Login
          </Link>
        </div>
      ) : (
        <>
          {" "}
          <Link
            to={"/delete"}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-800 text-white font-normal py-1 px-2 rounded transition-colors"
          >
            DeleteUser
          </Link>
        </>
      )}
    </div>
  );
}

export default Navigation;
