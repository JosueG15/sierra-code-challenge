import { Request, Response } from "express";
import { Listing } from "../models/Listing";
import { v4 as uuidv4 } from "uuid";
import {
  fetchListings,
  updateListings,
  findListingIndex,
} from "../clients/redisClient";
import { isValidListing } from "../utils/validations";

export const getListings = async (_: Request, res: Response) => {
  const listings = await fetchListings();
  res.json(listings);
};

export const addListing = async (req: Request, res: Response) => {
  const { title, price, description } = req.body;

  const newListing: Partial<Listing> = { title, price, description };

  if (!isValidListing(newListing)) {
    return res.status(400).json({ error: "Invalid listing data" });
  }

  const id = uuidv4();
  const listing: Listing = { ...newListing, id };

  const listings = await fetchListings();
  listings.push(listing);
  await updateListings(listings);

  res.status(201).json(listing);
};

export const deleteListing = async (req: Request, res: Response) => {
  const { id } = req.params;

  const listings = await fetchListings();
  const listingIndex = findListingIndex(listings, id);

  if (listingIndex === -1) {
    return res.status(404).json({ error: "Listing not found" });
  }

  listings.splice(listingIndex, 1);
  await updateListings(listings);

  res.status(204).send();
};
