import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useGetMemberDetails } from "../../api/User/useGetProfileDetails";
import profileimg from "../../../assets/profile.jpg";
import { LoadingComponent } from "../../../App";
import { toast } from "react-toastify";

const InterestCard = ({ senderRefNo, recipientRefNo, handleResponse }) => {
  const {
    data: senderDetails,
    isLoading,
    isError,
    error
  } = useGetMemberDetails(senderRefNo);

   useEffect(() => {
     if (isError) {
       toast.error(error.message);
     }
   }, [isError, error]);

  return (
    <Card
      sx={{
        width: 270,
        borderRadius: 1,
        boxShadow: 3,
        textAlign: "center",
        position: "relative",
        background: "#fff", // white background
        color: "#000", // black text
      }}
    >
      <CardMedia
        component="img"
        height="200px"
        image={profileimg}
        alt="user-dp"
        sx={{ borderRadius: "12px", padding: "50px 50px 0" }}
      />
      <CardContent>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h6" fontWeight="bold">
            {senderDetails?.first_name} {senderDetails?.last_name}
          </Typography>
          <Typography fontWeight={550}>
            {senderDetails?.address || "N/A"}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 0,
          }}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="body1" fontWeight="bold">
              {senderDetails?.age || "N/A"}
            </Typography>
            <Typography variant="caption">Age</Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="body1" fontWeight="bold">
              {senderDetails?.height || "N/A"}
            </Typography>
            <Typography variant="caption">Height</Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="body1" fontWeight="bold">
              {senderDetails?.registration_no}
            </Typography>
            <Typography variant="caption">RegNo</Typography>
          </Box>
        </Box>
        <Box display={"flex"} gap={1} mt={2}>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              background: "#fff",
              color: "red",
              fontWeight: "bold",
              borderColor: "red",
            }}
            onClick={() => handleResponse(senderRefNo, recipientRefNo, false)}
          >
            Reject
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{
              background: "#000",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                background: "#333",
              },
            }}
            onClick={() => handleResponse(senderRefNo, recipientRefNo, true)}
          >
            Accept
          </Button>
        </Box>
      </CardContent>
      {isLoading && <LoadingComponent/>}
    </Card>
  );
};

export default InterestCard;
