import { Router } from "express";
import {
  getListings,
  addListing,
  deleteListing,
} from "../controllers/listingController";

const router = Router();

router.get("/", getListings);
router.post("/", addListing);
router.delete("/:id", deleteListing);

export default router;
