import React from "react";
import { Button, Typography } from "@mui/material";


export const customStyles = {
  headCells: {
    style: {
      fontFamily: "Outfit sans-serif",
      fontSize: "18px",
      fontWeight: "bold",
    },
  },
  cells: {
    style: {
      fontFamily: "Outfit sans-serif",
      fontSize: "17px",
    },
  },
};

export const getPromoterTableColumns = () => [
    {
      name: "Promoter's Name",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Promocode",
      selector: row => "-",
    },
    {
      name: "Mobile",
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: "Free Users",
      selector: row => "-",
    },
    {
      name: "Premium Users",
      selector: row => "-",
    },
    {
      name: "Silver Users",
      selector: row => "-",
    },
    {
      name: "Total Users",
      selector: row => "-",
    },
    {
      name: "Action",
      cell: () => (
        <Button variant="contained" size="small" sx={{ textTransform: 'capitalize' }}>
          DETAILS
        </Button>
      ),
    },
  ];
export const getPendingandSuccessUserDataColumns = () => [
    {
      name: "Registration No",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Caste",
      selector: () => "-",
    },
    {
      name: "User Type",
      selector: () => "Free/Silver User",
    },
  ];

export const getImageVerificationColumns = (upgradeUserMutation,handleStatusUpdate) => [
    {
      name: "Registration No",
      selector: (row) => row.registration_no,
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Email ID",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) =>row.gender ,
      sortable: true,
    },
    {
      name: "User Type",
      selector: (row) =>row.user_role ,
      sortable: true,
    },
    {
      name: "Image Status",
      cell: row => (
        <Typography color={row.image_verification === "active" ? "green" : "orange"}>
          {row.image_verification}
        </Typography>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          variant="contained"
          color={row.image_verification === "active" ? "warning" : "success"}
          size="small"
          onClick={() => handleStatusUpdate(row.registration_no, row.image_verification)}
          disabled={upgradeUserMutation.isLoading }
        >
          {row.image_verification === "active" ? "pending" : "active"}
        </Button>
      ),
    },
  ];

export const getRenewalsColumns = () => [
    {
      name: "Registration No",
      selector: (row) => row.registration_no,
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Email Id",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: false,
    },
    {
      name: "Expiry Date",
      selector: (row) => row.expiry_date,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span style={{ color: "red", fontWeight: 500 }}>{row.status}</span>
      ),
    },
    {
      name: "Renewal",
      selector: () => "-",
    },
  ];

export const getResetPasswordColumns = (handleOpenDialog) =>  [
    {
      name: "Registration No",
      selector: (row) => row.registration_no,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Password",
      selector: (row) => row.password,
    },
    {
      name: "Status",
      cell: (row) => (
        <Typography color={row.status === "active" ? "green" : "red"}>
          {row.status}
        </Typography>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "capitalize",
            background: "#34495e",
          }}
          onClick={() => handleOpenDialog(row)}
        >
          Change Password
        </Button>
      ),
    },
  ];


  export const getPromotersUserDataColumns = (handleAction) => [
    {
      name: "Promoter Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Promocode",
      selector: (row) => "-",
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Assistance Users",
      selector: (row) =>"-",
      sortable: true,
    },
    {
      name: "Total Users",
      selector: (row) => "-",
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "capitalize",
            background: "#34495e",
          }}
          onClick={() => handleAction(row)}
        >
          Perform Action
        </Button>
      ),
    },
  ];


  export const getPromotersDataColumns = (handleStatusChange) => [
    {
      name: "Promoter Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Promoter Code",
      selector: () => "-",
      sortable: false,
    },
    {
      name: "Mobile",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email ID",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Promoter Type",
      selector: () => "-",
      sortable: false,
    },
    {
      name: "Status",
      cell: (row) => (
        <Typography color={row.status === "active" ? "green" : "orange"}>
          {row.status === "active" ? "Active" : "Pending"}
        </Typography>
      ),
      sortable: true,
    },
    {
      name: "Change Status",
      cell: (row) => (
        <Button
          variant="outlined"
          color={row.status === "active" ? "error" : "success"}
          onClick={() => handleStatusChange(row)}
        >
          {row.status === "active" ? "Inactive" : "Active"}
        </Button>
      ),
    },
  ];

