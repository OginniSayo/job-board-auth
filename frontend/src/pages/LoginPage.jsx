import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Welcome back, ${user.name}!`, {
        duration: 5000,
        icon: "👋",
      });

      const lowerCaseName = user.name.toLowerCase();
      navigate(`/jobs/${lowerCaseName}`);
    } catch (error) {
      console.log("Error logging in: ", error);
      if (error.response?.status === 429) {
        toast.error(
          error.response?.data?.message || "Too many attempts, slow down!",
          {
            duration: 4000,
            icon: "💀",
          }
        );
      }
      if (error.response?.status === 401) {
        toast.error(
          error.response?.data?.message ||
            "Invalid credentials. Please try again."
        );
      } else {
        toast.error(error.response?.data?.message || "Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-primary mb-6 rounded-full py-4">
            <ArrowLeftIcon className="size-5" />
            Back to Home
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-5">Login</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label mb-3" htmlFor="email">
                    <span className="label-text text-lg text-base-content">
                      Email
                    </span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    className="input w-full rounded-xl text-base-content/90"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-control mb-8">
                  <label className="label mb-3" htmlFor="password">
                    <span className="label-text text-lg text-base-content">
                      Password
                    </span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="input w-full rounded-xl text-base-content/90"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>

              <p className="text-center mt-4 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
