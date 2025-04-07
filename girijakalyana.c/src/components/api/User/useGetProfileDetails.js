import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import ProfileContext from "../../usecontext/ProfileContext";
import { toast } from "react-toastify";
import { get, put } from "../authHooks";
import TokenService from "../../token/tokenService";

  // your logic
  export const useGetMemberDetails = (reg_No) => {

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
    const reg_No = TokenService.getRegistrationNo(); 
    
    return useMutation({
      mutationFn: async (data) => {
        // Calls PUT /api/user/profile/:registerNo
        return await put(`/api/user/update-profile/${reg_No}`, data);
        
      },
      onSuccess: (response) => {
        if(response.success){
          toast.success(response.message);
          queryClient.invalidateQueries({ queryKey: ["userDetails", reg_No] });
        }else{
          console.error(response.message)
        }
       
      
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  };
