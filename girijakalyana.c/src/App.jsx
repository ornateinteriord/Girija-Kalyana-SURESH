import React, { Suspense, useEffect, useState, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CgSpinner,  CgSpinnerAlt } from 'react-icons/cg';
import { CircularProgress } from '@mui/material';

// Lazy loading components
const HeroSlider = lazy(() => import('./components/hero/HeroSlider'));
const Connect = lazy(() => import('./components/howWorks/Connect'));
const Members = lazy(() => import('./components/members/Member'));
const AboutUs = lazy(() => import('./components/Aboutus/AboutUs'));
const Privacy = lazy(() => import('./components/privecy/Privacy'));
const ContactUs = lazy(() => import('./components/contactus/ContactUs'));
const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard'));
const UserTable = lazy(() => import('./components/Admin/UserManagement/UserTable'));
const UserData = lazy(() => import('./components/Admin/userData/UserData'));
const Dashboard = lazy(() => import('./components/Admin/dashboard/Dashboard'));
const RenewalsData = lazy(() => import('./components/Admin/renewalsdata/RenewalsData'));
const ResetPassword = lazy(() => import('./components/Admin/resetpassword/ResetPassword'));
const ImageVerificationData = lazy(() => import('./components/Admin/imageVarify/ImageVerificationdata'));
const PendingData = lazy(() => import('./components/Admin/pendinData/PendingData'));
const SuccessData = lazy(() => import('./components/Admin/successData/SuccessData'));
const PromotersUsersData = lazy(() => import('./components/Admin/PromotersUserData/PromotersUserData'));
const PayToPromoterData = lazy(() => import('./components/Admin/PromoterManagement/PayToPromoterData'));
const PromotersEarningsData = lazy(() => import('./components/Admin/PromotersEarnings/PromotersEarningsData'));
const PromotersData = lazy(() => import('./components/Admin/PromoterData/PromotersData'));
const PromotersUsers = lazy(() => import('./components/Admin/PromotersUsers/PromotersUsers'));
const OnlineTransactionData = lazy(() => import('./components/Admin/Receipts/OnlineTransactiondata'));
const AssistanceOnlineTransactionData = lazy(() => import('./components/Admin/Receipts/AssistanceOnlineTransactionData'));
const ReceiptVoucher = lazy(() => import('./components/Admin/Receipts/ReceiptVocher'));
const UserReports = lazy(() => import('./components/Admin/Reports/UserReports'));
const RenewalsReportsData = lazy(() => import('./components/Admin/Reports/RenewalsReportsData'));
const ReceiptsReportsData = lazy(() => import('./components/Admin/Reports/ReceiptsReportsData'));
const UserNavBar = lazy(() => import('./components/Userprofile/User/UserNavBar'));
const NotificationData = lazy(() => import('./components/Admin/notificationDta/NotificationData'));
const Servieces = lazy(() => import('./components/servieces/Servieces'));
const MyMatches = lazy(() => import('./components/Userprofile/myMatches/MyMatches'));
const MyInterest = lazy(() => import('./components/Userprofile/myIntrest/MyIntrest'));
const ViewAll = lazy(() => import('./components/Userprofile/viewAll/ViewAll'));
const Search = lazy(() => import('./components/Userprofile/search/Search'));
const UserDashboard = lazy(() => import('./components/Userprofile/userdDashboard/UserDashboard'));
const Profile = lazy(() => import('./components/Userprofile/profile/Profile'));

const Spinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          border: '4px solid rgba(0, 0, 0, 0.2)', 
          borderTop: '4px solid black',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      ></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

const App = () => {
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [isLogged, setIsLogged] = useState(false);

  // useEffect(() => {
  //   const adminStatus = localStorage.getItem('isAdmin');
  //   const loginStatus = localStorage.getItem('islogged');
  //   setIsAdmin(adminStatus === 'true');
  //   setIsLogged(loginStatus === 'true');
  // }, []);

  return (
    <Suspense fallback={<CircularProgress /> }>
      <Router>
        <Routes>
          <Route path="/" element={<><HeroSlider /><Connect /><Members /></>} />
          <Route path="/service" element={<Servieces />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="user-table" element={<UserTable />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="userData" element={<UserData />} />
            <Route path="renewals" element={<RenewalsData />} />
            <Route path="resetpass" element={<ResetPassword />} />
            <Route path="pendingdata" element={<PendingData />} />
            <Route path="successdata" element={<SuccessData />} />
            <Route path="promotersdata" element={<PromotersUsersData />} />
            <Route path="paytopromoters" element={<PayToPromoterData />} />
            <Route path="promoterearn" element={<PromotersEarningsData />} />
            <Route path="imageverify" element={<ImageVerificationData />} />
            <Route path="promoters" element={<PromotersData />} />
            <Route path="promotersusers" element={<PromotersUsers />} />
            <Route path="onlinetransaction" element={<OnlineTransactionData />} />
            <Route path="assistance" element={<AssistanceOnlineTransactionData />} />
            <Route path="receiptsvocher" element={<ReceiptVoucher />} />
            <Route path="userreports" element={<UserReports />} />
            <Route path="renewalreports" element={<RenewalsReportsData />} />
            <Route path="receiptsreports" element={<ReceiptsReportsData />} />
            <Route path="notification" element={<NotificationData />} />
          </Route>

          {/* User Routes */}
          <Route path="/user" element={<UserNavBar />}>
            <Route path="profile" element={<Profile />} />
            <Route path="userdashboard" element={<UserDashboard />} />
            <Route path="MyMatches" element={<MyMatches />} />
            <Route path="myintrest" element={<MyInterest />} />
            <Route path="viewAll" element={<ViewAll />} />
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        reverseOrder={false}
        
        toastOptions={{
          duration: 5000, // Default duration for all toasts
        
        }}
      />
    </Suspense>
  );
};

export default App;
