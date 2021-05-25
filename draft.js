// just for drafting a function based on what works. Will remove this file later
function flipValues(firstValue, secondValue) {
  let temp = firstValue
  firstValue = secondValue
  secondValue = temp 
}

const temp = celsiusInput.value
celsiusInput.value = fahrenheitInput.value
fahrenheitInput.value = temp 