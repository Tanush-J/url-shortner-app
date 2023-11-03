const express = require("express");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const urlRoute = require("./routes/url");

connectToMongoDB("mongodb://0.0.0.0:27017/short-url")
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.log(e));

const app = express();
const port = 3000;

app.use(express.static("static"));
app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
