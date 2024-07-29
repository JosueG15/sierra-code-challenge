import request from "supertest";
import express from "express";
import { json } from "body-parser";
import listingRoutes from "../src/routes/listingRoutes";
import client from "../src/clients/redisClient";

const app = express();
app.use(json());
app.use("/api/listings", listingRoutes);

afterAll(() => {
  client.quit();
});

describe("Listings API", () => {
  it("should add a new listing", async () => {
    const newListing = {
      title: "Beautiful House",
      price: 100000,
      description: "A beautiful house in the suburbs.",
    };

    const response = await request(app)
      .post("/api/listings")
      .send(newListing)
      .expect(201);

    expect(response.body).toMatchObject(newListing);
  });

  it("should retrieve all listings", async () => {
    const response = await request(app).get("/api/listings").expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should delete a listing", async () => {
    const newListing = {
      title: "Beautiful House",
      price: 100000,
      description: "A beautiful house in the suburbs.",
    };

    const addResponse = await request(app)
      .post("/api/listings")
      .send(newListing)
      .expect(201);

    const { id } = addResponse.body;

    await request(app).delete(`/api/listings/${id}`).expect(204);

    const getResponse = await request(app).get("/api/listings").expect(200);
    expect(getResponse.body).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ id })])
    );
  });

  it("should return 400 for invalid listing data", async () => {
    const invalidListing = {
      title: "Incomplete Listing",
    };

    const response = await request(app)
      .post("/api/listings")
      .send(invalidListing)
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });

  it("should return 404 when trying to delete a non-existent listing", async () => {
    const nonExistentId = "non-existent-id";

    await request(app).delete(`/api/listings/${nonExistentId}`).expect(404);
  });

  it("should return 400 when trying to add a listing with invalid price", async () => {
    const invalidPriceListing = {
      title: "Invalid Price Listing",
      price: "not-a-number",
      description: "A listing with an invalid price.",
    };

    const response = await request(app)
      .post("/api/listings")
      .send(invalidPriceListing)
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });

  it("should return 404 when trying to delete a listing with invalid ID format", async () => {
    const invalidIdFormat = "123";

    await request(app).delete(`/api/listings/${invalidIdFormat}`).expect(404);
  });
});
