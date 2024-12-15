import express from "express";
import DatabaseConnection from "./config/database_connection.ts";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
  DatabaseConnection.getInstance();
});
