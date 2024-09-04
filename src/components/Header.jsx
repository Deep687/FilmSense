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

  const headerClasses = isLoginPage
    ? "bg-gradient-to-br from-gray-900 to-black bg-opacity-80"
    : "bg-transparent";

  return (
    <header
      className={`relative z-10 p-1 xs:p-2 sm:p-2 md:p-2 lg:p-2 xl:p-2 flex justify-between items-center ${headerClasses}`}
    >
      <h1 className="p-4 xs:p-6 sm:p-6 md:p-8 lg:p-8 xl:p-8 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 font-sans">
        FilmSense
      </h1>
      {!isLoginPage && user && (
        <nav className="flex items-center p-4 xs:p-6 sm:p-6 md:p-8 lg:p-8 xl:p-8">
          <p className="text-white mr-2 text-xs xs:text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm truncate max-w-[80px] xs:max-w-[100px] sm:max-w-none">
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Hi,{" "}
            </span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500">
              {user.displayName || "Guest"}
            </span>
          </p>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs xs:text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm"
          >
            Sign Out
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
