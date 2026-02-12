import express from "express";
import fs from "fs";
import path from "path";
import { render } from "./dist-ssr/server/entry-server.cjs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const manifest = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "./dist-ssr/client/.vite/manifest.json"),
    "utf-8"
  )
);

server.use(express.static(path.resolve(__dirname, "./dist-ssr/client")));

server.all(/^(.*)$/, async (req, res) => {
  try {
    const template = fs.readFileSync(
      path.resolve(__dirname, "./dist-ssr/client/indexSSR.html"),
      "utf-8"
    );
    const { appHtml, cssLinks } = await render(req.url, manifest);
    // console.dir(cssLinks, 'adddad');

    const html = template
      .replace("<!--head-css-->", cssLinks)
      .replace("<!--app-html-->", appHtml)
      .replace(
        '<script type="module" src="/src/entry-client.ts"></script>',
        `<script type="module" src="/entry-client.js"></script>`
      );

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("SSR Error");
  }
});

server.listen(3000, () => {
  console.log("SSR server running at http://localhost:3000");
});
