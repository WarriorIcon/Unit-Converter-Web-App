// document.getElementById('celsius').value="0"
let celsiusInput = document.getElementById('celsius-input')
let fahrenheitInput = document.getElementById('fahrenheit-input')
const celsiusFormula = document.querySelector('.celsius')
const fahrenheitFormula = document.querySelector('.fahrenheit')
const celsiusDropDown = document.querySelector('.celsius-drop-down') 
const fahrenheitDropDown = document.querySelector('.fahrenheit-drop-down');

// Swap C & F inputs via Celsius drop-down select
celsiusDropDown.addEventListener('change', (e) => {
  //selected celsius on celsius dropdown select
  if (celsiusDropDown.selectedIndex == 1) {
    console.log("fahrenheit is selected")
    fahrenheitDropDown.selectedIndex = 1
    // swap inputs
    celsiusInput.setAttribute('id', 'fahrenheit-input')
    celsiusInput = document.getElementById('fahrenheit-input')  
    fahrenheitInput.setAttribute('id', 'celsius-input')
    fahrenheitInput = document.getElementById('celsius-input')
    //    
    //selected fahrenheit on celsius dropdown
  } else {
    console.log("Celsius is selected on the dropdown.")
    // swap drop-down selects
    fahrenheitDropDown.selectedIndex = 0;
    // restore inputs
    celsiusInput.setAttribute('id', 'celsius-input')
    celsiusInput = document.getElementById('celsius-input')
    fahrenheitInput.setAttribute('id', 'fahrenheit-input')
    fahrenheitInput = document.getElementById('fahrenheit-input')
  }
  // celsiusInput.classList.replace('celsius-input', 'fahrenheit-input')
  // fahrenheitInput.classList.replace('fahrenheit-input', 'celsius-input')
});

// Listen for Celsius Inputs
celsiusInput.addEventListener('input', e => {

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
})

// Listen for Fahrenheit Input
fahrenheitInput.addEventListener('input', e => {
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
})

// (°F − 32) × 5/9 = °C



