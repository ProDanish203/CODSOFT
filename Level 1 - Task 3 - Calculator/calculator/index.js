document.addEventListener('DOMContentLoaded', function () {
    const calculatorForm = document.forms['calc'];
    const display = calculatorForm.elements['txt'];

    const buttons = calculatorForm.getElementsByClassName('num');
    for (const button of buttons) {
        button.addEventListener('click', handleButtonClick);
    }

    function handleButtonClick(event) {
        const clickedButton = event.target;
        const buttonValue = clickedButton.textContent;

        switch (buttonValue) {
            case 'C':
                clearDisplay();
                break;
            case '=':
                calculateResult();
                break;
            default:
                updateDisplay(buttonValue);
                break;
        }
    }

    function clearDisplay() {
        display.value = '';
    }

    function updateDisplay(value) {
        display.value += value;
    }

    function calculateResult() {
        const expression = display.value.trim();

        if (expression) {
            try {
                display.value = eval(expression);
            } catch (error) {
                display.value = 'Error';
            }
        }else{
            alert("Field cannot be empty")
        }
    }
});
