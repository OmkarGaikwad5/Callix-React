import axios from "axios";
import httpStatus from "http-status";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

// ✅ Setup API base client
const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1/users`,
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const router = useNavigate();

  // ✅ Register User
  const handleRegister = async (name, username, password) => {
    try {
      const response = await client.post("/register", {
        name,
        username,
        password,
      });

      if (response.status === httpStatus.CREATED) {
        return response.data.message;
      }
    } catch (err) {
      throw err;
    }
  };

  // ✅ Login User
  const handleLogin = async (username, password) => {
    try {
      const response = await client.post("/login", {
        username,
        password,
      });

      if (response.status === httpStatus.OK) {
        const token = response.data.token;
        localStorage.setItem("token", token);

        const userResponse = await client.get("/get_user_from_token", {
          params: { token },
        });

        setUserData(userResponse.data.user);
        router("/home");
      }
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  // ✅ Fetch User History
  const getHistoryOfUser = async () => {
    try {
      const response = await client.get("/get_all_activity", {
        params: { token: localStorage.getItem("token") },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  // ✅ Add to History
  const addToUserHistory = async (meetingCode) => {
    try {
      const response = await client.post("/add_to_activity", {
        token: localStorage.getItem("token"),
        meeting_code: meetingCode,
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  // ✅ Clear History
  const clearHistoryOfUser = async () => {
    try {
      const response = await client.delete("/clear_activity", {
        data: { token: localStorage.getItem("token") },
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    router("/");
  };

  // ✅ Auto-fetch user on refresh
  useEffect(() => {
    const fetchUserFromToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await client.get("/get_user_from_token", {
            params: { token },
          });
          setUserData(response.data.user);
        } catch (err) {
          console.error("Failed to fetch user from token:", err);
          localStorage.removeItem("token");
        }
      }
    };

    fetchUserFromToken();
  }, []);

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
    handleLogout,
    getHistoryOfUser,
    addToUserHistory,
    clearHistoryOfUser,
  };

  return (
    <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
  );
};
