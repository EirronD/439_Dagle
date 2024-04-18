const textColorInput = document.getElementById("text-color");
const bgColorInput = document.getElementById("bg-color");
const previewText = document.getElementById("preview");
const ratingElement = document.getElementById("rating");

function hexToRGB(colorValue) {
    return [
        parseInt(colorValue.substring(1, 3), 16),
        parseInt(colorValue.substring(3, 5), 16),
        parseInt(colorValue.substring(5, 7), 16)
    ];
}

function getRelativeLuminance(color) {
    const sRGB = color.map(val => val / 255 < 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4));
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

function calculateContrastRatio(color1, color2) {
    const [luminance1, luminance2] = [getRelativeLuminance(color1), getRelativeLuminance(color2)];
    const [light, dark] = [Math.max(luminance1, luminance2), Math.min(luminance1, luminance2)];
    return (light + 0.05) / (dark + 0.05);
}

function determineRating(contrastVal) {
    if (contrastVal > 12) {
        return { color: "#69eb67", text: "Super" };
    } else if (contrastVal > 7) {
        return { color: "#b7ea84", text: "Very Good" };
    } else if (contrastVal > 5) {
        return { color: "#f7d658", text: "Good" };
    } else if (contrastVal > 3) {
        return { color: "#f17a55", text: "Poor" };
    } else {
        return { color: "#f24646", text: "Very Poor" };
    }
}

function updateTextPreviewAndRating() {
    const textColor = hexToRGB(textColorInput.value);
    const bgColor = hexToRGB(bgColorInput.value);
    const contrast = calculateContrastRatio(textColor, bgColor).toFixed(2);
    const { color, text } = determineRating(contrast);

    previewText.style.backgroundColor = `rgb(${bgColor.join(',')})`;
    previewText.style.color = `rgb(${textColor.join(',')})`;

    ratingElement.innerText = text;
    ratingElement.style.backgroundColor = color;
}

textColorInput.addEventListener("input", updateTextPreviewAndRating);
bgColorInput.addEventListener("input", updateTextPreviewAndRating);

window.addEventListener("load", updateTextPreviewAndRating);
