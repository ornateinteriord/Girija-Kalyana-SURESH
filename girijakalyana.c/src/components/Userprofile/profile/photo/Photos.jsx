import React, { useRef, useState } from "react";
import { Box, Button, Typography, Card, CardMedia } from "@mui/material";
import { FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import useStore from "../../../../store";


// Replace with your actual backend API endpoints
const API_URL = "http://locahost:5000/api/uploads"; // Example for POST request

const Photos = () => {
  const [file, setFile] = useState("");
  const fileInputRef = useRef(null);
const {setprofileImage}=useStore();
  const chooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type.startsWith("image/") &&
        selectedFile.size <= 10 * 1024 * 1024
      ) {
        const base64 = await convertToBase64(selectedFile);
        setFile(base64); // Store the Base64 string in state
      } else {
        setFile("");
        toast.warn("Please select a valid image file (max size: 10 MB).");
      }
    }
  };

  // Helper function to convert file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // Base64 string
      reader.onerror = (error) => reject(error);
    });
  };

  // POST API call to upload image
  const uploadImage = async (data) => {
    if (!file) return alert("No image selected for upload.");
   
    try {
      const formData = new FormData();
      formData.append("profileImg", file);
      const userId =
        localStorage.getItem("userId")

      const response = await fetch(
        `http://localhost:5000/api/updateImg/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profileImg: file,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error uploading image");
      }

      toast.success("Profile Image Added SuccessFully")
      localStorage.removeItem('profileImg');
      localStorage.setItem('profileImg', JSON.stringify(file))
      setprofileImage(JSON.stringify(file))
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box
      sx={{
        padding: "24px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "Roboto, sans-serif",
        maxWidth: "600px",
        margin: "auto",
        display:'flex'
      }}
    >
      
      <Card
        sx={{
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <Box >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {file ? (
            <CardMedia
              component="img"
              height="450"
              image={file}
              alt="Uploaded Preview"
              sx={{
                borderRadius: "12px",
                marginBottom: "16px",
                width: "100%",
                objectFit: "center",
                overflowY: "auto",
              }}
            />
          ) : (
            <Box
              sx={{
                height: "200px",
                width: "100%",
                backgroundColor: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "12px",
                marginBottom: "16px",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No Image Selected
              </Typography>
            </Box>
          )}

          <Typography
            variant="body2"
            color="text.primary"
            sx={{ marginBottom: "16px", textAlign: "center" }}
          >
            * Please upload high-resolution images only (Max size: 10 MB)
          </Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              startIcon={<FaUpload />}
              onClick={chooseFile}
              sx={{
                color: "#1976d2",
                borderColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#f0f7ff",
                },
              }}
            >
              Choose File
            </Button>
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
            />

            <Button
              variant="contained"
              size="small"
              onClick={uploadImage}
              sx={{
                height: "35px",
                backgroundColor: "#34495e",
                "&:hover": {
                  backgroundColor: "#1976d2",
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Photos;

export const convertFromBase64 = (base64String, fileName) => {
  return new Promise((resolve, reject) => {
    try {
      // Extract the content type and Base64 data from the Base64 string
      const matches = base64String.match(/^data:(.+);base64,(.+)$/);

      if (!matches) {
        return reject(new Error("Invalid Base64 string format"));
      }

      const contentType = matches[1]; // Extract MIME type (e.g., "image/png")
      const base64Data = matches[2]; // Extract the Base64-encoded string

      // Decode the Base64 string
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      // Create a File object
      const file = new File([byteArray], fileName, { type: contentType });
      resolve(file);
    } catch (error) {
      reject(error);
    }
  });
};