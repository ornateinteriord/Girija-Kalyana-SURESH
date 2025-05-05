import React, { useEffect, useState } from 'react';
import profileimg from '../../../assets/profile.jpg';
import { Box, Button, CardMedia, Chip, CircularProgress, Dialog, DialogContent, Tab, Tabs, Typography } from '@mui/material';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { FaHeart } from 'react-icons/fa';
import { useExpressInterest } from '../../api/User/useGetProfileDetails';
import { get } from '../../api/authHooks';

const ProfileDialog = ({
  openDialog,
  setOpenDialog,
  selectedUser,
  currentTab,
  setCurrentTab,
  loggedInUserId,
  isLoading,
  renderDialogContent,
}) => {
  const tabLabels = ['About', 'Family', 'Education', 'LifeStyle', 'Preference'];
  const [localInterestStatus, setLocalInterestStatus] = useState('none');
  const [isStatusLoading, setIsStatusLoading] = useState(false);

  // Fetch interest status
  const fetchStatus = async () => {
    if (!loggedInUserId || !selectedUser?.registration_no) {
      console.error('Missing registration numbers:', { loggedInUserId, recipientRegistrationNo: selectedUser?.registration_no });
      setLocalInterestStatus('none');
      setIsStatusLoading(false);
      return;
    }

    setIsStatusLoading(true);
    try {
      const data = await get(`/api/user/interest/status/${loggedInUserId}/${selectedUser.registration_no}`); 
      setLocalInterestStatus(data?.status);
    } catch (error) {
      console.error('Error fetching interest status:', error);
    } finally {
      setIsStatusLoading(false);
    }
  };

  // Fetch status when dialog opens or dependencies change
  useEffect(() => {
    if (openDialog && loggedInUserId && selectedUser?.registration_no) {
      fetchStatus();
    }
  }, [openDialog, loggedInUserId, selectedUser?.registration_no]);

  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const getButtonState = () => {
    if (isStatusLoading) {
      return {
        color: 'primary',
        text: 'Loading...',
        disabled: true,
      };
    }
    switch (localInterestStatus) {
      case 'pending':
        return {
          color: 'warning',
          text: 'Request Sent',
          disabled: true,
        };
      case 'accepted':
        return {
          color: 'success',
          text: 'Connected',
          disabled: true,
        };
      case 'rejected':
        return {
          color: 'error',
          text: 'Rejected',
          disabled: true,
        };
      default:
        return {
          color: 'primary',
          text: 'Express Interest',
          disabled: false,
        };
    }
  };

  const buttonState = getButtonState();

  const expressInterestMutation = useExpressInterest();

  const handleSendInterest = () => {
    expressInterestMutation.mutate(
      {
        senderRegistrationNo: loggedInUserId,
        recipientRegistrationNo: selectedUser.registration_no,
        message: "I'd like to connect with you!",
      },
      {
        onSuccess: () => {
          setLocalInterestStatus('pending');
          fetchStatus(); // Refetch to confirm backend status
        },
        onError: (error) => {
          console.error('Error expressing interest:', error);
          fetchStatus(); // Refetch to revert to backend status
        },
      }
    );
  };

  return (
    <Dialog maxWidth="lg" open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
      <DialogContent sx={{ p: 0, backgroundColor: '#f5f5f5' }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, p: 3 }}>
          {/* Left side - Profile image and basic info */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CardMedia
              component="img"
              image={profileimg}
              alt="Profile"
              sx={{ borderRadius: 2, height: 280, width: '100%', objectFit: 'cover' }}
            />
            <Box textAlign="center">
              <Typography variant="h5" fontWeight="bold">
                {selectedUser?.first_name} {selectedUser?.last_name}
              </Typography>
              <Typography color="text.secondary">
                {selectedUser?.age || calculateAge(selectedUser?.date_of_birth)} yrs, {selectedUser?.height}
              </Typography>
              <Chip
                label={selectedUser?.user_role}
                color={selectedUser?.user_role === 'PremiumUser' ? 'primary' : 'default'}
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
          </Box>

          {/* Right side - Tabbed content */}
          <Box sx={{ flex: 2, minWidth: 0 }}>
            <Tabs
              value={currentTab}
              onChange={(e, val) => setCurrentTab(val)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mb: 2 }}
            >
              {tabLabels.map((label, index) => (
                <Tab key={index} label={label} />
              ))}
            </Tabs>
            <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 2, boxShadow: 1, minHeight: 300 }}>
              {renderDialogContent()}
            </Box>
          </Box>
        </Box>

        {/* Footer with action buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            backgroundColor: 'white',
            borderTop: '1px solid #eee',
          }}
        >
          <Box display="flex" alignItems="center">
            <RiVerifiedBadgeFill style={{ fontSize: 24, color: '#1976d2', marginRight: 8 }} />
            <Typography variant="body1" fontWeight="bold">
              Verified Profile
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color={buttonState.color}
              onClick={!buttonState.disabled ? handleSendInterest : undefined}
              disabled={isLoading}
              startIcon={isLoading || isStatusLoading ? <CircularProgress size={20} /> : <FaHeart />}
            >
              {buttonState.text}
            </Button>
            <Button variant="outlined" onClick={() => setOpenDialog(false)}>
              Close
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;