import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/catalog", async (req, res) => {
    try {
        const query = req.query.q;
        const cursor = req.query.cursor || "";

        if (!query) {
            return res.status(400).json({ error: "Missing query" });
        }

        const robloxUrl =
            "https://catalog.roblox.com/v1/search/items?category=All&limit=30&keyword=" +
            encodeURIComponent(query) +
            "&cursor=" +
            encodeURIComponent(cursor);

        const response = await fetch(robloxUrl);
        const data = await response.json();

        return res.json({
            items: data.data || [],
            nextCursor: data.nextPageCursor || null
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
