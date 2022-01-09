export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  apiKey: process.env.API_KEY,
  mongoDBUri: process.env.MONGO_DB_URI,
});
