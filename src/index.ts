import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db"


const app = express();
const PORT = process.env.PORT || 3000;



// Load config
dotenv.config();

async function main() {
  // Connect to database
  await connectDB();

 

  app.use(express.static("public"));

  app.use(express.json());

  
  app.use(cors());

  // Routes
  const BusinessRoutes = require("./routes/BusinessRoutes");
  const ReviewRoutes = require("./routes/ReviewRoutes");
  const authRoutes = require("./routes/authRoute");

  app.use("/api/Business", BusinessRoutes);
  app.use("/api/Reviews", ReviewRoutes);
  app.use("/api/auth", authRoutes);

  // Catch-all route
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main().catch((err) => console.error(err));
