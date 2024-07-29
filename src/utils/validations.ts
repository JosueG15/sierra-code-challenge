import { Listing } from "../models/Listing";

export const isValidListing = (
  listing: Partial<Listing>
): listing is Listing => {
  return (
    typeof listing.title === "string" &&
    typeof listing.price === "number" &&
    typeof listing.description === "string"
  );
};
