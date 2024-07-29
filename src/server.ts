import express from "express";
import { json } from "body-parser";
import listingRoutes from "./routes/listingRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

app.use("/api/listings", listingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
