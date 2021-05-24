// document.getElementById('celsius').value="0"
let celsiusInput = document.getElementById('celsius-input')
let fahrenheitInput = document.getElementById('fahrenheit-input')
const celsiusFormula = document.querySelector('.celsius')
const fahrenheitFormula = document.querySelector('.fahrenheit')
const celsiusDropDown = document.querySelector('.celsius-drop-down') 
const fahrenheitDropDown = document.querySelector('.fahrenheit-drop-down');

const handleDropdownChange = (e,dropdownElement,otherDropdownElement) => {
  //selected celsius on celsius dropdown select
  if (dropdownElement.selectedIndex == 1) {
    console.log("fahrenheit is selected")
    otherDropdownElement.selectedIndex = 1;    
    //selected fahrenheit on celsius dropdown
  } else {
    console.log("Celsius is selected on the first dropdown.")
    // swap drop-down selects
    otherDropdownElement.selectedIndex = 0;
    // restore inputs
    // celsiusInput.setAttribute('id', 'celsius-input')
    // celsiusInput = document.getElementById('celsius-input')
    // fahrenheitInput.setAttribute('id', 'fahrenheit-input')
    // fahrenheitInput = document.getElementById('fahrenheit-input')
  }
   // swap inputs
    celsiusInput.setAttribute('id', 'fahrenheit-input')
    celsiusInput.setAttribute('name', 'fahrenheit')
    fahrenheitInput.setAttribute('id', 'celsius-input')
    fahrenheitInput.setAttribute('name', 'celsius')
    // Remove Event listeners on inputs
    celsiusInput.removeEventListener('input', handleCelsiusInput);
    fahrenheitInput.removeEventListener('input', handleFahrenheitInput);

    celsiusInput = document.getElementById('celsius-input')  
    fahrenheitInput = document.getElementById('fahrenheit-input')
    // Set Event listeners on inputs
    celsiusInput.addEventListener('input', handleCelsiusInput);
    fahrenheitInput.addEventListener('input', handleFahrenheitInput);

  // celsiusInput.classList.replace('celsius-input', 'fahrenheit-input')
  // fahrenheitInput.classList.replace('fahrenheit-input', 'celsius-input')
}
// Swap C & F inputs via Celsius drop-down select
celsiusDropDown.addEventListener('change', e=>handleDropdownChange(e,celsiusDropDown,fahrenheitDropDown));
fahrenheitDropDown.addEventListener('change', e=>handleDropdownChange(e,fahrenheitDropDown,celsiusDropDown));
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
    celsiusFormula.innerText = `${""}`
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

