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
  const fahrenheitNumber = parseFloat(fahrenheitInput.value)
  celsiusInput.value = Math.round((fahrenheitNumber - 32) * 5 / 9);
  const celsiusNumber = celsiusInput.value
  celsiusInput.value = celsiusNumber;
  fahrenheitFormula.innerText = `${fahrenheitInput.value}`;
  celsiusFormula.innerText = `${celsiusInput.value}`
})

// (°F − 32) × 5/9 = °C


