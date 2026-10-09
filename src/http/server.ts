import { createServer } from "node:http";
import { buildM4SyntheticProjection } from "./m4.js";

const port = Number(process.env.PORT ?? 8787);

const server = createServer(async (req, res) => {
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("access-control-allow-origin", "*");

  if (req.method !== "GET" || req.url !== "/api/m4/competency?scenario=synthetic-ana") {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "not_found", expected: "GET /api/m4/competency?scenario=synthetic-ana" }));
    return;
  }

  try {
    const projection = await buildM4SyntheticProjection();
    res.statusCode = 200;
    res.end(JSON.stringify(projection));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }));
  }
});

server.listen(port, () => {
  console.log(`M4 read-only adapter listening on http://localhost:${port}`);
});
