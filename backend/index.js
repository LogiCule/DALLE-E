import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// import connectDB from "./mongodb/connect";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  res.send("Hello from Backend!");
});

const startServer = async () => {
  try {
    // connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("server is running"));
  } catch (err) {
    console.log({ err });
  }
};

startServer();
