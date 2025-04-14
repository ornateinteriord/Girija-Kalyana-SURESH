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

export const getImageVerificationColumns = () => [
    {
      name: "Registration No",
      selector: () => "-",
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email ID",
      selector: (row) => row.email,
    },
    {
      name: "Gender",
      selector: () => "-",
    },
    {
      name: "User Type",
      selector: () => "-",
    },
    {
      name: "Image Status",
      cell: () => (
        <Button
          style={{
            backgroundColor: "#ffefcc",
            borderRadius: "5px",
            marginTop: "5px",
            textTransform: "capitalize",
          }}
        >
          Upload
        </Button>
      ),
    },
    {
      name: "Notify",
      selector: () => "NA",
    },
    {
      name: "Status",
      cell: (row) => (
        <Button
          variant="text"
          color={row.isActive ? "success" : "error"}
          size="small"
          style={{ textTransform: "capitalize", fontSize: "16px" }}
        >
          {row.isActive ? "Active" : "Pending"}
        </Button>
      ),
    },
  ];

export const getRenewalsColumns = () => [
    {
      name: "Registration No",
      selector: () => "-",
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email Id",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Gender",
      selector: () => "-",
      sortable: false,
    },
    {
      name: "Expiry Date",
      selector: () => "02-09-2025",
      sortable: true,
    },
    {
      name: "Status",
      cell: () => (
        <span style={{ color: "red", fontWeight: 500 }}>Pending</span>
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


