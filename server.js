import express from "express";
import bodyParser from "body-parser";
import wkhtmltopdf from "wkhtmltopdf";

const app = express();
app.use(bodyParser.json({ limit: "6mb" })); // attend { html, fileName }

app.get("/", (_req, res) => res.send("OK: POST /to-pdf"));

app.post("/to-pdf", (req, res) => {
  const { html, fileName = "document.pdf" } = req.body || {};
  if (!html) return res.status(400).json({ error: "html is required" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);

  wkhtmltopdf(html, {
    pageSize: "A4",
    printMediaType: true,
    enableLocalFileAccess: true,
    marginTop: "18mm",
    marginRight: "14mm",
    marginBottom: "22mm",
    marginLeft: "14mm"
  }).pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("HTML→PDF ready on port", port));
