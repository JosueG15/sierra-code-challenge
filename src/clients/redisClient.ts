import { createClient } from "redis";
import RedisMock from "ioredis-mock";
import { RedisClient } from "../models/Redis";
import { LISTINGS_KEY } from "../utils/constants";
import { Listing } from "../models/Listing";

let client: RedisClient;

if (process.env.NODE_ENV === "test") {
  client = new RedisMock();
} else {
  const realClient = createClient();

  realClient.on("error", (err) => console.log("Redis Client Error", err));

  realClient.connect().catch(console.error);

  client = realClient as unknown as RedisClient;
}

export const fetchListings = async (): Promise<Listing[]> => {
  const listingsData = await client.get(LISTINGS_KEY);
  return listingsData ? JSON.parse(listingsData) : [];
};

export const updateListings = async (listings: Listing[]): Promise<void> => {
  await client.set(LISTINGS_KEY, JSON.stringify(listings));
};

export const findListingIndex = (listings: Listing[], id: string): number => {
  return listings.findIndex((listing) => listing.id === id);
};

export default client;
