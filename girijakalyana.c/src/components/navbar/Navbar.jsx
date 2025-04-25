import React, { useState } from 'react';
import './Navbar.scss';
import {
  Button,
  Dialog,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLoginMutation } from '../api/Auth';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu
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

  const { mutate: login, isPending: isLoginPending } = useLoginMutation();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      toast.error('Both username and password are required');
      return;
    }
    login(loginData);
  };

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

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Service', path: '/service' },
    { text: 'About Us', path: '/about' },
    { text: 'Privacy Policy', path: '/privacy-policy' },
    { text: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className="navbar-main-container">
      <div className="navbar-container">
        <div className="navbar">
          <IconButton
            className="menu-button"
            onClick={toggleMobileMenu}
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff' }}
          >
            {mobileMenuOpen ? <CloseIcon  /> : <MenuIcon />}
          </IconButton>
          <h3>Girija❤️Kalyana</h3>
          <div className="menu desktop-menu">
            <ul>
              {menuItems.map((item) => (
                <li key={item.text}>
                  <Link className="link" to={item.path}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleOpen}
              sx={{
                backgroundColor: 'black',
                
                width: '150px',
                color: '#fff',
                fontWeight: 700,
                height: '42px',
                textTransform: 'capitalize',
              }}
            >
              Login
            </Button>
          </Typography>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          '& .MuiDrawer-paper': {
            width: '250px',
            background: '#182848',
            color: '#fff',
          },
        }}
      >
        <Box sx={{ padding: '15px' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px',display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <h4>Girija❤️Kalyana</h4>
            <IconButton   onClick={toggleMobileMenu} ><CloseIcon sx={{color:"#fff"}}/></IconButton>
          </Typography>

          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                onClick={toggleMobileMenu}
                sx={{ padding: '10px 0' }}
              >
                <Link className="link mobile-link" to={item.path}>
                  <ListItemText primary={item.text} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Login/Register Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            padding: '20px',
            maxWidth: '600px',
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
                sx={{ width: { xs: '100%', sm: '400px' } }}
                label="Enter Username"
                name="username"
                value={loginData.username}
                onChange={handleChangeLogin}
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                sx={{ width: { xs: '100%', sm: '400px' }, marginBottom: '20px' }}
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
            width: { xs: '100%', sm: '400px' },
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