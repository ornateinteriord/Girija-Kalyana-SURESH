// hooks/useUserProfileQuery.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUserProfileQuery = (registrationNo) => {
  return useQuery({
    queryKey: ["userProfile", registrationNo],
    queryFn: async () => {
      const response = await axios.get(`/api/profile/${registrationNo}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    },
    enabled: !!registrationNo,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: false,
  });
};