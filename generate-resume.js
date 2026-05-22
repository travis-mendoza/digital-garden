// Run with: node generate-resume.js
// Re-run any time you update resume.html to regenerate cv/resume.pdf
// Run with: node generate-resume.js --ats to generate cv/resume-ats.pdf
// Run with: node generate-resume.js path/to/custom-resume.html to generate resumes/custom-resume.pdf

const fs = require("fs");
const puppeteer = require("puppeteer");
const path = require("path");

function getPositionalArg() {
    const args = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
    return args[0];
}

function resolveInputAndOutput(isAtsMode, customInput) {
    if (customInput) {
        const inputPath = path.resolve(process.cwd(), customInput);

        if (!customInput.toLowerCase().endsWith(".html")) {
            console.error(`Error: input file must be an HTML file (.html): ${customInput}`);
            process.exit(1);
        }

        if (!fs.existsSync(inputPath)) {
            console.error(`Error: input file not found: ${inputPath}`);
            process.exit(1);
        }

        const outputDir = path.join(__dirname, "resumes");
        const outputFile = `${path.basename(customInput, path.extname(customInput))}.pdf`;
        const outputPath = path.join(outputDir, outputFile);

        return { inputPath, outputPath };
    }

    const inputFile = isAtsMode ? "resume-ats.html" : "resume.html";
    const outputFile = isAtsMode ? "resume-ats.pdf" : "resume.pdf";
    const inputPath = path.join(__dirname, inputFile);
    const outputPath = path.join(__dirname, "cv", outputFile);

    return { inputPath, outputPath };
}

(async () => {
    const isAtsMode = process.argv.includes("--ats");
    const customInput = getPositionalArg();
    const { inputPath, outputPath } = resolveInputAndOutput(isAtsMode, customInput);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

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
