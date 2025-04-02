import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import TokenService from "../../token/tokenService";
import {post} from "../authHooks"


export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      return await post("/api/auth/login", data);
    },
    onSuccess: (response) => {
      if (response.success && response.token) {
        TokenService.setToken(response.token);

        window.dispatchEvent(new Event("storage")); // Sync storage updates

        toast.success(response.message);
        const role = TokenService.getRole();
        if (role === "FreeUser") {
          
          navigate("/user/userDashboard");
        } else if (role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          console.error("Invalid role:", role);
          localStorage.clear();
          toast.error("Invalid user role");
        }
      } else {
        console.error("Login failed:", response.message);
        toast.error(response.message);
      }
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      console.error("Login error:", errorMessage);
      toast.error(errorMessage);
    },
  });
};
