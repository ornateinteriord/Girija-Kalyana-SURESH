// hooks/useUserProfileQuery.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { get, put } from "../authHooks";
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
    mutationFn: async ({ regno, status }) => {
        const response = await put(`/api/admin/upgrade-user/${regno}`, {
          status
        });
        return response;
    },
    onSuccess: (response) => {
      if(response?.success){
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
          password
        });
        return response;
    },
    onSuccess: (response) => {
      if(response?.success){
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

export const getAllAssistanceTransactions =()=>{
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
}
