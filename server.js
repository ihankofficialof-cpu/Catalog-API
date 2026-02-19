app.get("/catalog", async (req, res) => {
    const query = req.query.q;
    const cursor = req.query.cursor || "";

    const response = await fetch(
        `https://catalog.roblox.com/v1/search/items?category=All&limit=30&keyword=${encodeURIComponent(query)}&cursor=${cursor}`
    );

    const data = await response.json();

    res.json({
        items: data.data,
        nextCursor: data.nextPageCursor || null
    });
