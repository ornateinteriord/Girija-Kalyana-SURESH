import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { get, post, put } from "../authHooks";
import TokenService from "../../token/tokenService";

// Get all user profiles
export const useGetAllUsersProfiles = () => {
  return useQuery({
    queryKey: ["allUsersProfiles"],
    queryFn: async () => {
      const response = await get("/api/user/all-users-profiles");
      if (response?.success) {
        return response.users || [];
      } else {
        throw new Error(
          response?.message || "Failed to fetch all users profiles"
        );
      }
    },
  });
};

// Get single member details
export const useGetMemberDetails = (reg_No) => {
  return useQuery({
    queryKey: ["userDetails", reg_No],
    queryFn: async () => {
      const response = await get(`/api/user/profile/${reg_No}`);
      if (response?.success) {
        return response.data;
      } else {
        throw new Error(response?.message || "Failed to fetch member details");
      }
    },
    enabled: !!reg_No,
  });
};

// Update user profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const reg_No = TokenService.getRegistrationNo();

  return useMutation({
    mutationFn: async (data) => {
      return await put(`/api/user/update-profile/${reg_No}`, data);
    },
    onSuccess: (response) => {
      if (response?.success) {
        toast.success(response.message)
        queryClient.invalidateQueries({ queryKey: ["userDetails", reg_No] });
      }
    },
    onError: (err) => {
      const errorMessage = err.response?.data?.message;
      toast.error(errorMessage);
    },
  });
};

// Express interest mutation
export const useExpressInterest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      senderRegistrationNo,
      recipientRegistrationNo,
      message,
    }) => {
      const { data } = await post("/api/user/interest", {
        senderRegistrationNo,
        recipientRegistrationNo,
        message,
      });
      return data;
    },
    onSuccess: () => {
      toast.success('Interest expressed successfully!');
      queryClient.invalidateQueries(['interestStatus','get-interes']);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || error.message;

      if (errorMessage.includes('already expressed') || errorMessage.includes('Interest already exists')) {
        toast.info('You have already expressed interest to this user.');
      } else {
        toast.error('Failed to express interest. Please try again.');
      }
    }
  });
};

export const useGetReceivedInterests = (recipientRegistrationNo) => {
  return useQuery({
    queryKey: ["receivedInterests", recipientRegistrationNo],
    queryFn: async () => {
      const response = await get(
        `/api/user/interest/received/${recipientRegistrationNo}`
      );

      return response;
    },
    enabled: !!recipientRegistrationNo,
    staleTime: 1000 * 60 * 5,
  });
};

// Get interest status query
// api/User/useGetProfileDetails.js
export const useGetSentInterests = (senderRegistrationNo) => {
  return useSuspenseQuery({
    queryKey: ["sentInterests", senderRegistrationNo],
    queryFn: async () => {
      const data = await get(`/api/user/interest/sent/${senderRegistrationNo}`);
      return data || { data: [], totalPages: 0 };
    },
  });
};

export const useUpdateInterestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      senderRegistrationNo,
      recipientRegistrationNo,
      status,
    }) => {
      const { data } = await put(`/api/user/interest/${senderRegistrationNo}`, {
        recipientRegistrationNo,
        status,
      });
      return data;
    },
    onSuccess: () => {
      toast.success('Interest updated successfully!');
      queryClient.invalidateQueries(['interestStatus']);
      queryClient.invalidateQueries(['interests']);
    },
    onError: (error) => {
      toast.error('Failed to update interest. Please try again.');
    }
  });
};

export const useGetAcceptedInterests = (recipientRegistrationNo) => {
  return useQuery({
    queryKey: ["acceptedInterests", recipientRegistrationNo],
    queryFn: async () => {
      const response = await get(`/api/user/interest/accepted/${recipientRegistrationNo}`);
      return response;
    },
    enabled: !!recipientRegistrationNo,
    staleTime: 1000 * 60 * 5,
    onError: (error) => {
      toast.error(error?.message || "Failed to fetch accepted interests.");
    }
  });
};
