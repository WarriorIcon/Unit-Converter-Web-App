// still to do, 1. change the formula on input change, 2. add new drop-down for cm to inches, 3. refactor for drop-down larger than 3

let celsiusInput = document.getElementById('celsius-input')
let fahrenheitInput = document.getElementById('fahrenheit-input')
const celsiusFormula = document.querySelector('.celsius')
const fahrenheitFormula = document.querySelector('.fahrenheit')
const celsiusDropDown = document.querySelector('.celsius-drop-down') 
const fahrenheitDropDown = document.querySelector('.fahrenheit-drop-down');

// Create function to handle drop-down select changes
const dropDownHandler = (e, dropDownElement, otherDropDownElement) => {
  //selected fahreneit on 1st dropdown select
  if (dropDownElement.selectedIndex == 1) {
    console.log("fahrenheit is selected on the first dropdown")
    otherDropDownElement.selectedIndex = 1;
    //first drop-down has fahrenheit selected
  } else {
    console.log("Celsius is selected on the first dropdown")
    // swap drop-down selects
    otherDropDownElement.selectedIndex = 0;
  } // live flip the input values. 
  flipValues(celsiusInput, fahrenheitInput)
  // swap inputs
  celsiusInput.setAttribute('id', 'fahrenheit-input')
  fahrenheitInput.setAttribute('id', 'celsius-input')

  // remove event listeners on the inputs
  celsiusInput.removeEventListener('input', handleCelsiusInput);
  fahrenheitInput.removeEventListener('input', handleFahrenheitInput);
  // update the DOM
  celsiusInput = document.getElementById('celsius-input')  
  fahrenheitInput = document.getElementById('fahrenheit-input')
  // Set Event listeners on inputs
  celsiusInput.addEventListener('input', handleCelsiusInput);
  fahrenheitInput.addEventListener('input', handleFahrenheitInput);
};

// Listen for drop-down select changes, call the handler function
celsiusDropDown.addEventListener('change', e => dropDownHandler(e,celsiusDropDown,fahrenheitDropDown));
fahrenheitDropDown.addEventListener('change', e => dropDownHandler(e,fahrenheitDropDown,celsiusDropDown));

const handleCelsiusInput = e => {
  celsiusFormula.innerText = celsiusInput.value;
  const celsiusNumber = parseFloat(celsiusInput.value);
  fahrenheitInput.value = (celsiusNumber * 9 / 5) + 32;
  // check if NaN, output nothing if NaN.
  // In a larger application I would put this in it's own function since we reuse once.
  if (isNaN(fahrenheitInput.value)) {
    fahrenheitInput.value = " ";
    fahrenheitFormula.innerText = "";
  } else { 
    fahrenheitFormula.innerText = `${fahrenheitInput.value}`;
  }
  if (isNaN(celsiusInput.value)) {
    celsiusFormula.innerText = "";
    fahrenheitFormula.innerText = "";
    fahrenheitInput.value= "";
  }
}

const handleFahrenheitInput = e => {
  fahrenheitFormula.innerText = `${fahrenheitInput.value}`;
  const fahrenheitNumber = parseFloat(fahrenheitInput.value)
  // Display a maximum of 3 decimal points celsius and if the result has no decimal points, don't display them.
  celsiusInput.value = parseFloat(((fahrenheitNumber - 32) * 5 / 9).toFixed(3));
  // Check that numbers were input match via regular expression. I just wanted to try regex here.
  const regex = /[+-]?([0-9]*[.])?[0-9]+/; 
  if (celsiusInput.value.match(regex)) {    
    celsiusFormula.innerText = `${celsiusInput.value}`
  } else { 
    celsiusInput.value = "" 
    celsiusFormula.innerText = ""
  }
  if (isNaN(fahrenheitInput.value)) {
    fahrenheitFormula.innerText = "";
    celsiusInput.value = "";
    celsiusFormula.innerText = "";
  }
}

// Listen for Celsius Inputs
celsiusInput.addEventListener('input', handleCelsiusInput);

// Listen for Fahrenheit Input
fahrenheitInput.addEventListener('input', handleFahrenheitInput);

// (°F − 32) × 5/9 = °C

//working on a function to flip values
function flipValues(firstElement, secondElement) {
  let temp = firstElement.value
  firstElement.value = secondElement.value
  secondElement.value = temp
  console.log("This flip function worked")
}

