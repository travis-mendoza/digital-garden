// Run with: node generate-resume.js
// Re-run any time you update resume.html to regenerate cv/resume.pdf
// Run with: node generate-resume.js --ats to generate cv/resume-ats.pdf

const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
    const isAtsMode = process.argv.includes("--ats");
    const inputFile = isAtsMode ? "resume-ats.html" : "resume.html";
    const outputFile = isAtsMode ? "resume-ats.pdf" : "resume.pdf";
    const inputPath = path.join(__dirname, inputFile);
    const outputPath = path.join(__dirname, "cv", outputFile);

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
