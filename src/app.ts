import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";

const app: Application = express();

// Middleware
// app.use(cors()); // Enable CORS for all origins

// app.use(cors({
//   origin: [
//     'http://localhost:3000',
//     'http://localhost:5173',
//     'http://localhost:8081',  
//     'http://localhost:8080',
//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// TEMPORARY - for immediate testing
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Sports Facility Booking Platform API is running",
  });
});

// API routes
app.use("/api", routes);

// Global error handler
app.use(globalErrorHandler);

// 404 Not Found handler
app.use(notFound);

export default app;
