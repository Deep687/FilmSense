import { useRef, useState, useEffect } from "react";
import { validData } from "../utils/Valid";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, selectUser } from "../utils/userSlice";

const LogPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate("/browse");
    }
  }, [user, navigate]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = validData(
      isLogin,
      name.current ? name.current.value : "",
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    if (message) return;

    try {
      if (!isLogin) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const user = userCredential.user;

        // Update the user's display name
        await updateProfile(user, {
          displayName: name.current.value,
        });

        // Dispatch user data to Redux store
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: name.current.value,
          })
        );

        console.log("User signed up:", user);
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const user = userCredential.user;

        // Dispatch user data to Redux store
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );

        console.log("User signed in:", user);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setErrorMessage(error.code + ": " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black font-sans text-gray-300">
      {/* Main content */}
      <div className="flex-grow flex items-center justify-center px-2 sm:px-4 lg:px-6">
        <div className="w-full max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white text-center">
            {isLogin ? "Welcome Back" : "Join FilmSense"}
          </h2>
          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="relative">
                <input
                  type="text"
                  ref={name}
                  className="w-full px-3 sm:px-4 pt-5 pb-2 text-xs sm:text-sm md:text-base bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 peer"
                  id="name"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute text-xs sm:text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 sm:left-4
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-500"
                >
                  Full Name
                </label>
              </div>
            )}
            <div className="relative">
              <input
                type="email"
                ref={email}
                className="w-full px-3 sm:px-4 pt-5 pb-2 text-xs sm:text-sm md:text-base bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 peer"
                id="email"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute text-xs sm:text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 sm:left-4
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-500"
              >
                Email Address
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                ref={password}
                className="w-full px-3 sm:px-4 pt-5 pb-2 text-xs sm:text-sm md:text-base bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 peer"
                id="password"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-xs sm:text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 sm:left-4
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-500"
              >
                Password
              </label>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-xs sm:text-sm font-medium">
                {errorMessage}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 sm:py-3 rounded-lg hover:from-red-600 hover:to-pink-600 transition duration-300 font-bold shadow-lg text-xs sm:text-sm md:text-base"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
          <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-center">
            <span className="text-gray-400">
              {isLogin ? "New to FilmSense? " : "Already have an account? "}
            </span>
            <button
              onClick={toggleForm}
              className="text-red-400 hover:text-red-300 font-semibold transition duration-300"
            >
              {isLogin ? "Create an account" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogPage;
