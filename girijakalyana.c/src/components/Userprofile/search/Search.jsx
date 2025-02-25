import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FaSearch, FaHeart } from "react-icons/fa";
import axios from "axios";
import "./search.scss";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setProfiles([]);

    try {
      const response = await axios.get("http://localhost:5000/api/search", {
        params: { searchQuery },
      });

      if (response.data.length === 0) {
        setError("No profiles found matching your preferences.");
      } else {
        setProfiles(response.data);
      }
    } catch (err) {
      setError("Error fetching profiles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLikeToggle = (id, index) => {
    const updatedProfiles = [...profiles];
    updatedProfiles[index].like = !updatedProfiles[index].like;
    setProfiles(updatedProfiles);
  };

  const handleViewMore = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <div className="search-main-page">
      <Box sx={{ padding: 3, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: "#34495e", mb: 4 }}>
          Search Profiles
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by First or Last Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ maxWidth: "400px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              height: "56px",
              textTransform: "capitalize",
              fontSize: "20px",
              width: "130px",
              backgroundColor: "#34495e",
              ml: 2,
            }}
          >
            Search
          </Button>
        </Box>

        {loading && <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />}
        {error && <Typography color="error">{error}</Typography>}

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "flex-start", alignItems: "start", marginTop: 2 }}>
          {profiles.map((profile, index) => (
            <Card
              key={index}
              sx={{
                width: "270px",
                height: "420px",
                borderRadius: 1,
                boxShadow: 3,
                textAlign: "center",
                cursor: "pointer",
                position: "relative",
                background: "black",
                color: "#fff",
              }}
            >
              <CardMedia
                component="img"
                height="230px"
                image={profile.profileImg || "https://via.placeholder.com/150"}
                alt="Profile"
                sx={{ borderRadius: "1%" }}
              />

              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff" }}>
                    {profile.firstName} {profile.lastName}
                  </Typography>
                  <FaHeart
                    size={28}
                    style={{ cursor: "pointer", color: profile.like ? "red" : "#fff" }}
                    onClick={() => handleLikeToggle(profile._id, index)}
                  />
                </Box>
                <Typography fontWeight={550} sx={{ color: "#fff" }}>
                  {profile.address || "N/A"}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
                  <Box>
                    <Typography variant="body1" fontWeight="bold" sx={{ color: "#fff" }}>
                      {profile.parentPrefer?.toAge || "N/A"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#fff" }}>
                      Age
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight="bold" sx={{ color: "#fff" }}>
                      {profile.parentPrefer?.toHeight || "N/A"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#fff" }}>
                      Height
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight="bold" sx={{ color: "#fff" }}>
                      {index + 1}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#fff" }}>
                      Reg No
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" mt={0} mb={2} alignItems="center" justifyContent="flex-end" >
                  <Typography
                    onClick={() => handleViewMore(profile)}
                    sx={{ color: "aqua", fontWeight: "700", cursor: "pointer", }}
                  >
                    View More
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* POPUP DIALOG */}
      <Dialog 
  open={!!selectedProfile} 
  onClose={() => setSelectedProfile(null)} 
  maxWidth="sm" 
  fullWidth

>
  {selectedProfile && (
    <>
      {/* Dialog Title */}
      <DialogTitle 
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.8rem", backgroundColor: "#34495e", color: "#fff" }}
      >
        {selectedProfile.firstName} {selectedProfile.lastName}
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>

          {/* Profile Image */}
          <Box sx={{ textAlign: "center" }}>
            <img 
              src={selectedProfile.profileImg || "https://via.placeholder.com/150"} 
              alt="Profile"
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #34495e",
                padding: "5px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
              }}
            />
          </Box>

          {/* Profile Details */}
          <Box sx={{alignItems:'center',display:'flex'}}>
          <Box sx={{ textAlign: "start", width: "100%" }}>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong> Address:</strong> {selectedProfile.address || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong> DOB:</strong> {selectedProfile.dob || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong> Gender:</strong> {selectedProfile.gender || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong> Height:</strong> {selectedProfile.parentPrefer?.toHeight || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
              <strong> Age:</strong> {selectedProfile.parentPrefer?.toAge || "N/A"}
            </Typography>
          </Box>
          </Box>

        </Box>
      </DialogContent>

      {/* Close Button */}
      <DialogActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
        <Button 
          onClick={() => setSelectedProfile(null)} 
          variant="contained" 
          sx={{ backgroundColor: "#34495e", textTransform: "capitalize", fontSize: "1rem", padding: "8px 20px" }}
        >
          Close
        </Button>
      </DialogActions>
    </>
  )}
</Dialog>


    </div>
  );
};

export default Search;