export const getUserTableColumns = (formatUserRole) =>  [
    {
      name: "Sl.No",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px"
    },
    {
      name: "Username",
      selector: row => row.username,
      sortable: true,
    },
    {
      name: "Reference No",
      selector: row => row.registration_no,
      sortable: true,
    },
    {
      name: "Membership",
      cell: row => (
        <Typography
          sx={{
            color: row.user_role === 'PremiumUser' ? '#FFD700' : 
                  row.user_role === 'SilverUser' ? '#C0C0C0' : 
                  row.user_role === 'FreeUser' ? '#4CAF50' :
                  row.user_role === 'Assistance' ? '#3498db' : '#333',
          }}
        >
          {formatUserRole(row.user_role)}
        </Typography>
      ),
      sortable: true,
    },
    {
      name: "Status",
      cell: row => (
        <Typography
          sx={{
            color: row.status === 'active' ? '#4CAF50' : '#F44336'
          }}
        >
          {row.status?.charAt(0).toUpperCase() + row.status?.slice(1)}
        </Typography>
      ),
      sortable: true,
    },
    {
      name: "Last Login",
      selector: row => row.last_loggedin ? new Date(row.last_loggedin).toLocaleDateString() : 'Never',
      sortable: true,
    },
  ];

  export const getPromotersEarningsColumns = (handlePayNow) => [
    {
      name: "Promoter Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Promoter Code",
      selector: () => "-",
      sortable: false,
    },
    {
      name: "Total Earnings",
      selector: () => "Rs. 50,000",
      sortable: true,
    },
    {
      name: "Paid",
      selector: () => "Rs.",
      sortable: false,
    },
    {
      name: "Payable",
      selector: () => "Rs.",
      sortable: false,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handlePayNow(row)}
        >
          Pay Now
        </Button>
      ),
    },
  ];

  export const getPromoterPaymentColumns = (handlePayNow) => [
    {
      name: "Promoter Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Promoter Code",
      selector: () => "-",
      sortable: false,
    },
    {
      name: "Total Earnings",
      selector: () => "Rs. 50,000",
      sortable: true,
    },
    {
      name: "Paid",
      selector: () => "Rs. 30,000",
      sortable: false,
    },
    {
      name: "Payable",
      selector: () => "Rs. 20,000",
      sortable: false,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handlePayNow(row)}
        >
          Pay Now
        </Button>
      ),
    },
  ];

