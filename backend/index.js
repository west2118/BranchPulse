import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import cookieParser from "cookie-parser";
import http from "http";

dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import branchRoutes from "./routes/branch.routes.js";
import userRoutes from "./routes/user.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import salesRoutes from "./routes/sales.routes.js";

import createBranchTable from "./data/createBranchTable.js";
import createUserTable from "./data/createUserTable.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Routes
app.use("/api", authRoutes);
app.use("/api", branchRoutes);
app.use("/api", userRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", salesRoutes);

createBranchTable();
createUserTable();

// Testing postgres
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send(`✅ Database connected: ${result.rows[0].current_database}`);
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    res.status(500).send("Database not connected");
  }
});

// Server running
app.listen(port, () => {
  console.log(`Server is running on local: ${port}`);
});
