// document.getElementById('celsius').value="0"
const celsiusInput = document.getElementById('celsius')
const celsiusFormula = document.querySelector('.celsius')
const fahrenheitInput = document.getElementById('fahrenheit')
const fahrenheitFormula = document.querySelector('.fahrenheit')

celsiusInput.addEventListener('input', e => {
  celsiusFormula.innerText = celsiusInput.value;
  const celsiusNumber = parseFloat(celsiusInput.value);
  fahrenheitInput.value = (celsiusNumber * 9 / 5) + 32;
  fahrenheitFormula.innerText = `${fahrenheitInput.value}`;
  
})

fahrenheitInput.addEventListener('input', e => {
  fahrenheitFormula.innerText = `${fahrenheitInput.value}`;
  const fahrenheitNumber = parseFloat(fahrenheitInput.value)
  // Display a maximum of 3 decimal points celsius and if the result has no decimal points, don't display them.
  celsiusInput.value = parseFloat(((fahrenheitNumber - 32) * 5 / 9).toFixed(3));
  // Check if input is not a NaN. If NaN display nothing instead of NaN. Check that numbers were input with regex
  const regex = /^[0-9]+$/;
  if (!isNaN(celsiusInput.value) /*&& celsiusInput.value.match(regex)*/ ) {
    const celsiusNumber = celsiusInput.value;
    celsiusFormula.innerText = `${celsiusInput.value}`
  } else { 
    celsiusInput.value = "" 
    celsiusFormula.innerText = `${""}`
  }

})

// (°F − 32) × 5/9 = °C



