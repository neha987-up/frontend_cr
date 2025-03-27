if (process.env.NODE_ENV === "production") {
  module.exports = {
    AUTH_API_URL: "https://api.collectionrewards.com",
  };
} else {
  module.exports = {
    AUTH_API_URL: "https://cr-backend.itechnolabs.tech",
  };
}
