const express = require("express");
const path = require('path')
const cookieParser = require('cookie-parser')

const { restrictToLoggedinUserOnly } = require("./middleware/auth");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require('./routes/user');

connectToMongoDB("mongodb://0.0.0.0:27017/short-url")
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.log(e));

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.use("/", staticRoute)
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
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
  console.log(`URL-shortner app listening at http://localhost:${port}`);
});
