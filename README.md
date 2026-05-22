# digital-garden
My personal website (i.e., my digital garden to tend to). Contains my social links, portfolio, CV, and things I love (and don’t), inspired by lightweight HTML‑first websites.

# How to
## Generate my resume from the timeline
`node generate-resume.js`

## Generate ATS-friendly resume
`node generate-resume.js --ats`

## Generate a tailored resume from any HTML file
`node generate-resume.js path/to/custom-resume.html`

Writes the PDF to `resumes/` using the input file basename, e.g. `apple-hardware-robotics-test.html` becomes `resumes/apple-hardware-robotics-test.pdf`.

## Under construction
Here's a list of what's coming:
* dynamic scrolling with added images!
* site visitor visualizer
