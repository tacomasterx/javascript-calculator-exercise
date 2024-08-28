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
    return parseFloat( bufferElement.innerHTML );
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

function getOperator() {
    var operatorElement = document.getElementById("hidden-operator");
    return operatorElement.value;
}

function performOperation() {
    var textbox = document.getElementById("screen-textbox");
    var newValue = 0;
    var operator = "";
    var lastValue = 0;
    var resultValue = 0;
    newValue = parseFloat( textbox.value );
    lastValue = getBuffer();
    operator = getOperator();
    switch (operator) {
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

        case "add":
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

function regularOperatorButtonPressed(operator) {
    var operatorElement = document.getElementById("hidden-operator");
    var newElement = document.getElementById("screen-textbox");
    var newValue = parseFloat( newElement.value );
    operatorElement.value = operator;
    setBuffer(newValue);
    document.getElementById("hidden-action").value = "true";
}

function singleOperatorButtonPressed(operator) {
    var operatorElement = document.getElementById("hidden-operator");
    var newElement = document.getElementById("screen-textbox");
    var newValue = parseFloat( newElement.value );
    operatorElement.value = operator;
    var resultValue = performOperation(newValue);
    newElement.value = resultValue;
    document.getElementById("hidden-action").value = "true";
}

function changeSignButtonPressed() {
    var textbox = document.getElementById("screen-textbox");
    var value = parseFloat( textbox.value );
    value = value * -1;
    textbox.value = value;
}

function dotButtonPressed() {
    var textbox = document.getElementById("screen-textbox");
    var text = textbox.value;
    if (text.includes(".")) {
        return;
    }
    text = text + ".";
    textbox.value = text;
}

function equalButtonPressed() {
    var textbox = document.getElementById("screen-textbox");
    var resultValue = performOperation();
    textbox.value = resultValue;
    refreshHistoryArray(resultValue);
    // document.getElementById("hidden-operator").value = "";
    document.getElementById("hidden-action").value = "true";
}

function backspaceButtonPressed() {
    var textbox = document.getElementById("screen-textbox");
    var text = textbox.value;
    var size = text.length;
    var result = text.substring(0, size-1);
    if (result == "") {
        result = "" + 0;
    }
    textbox.value = result;
}

function clearButtonPressed() {
    document.getElementById("screen-textbox").value = 0;
}

function clearEverythingButtonPressed() {
    document.getElementById("screen-textbox").value = 0;
    for (i=0; i<4; i++) {
        document.getElementById("history-" + i).innerHTML = 0;
    }
    document.getElementById("buffer").innerHTML = 0;
    document.getElementById("hidden-operator").value = 0;
}

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case "0":
            numberButtonPressed(0);
            break;

        case "1":
            numberButtonPressed(1);
            break;

        case "2":
            numberButtonPressed(2);
            break;

        case "3":
            numberButtonPressed(3);
            break;

        case "4":
            numberButtonPressed(4);
            break;

        case "5":
            numberButtonPressed(5);
            break;

        case "6":
            numberButtonPressed(6);
            break;

        case "7":
            numberButtonPressed(7);
            break;

        case "8":
            numberButtonPressed(8);
            break;

        case "9":
            numberButtonPressed(9);
            break;

        case "-":
            regularOperatorButtonPressed("substract");
            break;

        case "+":
            regularOperatorButtonPressed("add");
            break;

        case "*":
            regularOperatorButtonPressed("multiplicate");
            break;

        case "/":
            regularOperatorButtonPressed("divide");
            break;

        case "Backspace":
            backspaceButtonPressed();
            break;

        case "c":
            clearButtonPressed();
            break;

        case "Escape":
            clearButtonPressed();
            break;

        case ".":
            dotButtonPressed();
            break;

        case "=":
            equalButtonPressed();
            break;

        case "Enter":
            equalButtonPressed();
            break;

        default:
            console.log(event.key);
            break;
    }
});
