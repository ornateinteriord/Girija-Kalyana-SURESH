// hooks/useUserProfileQuery.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { get, post, put } from "../authHooks";
import { toast } from "react-toastify";

export const getAllUserProfiles = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const response = await get("/api/admin/all-user-details");
      if (response.success) {
        return response.users;
      } else {
        throw new Error(response.message);
      }
    },
  });
};

export const UpgradeUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ regno, status, image_verification }) => {
      const response = await put(`/api/admin/upgrade-user/${regno}`, {
        status,
        image_verification,
      });
      return response;
    },
    onSuccess: (response) => {
      if (response?.success) {
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: ["profiles"] });
      } else {
        toast.error(response?.message);
      }
    },
    onError: (err) => {
      const errorMessage = err.response?.data?.message;
      toast.error(errorMessage);
    },
  });
};

export const UserResetPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ regno, password }) => {
      const response = await put(`/api/admin/reset-password/${regno}`, {
        password,
      });
      return response;
    },
    onSuccess: (response) => {
      if (response?.success) {
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: ["profiles"] });
      } else {
        toast.error(response?.message);
      }
    },
    onError: (err) => {
      const errorMessage = err.response?.data?.message;
      toast.error(errorMessage);
    },
  });
};

export const getAllAssistanceTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await get("/api/admin/all-Assistance-transactions");
      if (response.success) {
        return response.transactions;
      } else {
        throw new Error(response.message);
      }
    },
  });
};
export const useOnlineTransactions = () => {
  return useQuery({
    queryKey: ["online-transactions"],
    queryFn: async () => {
      const response = await get("/api/admin/online-transactions");

      if (!response.success) {
        throw new Error(
          response.message || "Failed to fetch online transactions"
        );
      }

      console.log("API response:", response);
      return response.data; // This should be your array of transactions
    },
  });
};

export const getAllNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await get("/api/admin/all-news");
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    },
  });
};


export const useAddNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const response = await post("/api/admin/add-news",formData);
      return response;
    },
    onSuccess: (response) => {
      if (response?.success) {
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: ["news"] });
      } else {
        toast.error(response?.message);
      }
    },
    onError: (err) => {
      const errorMessage = err.response?.data?.message;
      toast.error(errorMessage);
    },
  });
};
