const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/catalog", async (req, res) => {
    const keyword = req.query.q;

    if (!keyword) {
        return res.json({ error: "Missing query" });
    }

    const encoded = encodeURIComponent(keyword);

    const response = await fetch(
        `https://catalog.roblox.com/v1/search/items/details?Keyword=${encoded}&Category=3&Limit=10`
    );

    const data = await response.json();
    res.json(data);
});

app.listen(10000, () => {
    console.log("Server running");
});
