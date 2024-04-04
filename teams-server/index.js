const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dbConnect = require("./dbConnect");
const usersRouter = require("./routers/usersRouter");
const teamsRouter = require("./routers/teamsRouter");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(morgan("common"));
app.use(
  cors({
    credentials: true,
    origin: "https://teams-clients.vercel.app",
  })
);

app.use("/api", usersRouter);
app.use("/api", teamsRouter);

const PORT = 4000;

dbConnect();

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
