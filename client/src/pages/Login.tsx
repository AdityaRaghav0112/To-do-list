import { useState, ChangeEvent, FormEvent } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { authAPI } from "../utils/api";
import { useNavigate } from "react-router-dom";

// ----------------------
// Types
// ----------------------
interface LoginForm {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  user?: any;
  message?: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  // Handle input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data: LoginResponse = await authAPI.login(formData);

      if (data.success && data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage("Success! Logged in successfully.");

        setFormData({ username: "", password: "" });

        // To trigger header update
        window.dispatchEvent(new Event("storage"));

        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="username"
              placeholder="Username or Email"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all"
            />

            {/* Toggle Password */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Message Box */}
          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.includes("Success")
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="ml-2 text-orange-600 hover:text-orange-700 font-semibold"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center mb-2">
            Demo Credentials:
          </p>
          <p className="text-xs text-gray-500 text-center">
            Username: demo
            <br />
            Password: demo123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
