// document.getElementById('celsius').value="0"
const celsiusInput = document.getElementById('celsius-input')
const celsiusFormula = document.querySelector('.celsius')
const fahrenheitInput = document.getElementById('fahrenheit-input')
const fahrenheitFormula = document.querySelector('.fahrenheit')
const celsiusDropDown = document.querySelector('.celsius-drop-down') 
const fahrenheitDropDown = document.querySelector('.fahrenheit-drop-down');

celsiusDropDown.addEventListener('change', (e) => {
  if (celsiusDropDown.selectedIndex == 0) {
    console.log("Celsius is selected on the dropdown.")
  } else console.log("fahrenheit is selected")
  celsiusInput.classList.replace('celsius-input', 'fahrenheit-input')
  fahrenheitInput.classList.replace('fahrenheit-input', 'celsius-input')
});

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



