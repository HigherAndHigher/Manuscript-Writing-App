import { createContext, useState } from "react";

// initial state
const initialState = {
  user: {},
  isLoggedIn: false,
  plan: 0,
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [config, setConfig] = useState(initialState);

  const login = (user) => {
    setConfig({
      ...config,
      isLoggedIn: true,
      user: {
        id: user._id,
        username: user.username,
        password: user.password,
      },
    });
  };

  const logout = () => {
    setConfig({
      ...config,
      isLoggedIn: false,
      user: {},
    });
  };

  const chooseplan = (plan) => {
    setConfig({
      ...config,
      plan: plan,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...config,
        login,
        logout,
        chooseplan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
