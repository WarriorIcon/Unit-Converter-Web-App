// document.getElementById('celsius').value="0"
const celsiusInput = document.getElementById('celsius')
const celsiusFormula = document.querySelector('.celsius')
const fahrenheitInput = document.getElementById('fahrenheit')
const fahrenheitFormula = document.querySelector('.fahrenheit')

celsiusInput.addEventListener('input', e => {
  celsiusFormula.innerText = celsiusInput.value;
  const celsiusNumber = parseFloat(celsiusInput.value);
  fahrenheitInput.value = (celsiusNumber * 9 / 5) + 32;
  fahrenheitFormula.innerHTML = `${fahrenheitInput.value}<strong>°F</strong>`;
  
})




