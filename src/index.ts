import { Hono } from "hono";
import { XMLParser } from "fast-xml-parser";

const app = new Hono();

app.post("/api/v2/convert", async (c) => {
  const body = await c.req.parseBody();
  const file = body["xsd"] as File;

  if (!file) {
    return c.json({ ok: false, message: "Please Provide a valid file" }, 400);
  }

  const xsdContent = await file.text();

  const options = {
    ignoreAttributes: false,
  };
  const parser = new XMLParser(options);
  const output = await parser.parse(xsdContent);

  return c.json({
    ok: true,
    output,
  });
});

export default app;
