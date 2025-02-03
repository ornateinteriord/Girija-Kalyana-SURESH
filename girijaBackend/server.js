require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const AboutUser = require("./routes/AboutUser");
const familyReligiousRouter = require("./routes/familyReligious");
const educationRoutes = require("./routes/Education");
const lifeStyle = require("./routes/LifeStyle");
const parentsPrefer = require("./routes/ParentPrefer");
const others = require("./routes/Others");
const mymatches = require("./routes/myMatches");
const userRoutes = require("./routes/userRouters")

const app = express();

connectDB();

app.use(
  cors({
    origin: "*", // Allow all domains
    methods: "*", // Allow all HTTP methods
    allowedHeaders: "*", // Allow all headers
  })
);
// app.use(express.json());
app.use(express.json({ limit: '20mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", AboutUser);
app.use("/api", familyReligiousRouter);
app.use("/api", educationRoutes);
app.use("/api", lifeStyle);
app.use("/api", parentsPrefer);
app.use("/api", others);
app.use("/api", mymatches);
app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
