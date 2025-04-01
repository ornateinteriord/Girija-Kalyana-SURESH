import React, { useState } from 'react';
import './Navbar.scss';
import {
  Button,
  Dialog,
  TextField,
  Typography,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLoginMutation } from '../api/Auth';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openAdminDialog, setOpenAdminDialog] = useState(false);
  const [enterUsername, setEnterUsername] = useState('');
  const [enterPassword, setEnterPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  });
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { mutate: login, isPending: isLoginPending } = useLoginMutation();

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   login(loginData, {
  //     onSuccess: (data) => {
  //       toast.success('Login successful!');
  //       handleClose();
  //       // Navigate based on user role or other criteria
  //       navigate('/user');
  //     },
  //     onError: (error) => {
  //       toast.error(error.response?.data?.message || 'Login failed');
  //     }
  //   });
  // };
  const handleLogin = () => {
    e.preventDefault();
    mutate(loginData);
  };

  const handleOpenAdminDialog = () => setOpenAdminDialog(true);
  const handleCloseAdminDialog = () => setOpenAdminDialog(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleToggleForm = () => setIsRegister((prev) => !prev);

  const handleOpenForgotPassword = () => setOpenForgotPassword(true);
  const handleCloseForgotPassword = () => {
    setOpenForgotPassword(false);
    setOtpSent(false);
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="navbar-main-container">
      <div className="navbar-container">
        <div className="navbar">
          <h3>Girija❤️Kalyana</h3>
          <div className="menu">
            <ul>
              <li>
                <Link className="link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="link" to="/service">
                  Service
                </Link>
              </li>
              <li>
                <Link className="link" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="link" to="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="link" to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <Typography>
            {/* Simplified for now - you can add auth status checks later */}
            <Button
              variant="contained"
              size="large"
              onClick={handleOpen}
              style={{
                backgroundColor: 'black',
                marginRight: '25px',
                width: '150px',
                color: '#fff',
                fontWeight: 700,
                height: '42px',
                textTransform: 'capitalize',
              }}
            >
              Login
            </Button>
            {/* <Button
              variant="contained"
              size="large"
              onClick={handleOpenAdminDialog}
              style={{
                backgroundColor: 'black',
                marginRight: '25px',
                width: '150px',
                color: '#fff',
                fontWeight: 700,
                height: '42px',
                textTransform: 'capitalize',
              }}
            >
              Admin
            </Button> */}
          </Typography>
        </div>
      </div>

      {/* Login/Register Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            padding: '20px',
            maxWidth: '600px',
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" textAlign="center" fontWeight={700} color="#34495e" mt={1} mb={1}>
            {isRegister ? 'Create Your Account' : 'Login'}
          </Typography>
          {isRegister ? (
            <form style={{ width: '100%' }}>
              <Box display="flex" gap={2} flexWrap="wrap" marginBottom={1.5}>
                <TextField
                  style={{ flex: 1 }}
                  label="First Name"
                  name="firstName"
                  value={registerData.firstName}
                  onChange={handleChangeRegister}
                  variant="outlined"
                  required
                />
                <TextField
                  style={{ flex: 1 }}
                  label="Last Name"
                  name="lastName"
                  value={registerData.lastName}
                  onChange={handleChangeRegister}
                  variant="outlined"
                  required
                />
              </Box>
              <Box display="flex" gap={1} flexWrap="wrap" marginBottom={0}>
                <FormControl style={{ flex: 1 }}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={registerData.gender}
                    onChange={handleChangeRegister}
                    required
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  style={{ flex: 1 }}
                  label="Date of Birth"
                  name="dob"
                  value={registerData.dob}
                  onChange={handleChangeRegister}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile"
                  value={registerData.mobile}
                  onChange={handleChangeRegister}
                  variant="outlined"
                  margin="normal"
                  required
                />
              </Box>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={registerData.email}
                onChange={handleChangeRegister}
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={registerData.password}
                onChange={handleChangeRegister}
                type="password"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleChangeRegister}
                type="password"
                variant="outlined"
                margin="normal"
                required
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  background: '#34495e',
                  width: '50%',
                  display: 'flex',
                  justifySelf: 'center',
                  marginBottom: '15px',
                  marginTop: '15px',
                }}
              >
                Create Account
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin} style={{ width: '100%', height: '90%', padding: '40px 20px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <TextField
                sx={{ width: '400px' }}
                label="Enter Username"
                name="username"
                value={loginData.username}
                onChange={handleChangeLogin}
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                sx={{ width: '400px', marginBottom: '20px' }}
                label="Enter Password"
                name="password"
                value={loginData.password}
                onChange={handleChangeLogin}
                type="password"
                variant="outlined"
                margin="normal"
                required
              />
              <Typography sx={{ color: '#1976d2', cursor: 'pointer' }} mb={1.5} onClick={handleOpenForgotPassword}>
                Forgot Password?
              </Typography>
              <Button
                variant="contained"
                type="submit"
                disabled={isLoginPending}
                sx={{
                  width: '250px',
                  background: '#34495e',
                }}
              >
                {isLoginPending ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>
            </form>
          )}
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ cursor: 'pointer', color: '#1976d2', marginBottom: '10px' }}
            onClick={handleToggleForm}
          >
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </Typography>
        </Box>
      </Dialog>

      {/* Admin Login Dialog */}
      {/* <Dialog
        open={openAdminDialog}
        onClose={handleCloseAdminDialog}
        sx={{
          '& .MuiDialog-paper': {
            width: '350px',
            height: '430px',
            background: '#fff',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            textAlign: 'center',
            marginTop: '70px',
          },
        }}
      >
        <Box
          sx={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
            marginBottom: '10px',
          }}
        >
          <img
            src="src/assets/profile.jpg"
            alt="Admin Profile"
            style={{ width: '100%', height: '100%' }}
          />
        </Box>

        <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold', color: 'black' }}>
          Admin Login
        </Typography>

        <TextField
          placeholder="Enter username"
          variant="outlined"
          margin="dense"
          value={enterUsername}
          onChange={(e) => setEnterUsername(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
            style: { color: 'black', marginBottom: '18px', fontWeight: 700, borderRadius: '13px' },
          }}
          required
        />

        <TextField
          placeholder="Enter password"
          variant="outlined"
          type="password"
          value={enterPassword}
          onChange={(e) => setEnterPassword(e.target.value)}
          margin="dense"
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
            style: { color: 'black', marginBottom: '15px', borderRadius: '13px', fontWeight: 700 },
          }}
          required
        />

        <Typography sx={{ color: 'black', cursor: 'pointer' }} onClick={handleOpenForgotPassword}>
          Forgot Password?
        </Typography>
        <Typography style={{ display: 'flex', alignItems: 'center', justifySelf: 'flex-end', gap: '6px' }}>
          <Button
            variant="outlined"
            onClick={handleLogin}
            sx={{
              marginTop: '20px',
              color: 'black',
              width: '150px',
              borderRadius: '10px',
              '&:hover': { backgroundColor: '#1a4f72', color: '#fff' },
            }}
          >
            LOGIN
          </Button>
          <Button
            variant="outlined"
            onClick={handleCloseAdminDialog}
            sx={{
              marginTop: '20px',
              color: 'black',
              width: '150px',
              borderRadius: '10px',
              '&:hover': { backgroundColor: '#1a4f72', color: '#fff' },
            }}
          >
            Cancel
          </Button>
        </Typography>
      </Dialog> */}

      {/* Forgot Password Dialog */}
      <Dialog open={openForgotPassword} onClose={handleCloseForgotPassword}>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            otpSent ? handleResetPassword() : handleSendOtp();
          }}
          sx={{
            padding: '20px',
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {!otpSent ? (
            <>
              <Typography variant="h6" textAlign="center">
                Forgot Password
              </Typography>
              <TextField
                fullWidth
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: '150px',
                  alignSelf: 'center',
                  background: '#34495e',
                }}
              >
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" textAlign="center">
                Reset Password
              </Typography>
              <TextField
                fullWidth
                label="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                variant="outlined"
                type="password"
                required
              />
              <TextField
                fullWidth
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
                type="password"
                required
              />
              {error && (
                <Typography color="error" textAlign="center">
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: '190px',
                  padding: '10px',
                  alignSelf: 'center',
                  background: '#34495e',
                  marginTop: '10px',
                }}
              >
                Reset Password
              </Button>
            </>
          )}
          <Button
            onClick={handleCloseForgotPassword}
            sx={{ alignSelf: 'center', color: '#1976d2', '&:hover': { backgroundColor: 'transparent' } }}
          >
            Cancel
          </Button>
        </Box>
      </Dialog>
    </div>
  );
};

export default Navbar;