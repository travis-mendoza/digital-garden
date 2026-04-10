// Run with: node generate-resume.js
// Re-run any time you update resume.html to regenerate cv/resume.pdf

const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
    const inputPath = path.join(__dirname, "resume.html");
    const outputPath = path.join(__dirname, "cv", "resume.pdf");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`file://${inputPath}`, { waitUntil: "networkidle0" });

    await page.pdf({
        path: outputPath,
        format: "Letter",
        printBackground: true,
        displayHeaderFooter: false,
        margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    await browser.close();
    console.log(`PDF written to ${outputPath}`);
})();
