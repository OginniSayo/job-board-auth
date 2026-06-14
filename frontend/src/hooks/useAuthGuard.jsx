import { useEffect } from "react";
import { useNavigate } from "react-router";

const useAuthGuard = (name) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      navigate("/login");
      return;
    }

    if (name && user.name.toLowerCase() !== name.toLowerCase()) {
      navigate("/not-found");
    }
  }, [name]);
};

export { useAuthGuard };
