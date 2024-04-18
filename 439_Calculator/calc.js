const display = document.getElementById("display");
const autodisplay = document.getElementById("placeholderResult");
const history = document.getElementById("history");
let autocompute = false;

function clearDisplay() {
    display.value = "";
    autodisplay.value = "";
    autocompute = false;
}

function deleteFromDisplay() {
    display.value = display.value.slice(0, -1);
    autodisplay.value = "";
    autocompute = false;
}

function updateHistory(calculation) {
    const historyItem = document.createElement("p");
    historyItem.textContent = calculation;
    const historyItems = history.getElementsByTagName("p");
    if (historyItems.length > 0) {
        history.insertBefore(historyItem, historyItems[0].nextSibling);
    } else {
        history.appendChild(historyItem);
    }
}

function appendToDisplay(input) {
    if (autocompute) {
        clearDisplay();
    }

    if (input === "=") {
        calculate();
    } else {
        display.value += input;
    }
}



function calculate() {
    try {
        const expression = display.value;
        const result = eval(expression);
        updateHistory(`${expression} = ${result}`);
        autodisplay.value = result;
        autocompute = true;
    } catch (error) {
        display.value = "ERROR";
        autocompute = false;
    }
}

function toggleSign() {
    const currentValue = parseFloat(display.value);
    if (!isNaN(currentValue)) {
        display.value = -currentValue;
    }
}

function updatePlaceholderResult() {
    try {
        const result = eval(display.value);
        autodisplay.value = result;
    } catch (error) {
        autodisplay.value = "";
    }
}

function toggleHistory() {
    const historyWidth = history.style.width;
    const txthide = document.getElementById("txthide");
    if (historyWidth === "300px") {
        history.style.width = "0";
        txthide.style.color = "transparent";
        history.style.color = "transparent";
    } else {
        history.style.width = "300px";
        txthide.style.color = "#807e7e";
        history.style.color = "#807e7e";
    }
}

