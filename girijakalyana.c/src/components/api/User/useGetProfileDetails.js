import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import ProfileContext from "../../usecontext/ProfileContext";
import { toast } from "react-toastify";
import { get, put } from "../authHooks";
import TokenService from "../../token/tokenService";



  // your logic
   const useGetMemberDetails = (reg_No) => {

    return useQuery({
      queryKey: ["userDetails", reg_No], // Cache key
      queryFn: async () => {
        const response = await get(`/api/user/profile/${reg_No}`);
        if (response.success) {
          
          return response.data;
        } else {
          throw new Error(response.message || "Failed to fetch member details");
        }
      },
      enabled: !!reg_No,
    });
  };

  
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const registerNo = TokenService.getRegistrationNo();
  
  return useMutation({
    mutationFn: async (data) => {
      const response = await put(`/api/user/profile/${registerNo}`, data);
      if (!response.success) {
        throw new Error(response.message || "Failed to update profile");
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      // Invalidate both user details queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["userDetails", registerNo] });
      queryClient.invalidateQueries({ queryKey: ["memberDetails"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
      console.error("Update error:", error);
    }
  });
};
export default useGetMemberDetails;