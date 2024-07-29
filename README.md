# Real Estate Listings API

This is a simple RESTful API built with TypeScript and Node.js to manage a small database of real estate listings. It allows users to add a new listing, retrieve all listings, and delete a listing.

## Table of Contents

- [Installation](#installation)
- [Setup Redis](#setup-redis)
- [Running the Server](#running-the-server)
- [Running Tests](#running-tests)
- [Postman Collection](#postman-collection)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/real-estate-listings-api.git
   cd real-estate-listings-api
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Create a `.env` file** (optional, for environment-specific settings):

   ```sh
   touch .env
   ```

## Setup Redis

Ensure you have Redis installed and running on your local machine.

### For macOS (using Homebrew):

```sh
brew install redis
brew services start redis
```

### For Ubuntu:

```sh
sudo apt-get update
sudo apt-get install redis-server
sudo systemctl start redis
sudo systemctl enable redis
```

### For Windows:

Download and install Redis from the [Redis website](https://redis.io/download).

### Check if Redis is running:

```sh
redis-cli ping
# You should see "PONG"
```

## Running the Server

1. **Start the server with Nodemon:**

   ```sh
   npm run dev
   ```

2. The server will start on `http://localhost:3000`.

## Running Tests

1. **Run the tests using Jest:**

   ```sh
   npm run test
   ```

## Postman Collection

A Postman collection is provided to test the API endpoints. You can import the collection into Postman using the following steps:

1. Download the [RealEstateListingsAPI.postman_collection.json](./RealEstateListingsAPI.postman_collection.json) file.
2. Open Postman.
3. Click on the "Import" button located at the top left corner.
4. Select the "File" tab.
5. Click on "Choose Files" and select the downloaded `RealEstateListingsAPI.postman_collection.json` file.
6. Click on "Import".

### Postman Collection Endpoints

1. **Add Listing**: A POST request to add a new listing.
2. **Get Listings**: A GET request to retrieve all listings.
3. **Delete Listing**: A DELETE request to delete a listing (you will need to replace `{{listingId}}` with the actual ID of a listing you want to delete).

## API Endpoints

### Add a New Listing

- **Endpoint:** `POST /api/listings`
- **Body:**

  ```json
  {
    "title": "Beautiful House",
    "price": 100000,
    "description": "A beautiful house in the suburbs."
  }
  ```

- **Response:**

  ```json
  {
    "id": "unique-identifier",
    "title": "Beautiful House",
    "price": 100000,
    "description": "A beautiful house in the suburbs."
  }
  ```

### Retrieve All Listings

- **Endpoint:** `GET /api/listings`
- **Response:**

  ```json
  [
    {
      "id": "unique-identifier",
      "title": "Beautiful House",
      "price": 100000,
      "description": "A beautiful house in the suburbs."
    }
  ]
  ```

### Delete a Listing

- **Endpoint:** `DELETE /api/listings/:id`
- **Response:** `204 No Content`
