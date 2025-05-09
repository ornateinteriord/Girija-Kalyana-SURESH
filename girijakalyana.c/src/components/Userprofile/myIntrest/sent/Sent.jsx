import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Pagination,
} from "@mui/material";
import { toast } from "react-toastify";
import { LoadingComponent } from "../../../../App";
import TokenService from "../../../token/tokenService";
import { useGetSentInterests } from "../../../api/User/useGetProfileDetails";

const Sent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const currentUserRegistrationNo = TokenService.getRegistrationNo();

  const { 
    data: sentInterests = { data: [], totalPages: 0, totalCount: 0 }, 
    isLoading, 
    isError, 
    error 
  } = useGetSentInterests(currentUserRegistrationNo);


  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

 
  const paginatedInterests = sentInterests.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = sentInterests.totalPages || Math.ceil(sentInterests.data.length / itemsPerPage);
  

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Sent Interest Requests
      </Typography>

      {isLoading ? (
        <LoadingComponent />
      ) : sentInterests.data.length === 0 ? (
        <Typography>You haven't sent any interest requests.</Typography>
      ) : (
        <>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {paginatedInterests.map(interest => (
              <InterestCard 
                key={interest._id}
                profile={interest.recipient}
                interestDate={interest.createdAt}
                status={interest.status}
              />
            ))}
          </Box>

          {totalPages > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => setCurrentPage(page)}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

const InterestCard = ({ profile, interestDate, status }) => (
  <Card sx={{ 
    width: 250, 
    transition: 'transform 0.2s', 
    '&:hover': { transform: 'scale(1.02)' },
    position: 'relative'
  }}>
    <Box sx={{
      position: 'absolute',
      top: 8,
      right: 8,
      bgcolor: status === 'pending' ? 'warning.main' : status === 'accepted' ? 'success.main' : 'error.main',
      color: 'white',
      px: 1,
      borderRadius: 1,
      fontSize: '0.75rem'
    }}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Box>
    
    <CardMedia
      component="img"
      height="200"
      image={profile?.profilePhoto || "/default-profile.jpg"}
      alt={`${profile?.first_name} ${profile?.last_name}`}
    />
    <CardContent>
      <Typography gutterBottom variant="h6">
        {profile?.first_name || 'First'} {profile?.last_name || 'Last'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Expressed on: {new Date(interestDate).toLocaleDateString()}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
        <Typography variant="body2">Age: {profile?.age || 'N/A'} yrs</Typography>
        <Typography variant="body2">Height: {profile?.height || 'N/A'}</Typography>
        <Typography variant="body2">Occupation: {profile?.occupation || 'N/A'}</Typography>
      </Box>
    </CardContent>
  </Card>
);

export default Sent;