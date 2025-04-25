import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  CircularProgress
} from "@mui/material";
import { useGetInterestStatus } from "../../../api/User/useGetProfileDetails";
import { toast } from "react-toastify";
import { LoadingComponent } from "../../../../App";
// import { useGetSentInterests } from "../../../api/User/useGetProfileDetails";

const Sent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const { data: sentInterests, isLoading,isError, error } = useGetInterestStatus({
    page: currentPage,
    limit: itemsPerPage
  });

   useEffect(() => {
      if (isError) {
        toast.error(error.message);
      }
    }, [isError, error]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Profiles You've Expressed Interest In
      </Typography>

      {sentInterests?.data?.length === 0 ? (
        <Typography>No profiles found.</Typography>
      ) : (
        <>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {sentInterests?.data?.map(interest => (
              <InterestCard 
                key={interest._id}
                profile={interest.recipient}
                interestDate={interest.createdAt}
              />
            ))}
          </Box>

          {sentInterests?.totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={sentInterests?.totalPages}
                page={currentPage}
                onChange={(e, page) => setCurrentPage(page)}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

const InterestCard = ({ profile, interestDate }) => (
  <Card sx={{ width: 250, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
    <CardMedia
      component="img"
      height="200"
      image={profile.profilePhoto || "/default-profile.jpg"}
      alt={`${profile.first_name} ${profile.last_name}`}
    />
    <CardContent>
      <Typography gutterBottom variant="h6">
        {profile.first_name || 'First'} {profile.last_name || 'Last'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Expressed on: {new Date(interestDate).toLocaleDateString()}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
        <Typography variant="body2">Age: {profile.age || 'N/A'} yrs</Typography>
        <Typography variant="body2">Height: {profile.height || 'N/A'}</Typography>
        <Typography variant="body2">Occupation: {profile.occupation || 'N/A'}</Typography>
      </Box>
    </CardContent>
    {isLoading && <LoadingComponent/>}
  </Card>
);

export default Sent;
