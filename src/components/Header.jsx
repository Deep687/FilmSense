import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import appStore from "../utils/appStore";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        appStore.dispatch(addUser({ uid, displayName, email }));
        navigate("/browse");
      } else {
        appStore.dispatch(removeUser());
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="relative z-10 p-4 flex justify-between items-center bg-gradient-to-br from-gray-900 to-black bg-opacity-80">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 font-sans">
        FilmSense
      </h1>
      {!isLoginPage && user && (
        <nav className="flex items-center">
          <p className="text-white mr-4 text-sm md:text-base">
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Hello,{" "}
            </span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500">
              {user.displayName || "Guest"}
            </span>
            <span className="text-yellow-400">!</span>
          </p>

          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm md:text-base"
          >
            Sign Out
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
