import express from "express";
import routes from "./routes";

const app = express();
const port = 3000;

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
