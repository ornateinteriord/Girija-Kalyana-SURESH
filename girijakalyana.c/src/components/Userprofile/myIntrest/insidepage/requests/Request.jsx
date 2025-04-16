import React, { useState } from "react";
import {
  Box,
  Typography,
  Pagination,
  CircularProgress
} from "@mui/material";
import {
  useGetReceivedInterests,
  useUpdateInterestStatus
} from "../../../../api/User/useGetProfileDetails";
import TokenService from "../../../../token/tokenService";
import toast from "react-hot-toast";
import InterestCard from "../../../intrestCard/IntrestCard";

const Requests = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const recipientRegistrationNo = TokenService.getRegistrationNo();
  const {
    data: receivedInterests = [],
    isLoading,
    isError,
    refetch
  } = useGetReceivedInterests(recipientRegistrationNo);

  const { mutate: updateInterest } = useUpdateInterestStatus();

  const handleInterestResponse = (senderRefNo, recipientRefNo, isAccepted) => {
    updateInterest(
      {
        senderRegistrationNo: senderRefNo,
        recipientRegistrationNo,
        status: isAccepted ? "accepted" : "rejected"
      },
      {
        onSuccess: () => {
          toast.success(`Request ${isAccepted ? "accepted" : "rejected"} successfully`);
          refetch();
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Failed to update request");
        }
      }
    );
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = receivedInterests.slice(indexOfFirst, indexOfLast);
  const pageCount = Math.ceil(receivedInterests.length / itemsPerPage);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ padding: 3, textAlign: "center" }}>
        <Typography color="error">Error loading requests</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: currentUsers.length > 0 ? "flex-start" : "center",
          marginTop: 1
        }}
      >
        {currentUsers.length === 0 ? (
          <Typography variant="h6">No pending requests found</Typography>
        ) : (
          currentUsers.map((user) => (
            <InterestCard
              key={user._id}
              senderRefNo={user.senderRegistrationNo}
              recipientRefNo={recipientRegistrationNo}
              handleResponse={handleInterestResponse}
            />
          ))
        )}
      </Box>

      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            shape="rounded"
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default Requests;
