import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";

function Home() {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center flex-col mt-12 ">
      <h1 className="font-semibold text-2xl mb-24">
        {loggedIn ? <span>"Welcome "</span> : <span> "Please Log In"</span>}
      </h1>
      {loggedIn ? (
        <div>
          {" "}
          <button
            onClick={() => navigate("/delete")}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-800 text-white font-normal py-1 px-2 rounded transition-colors"
          >
            Delelte User
          </button>
        </div>
      ) : (
        <div className="flex  gap-4 ">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-800 text-white font-normal py-1 px-2 rounded transition-colors"
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
