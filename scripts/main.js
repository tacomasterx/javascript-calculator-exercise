const SCREEN_MAX_LEN = 23;

function getHistoryArray() {
    var historyArray = [0,0,0,0];
    for (var i = 0; i<4; i++) {
        var element = document.getElementById("history-" + i);
        historyArray[i] = parseFloat(element.innerHTML);
    }
    return historyArray;
}

function getBuffer() {
    var bufferElement = document.getElementById("buffer");
    return parseFloat( bufferElement.value );
}

function setBuffer(newValue) {
    var bufferElement = document.getElementById("buffer");
    bufferElement.innerHTML = newValue;
}

function refreshHistoryArray(newValue) {
    for (i=3; i>0; i--) {
        var element = document.getElementById("history-" + i);
        element.innerHTML = document.getElementById("history-" + ( i-1 )).innerHTML;
    }
    document.getElementById("history-0").innerHTML = newValue;
}

function getOperand() {
    var operandElement = document.getElementById("hidden-operand");
    return operandElement.value;
}

function performOperation() {
    var textBox = document.getElementById("screen-textbox");
    var newValue = 0;
    var operand = "";
    var lastValue = 0;
    var resultValue = 0;
    if ( isNumeric( textBox.value ) ) {
        newValue = parseFloat( textBox.value );
    }
    lastValue = getBuffer();
    operand = getOperand();
    switch (operand) {
        case "percent":
            resultValue = (newValue * lastValue) / 100;
            break;

        case "inverse":
            if (newValue != 0) {
                resultValue = 1 / newValue;
            } else {
                resultValue = "Error: Division by zero.";
            }
            break;

        case "square":
            resultValue = Math.pow(newValue, 2);
            break;

        case "square_root":
            if (newValue >= 0) {
                resultValue = Math.sqrt(newValue);
            } else {
                resultValue = "Error: Imaginary number.";
            }
            break;

        case "divide":
            if (newValue != 0) {
                resultValue = lastValue / newValue;
            } else {
                resultValue = "Error: Division by zero.";
            }
            break;

        case "multiplicate":
            resultValue = lastValue * newValue;
            break;

        case "substract":
            resultValue = lastValue - newValue;
            break;

        case "sum":
            resultValue = newValue + lastValue;
            break;

        case "change_sign":
            resultValue = newValue * -1;
            break;

        default:
            resultValue = newValue;
            break;
    }
    return resultValue;
}

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function numberButtonPressed(number) {
    var number = parseInt(number);
    var textbox = document.getElementById("screen-textbox");
    var actionElement = document.getElementById("hidden-action");
    if (textbox.value == "0" || actionElement.value == "true") {
        textbox.value = "" + number;
        actionElement.value = "false";
    } else if (textbox.value.length < SCREEN_MAX_LEN) {
        textbox.value = textbox.value + "" + number;
    } 
}

function regularOperandButtonPressed(operand) {
    var operandElement = document.getElementById("hidden-operand");
    var newElement = document.getElementById("screen-textbox");
    var newValue = newElement.value;
    operandElement.value = operand;
    refreshHistoryArray(newValue);
    newElement.value = 0;
    document.getElementById("hidden-action").value = "true";
}

function equalButtonPressed() {
    var textbox = document.getElementById("screen-textbox");
    var resultValue = performOperation();
    textbox.value = resultValue;
    refreshHistoryArray(resultValue);
    document.getElementById("hidden-action").value = "true";
}

function clearTextboxButtonPressed() {
    var textbox = document.getElementById("screen-textbox");
    textbox.value = 0;
}

function clearAllButtonPressed() {
    document.getElementById("screen-textbox").value = 0;
    for (i=0; i<4; i++) {
        document.getElementById("history-" + i).innerHTML = 0;
    }
    document.getElementById("buffer").value = 0;
    document.getElementById("hidden-operand").value = 0;
}