export const getUserDataColumns = (upgradeUserMutation, handleUpgrade) => [
    {
      name: "Registration No",
      selector: row => row.registration_no,
      sortable: true,
    },
    {
      name: "Name",
      selector: row => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Email Id",
      selector: row => row.username,
      sortable: true,
    },
    {
      name: "Gender",
      selector: row => row.gender,
      sortable: true,
    },
    {
      name: "User Type",
      selector: row => row.type_of_user,
      sortable: true,
    },
    {
      name: "Status",
      cell: row => (
        <Typography color={row.status === "active" ? "green" : "red"}>
          {row.status}
        </Typography>
      ),
      sortable: true,
    },
    {
      name: "Upgrade",
      cell: row => (
        <Button
          variant="contained"
          color="success"
          size="small"
          sx={{ textTransform: "capitalize" }}
          onClick={() => handleUpgrade(row.registration_no, row.status)}
          disabled={upgradeUserMutation.isLoading && 
            upgradeUserMutation.variables?.regno === row.registration_no}
        >
          {upgradeUserMutation.isLoading && 
            upgradeUserMutation.variables?.regno === row.registration_no
            ? "Processing..."
            : row.status === "active"
            ? "Deactivate"
            : "Activate"}
        </Button>
      ),
    },
  ];

  export const getAssistancePendingColumns = () => [
    {
      name: "Registration No",
      selector: row => row.registration_no,
      sortable: true,
    },
    {
      name: "Name",
      selector: row => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: row => row.username,
      sortable: true,
    },
    {
      name: "Phone",
      selector: row => row.mobile_no,
      sortable: true,
    },
    {
      name: "Caste",
      selector: row => row.caste,
      sortable: true,
    },
    {
      name: "User Type",
      selector: row => row.type_of_user,
      sortable: true,
    },

  ];

  export const getAssistanceSuccessColumns = () => [
    {
      name: "Registration No",
      selector: row => row.registration_no,
      sortable: true,
    },
    {
      name: "Name",
      selector: row => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: row => row.username,
      sortable: true,
    },
    {
      name: "Phone",
      selector: row => row.mobile_no,
      sortable: true,
    },
    {
      name: "Caste",
      selector: row => row.caste,
      sortable: true,
    },
    {
      name: "User Type",
      selector: row => row.type_of_user,
      sortable: true,
    },

  ];


  export const getOnlineTransactionColumns = (showActive) => [
    {
      name: "Date",
      selector: () => "06-01-2025",
      sortable: true,
    },
    {
      name: "UserName",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Registration No",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Bank Reference Number",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Mode Of Payment",
      selector: () => "-",
      sortable: false,
    },
    {
      name: "Amount",
      selector: () => "Rs.2300",
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <Typography color={showActive ? "success.main" : "warning.main"}>
          {showActive ? "TXN_Success" : "TXN_Pending"}
        </Typography>
      ),
      sortable: true,
    },
  ];

  export const getAssistanceOnlineTransactionDataColumns = () => [
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "UserName",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Registration No",
      selector: (row) => row.registration_no,
      sortable: true,
    },
    {
      name: "Bank Reference Number",
      selector: (row) => row.bank_ref_no,
      sortable: true,
    },
    {
      name: "Mode Of Payment",
      selector: (row) => row.mode,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <Typography color={row.status === "TXN_SUCCESS" ? "green" : "red"}>
          {row.status}
        </Typography>
      ),
      sortable: true,
    },
  ];


  export const getReceiptVoucherColumns = () => [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.address.city,
      sortable: true,
    },
  ];


  export const getUserReportsColumns = () => [
    {
      name: "Activation Date",
      selector: (row) => row.registration_date,
      sortable: true,
    },
    {
      name: "Registration No",
      selector: (row) => row.registration_no,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <Typography color={row.status === "active" ? "green" : "red"}>
          {row.status}
        </Typography>
      ),
      sortable: true,
    },
  ];

  export const getRenewalsReportColumns = () => [
    {
      name: "Transaction Date",
      selector: () => "09-10-2024",
      sortable: true,
    },
    {
      name: "Registration No",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Gender",
      selector: () => "-",
      sortable: false,
    },
    {
      name: "Status",
      cell: (row, index) => (
        <Typography
          variant="body2"
          color={index % 2 === 0 ? "success.main" : "error.main"}
        >
          {index % 2 === 0 ? "Active" : "Expires"}
        </Typography>
      ),
      sortable: true,
    },
  ];

  export const getReceiptsReportColumns = () => [
    {
      name: "Date",
      selector: () => "03-01-2025",
      sortable: true,
    },
    {
      name: "Registration No",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "UserName",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Bank Reference Number",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Mode of Payment",
      selector: () => "-",
      sortable: false,
    },
    {
      name: "Amount",
      selector: () => "Rs.",
      sortable: false,
    },
    {
      name: "Status",
      cell: (row) => (
        <Typography
          color={row.id % 2 === 0 ? "success.main" : "error.main"}
          sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
        >
          {row.id % 2 === 0 ? "Success" : "Pending"}
        </Typography>
      ),
      sortable: true,
    },
  ];

  export const getNotificationDataColumns = () => [
    {
      name: "News ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "News Details",
      selector: () => "-",
      sortable: false,
    },
    {
      name: "From Date",
      selector: () => "12-01-2025",
      sortable: true,
    },
    {
      name: "To Date",
      selector: () => "12-02-2025",
      sortable: true,
    },
    {
      name: "Type Of News",
      selector: () => "-",
      sortable: false,
    },
    {
      name: "Status",
      cell: (row, index) => (
        <Typography
          variant="body2"
          color={index % 2 === 0 ? "green" : "orange"}
        >
          {index % 2 === 0 ? "Active" : "Pending"}
        </Typography>
      ),
      sortable: true,
    },
  ];


