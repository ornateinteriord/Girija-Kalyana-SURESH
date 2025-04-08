import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import TokenService from "../../token/tokenService";
import { post } from "../authHooks";

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      return await post("/api/auth/login", data);
    },
    onSuccess: (response) => {
      if (response?.success && response?.token) {
        TokenService.setToken(response.token);
        window.dispatchEvent(new Event("storage")); // For sync

        toast.success(response.message );

        const role = TokenService.getRole();
        switch (role) {
          case "FreeUser":
          case "PremiumUser":
          case "SilverUser":
            case "Assistance":
            
            navigate("/user/userDashboard");
            break;
          case "Admin":
            navigate("/admin/dashboard");
            break;
          default:
            console.error("Invalid role:", role);
            localStorage.clear();
            toast.error("Invalid user role");
        }
      } else {
        toast.error(response?.message || "Login failed");
        console.error("Login failed:", response?.message);
      }
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message || "Login failed. Please try again.";
      console.error("Login error:", message);
      toast.error(message);
    },
  });
};
