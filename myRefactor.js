// Refactor design:
// 1. create a config object and use data attributes to store the DOM data in there as our source of all truth
// 2. forEach input add an event listener to call a calculate function on input event
// 3. determineAndCalculate(el) determines which input side is being used and 
//    calls the conversion function stored in the config on the input element and returns it
// 4. Call an updateDataObject function to update the config file with current input element value and 
//  the current converterd value for the other element.
// 5. Use forEach to to update Input.values with data from dataobject config
// 6. listen for dropdown change and call flipsides function
// 7. On app launch, initalize DOM so that it matches whats in the config file
// WIP: Change the formula with javascript when the selects change***

const inputs = document.querySelectorAll('input');
const selects = document.querySelectorAll('select');
const formulaNumbers = document.querySelectorAll('[class^="text"]')
const formula = document.querySelector('.formula')

// Our config object is the source of all truth
const config = {
  left: {
    value: null, type: "celsius", conversion: convertToFahrenheit, formulaNumber: null },  
  right: {
    value: null, type: "fahrenheit", conversion: convertToCelsius, formulaNumber: null }
}

function convertToFahrenheit(val) {
  const celsiusNumber = parseFloat(val);
  // celsiusFormula.innerText = celsiusNumber;  
  return (celsiusNumber * 9 / 5) + 32;
}

function convertToCelsius(val) {
  const fahrenheitNumber = parseFloat(val)  
  // Display a maximum of 3 decimal points celsius and if the result has no decimal points, don't display them.
  return parseFloat(((fahrenheitNumber - 32) * 5 / 9).toFixed(3));
}

/*
* This function uses the input elements' data-side to determines which calculation to run from
* the config object. It accesses config conversion key which stores the specific function to use for that side.
*/
function determineSideAndCalculate(el) {
  console.log(el.dataset.side)
  return config[el.dataset.side].conversion(el.value)
}

// update the config object with out calculated values
function updateConfigObject(el, conversion) {
   const inputSide = el.dataset.side
   for (let side in config) {
    config[side].value = inputSide === side ? el.value : conversion;
    config[side].formulaNumber = config[side].value
  } 
}

// get the values from the config object and put them in the DOM
function updateInputElements() {
  inputs.forEach(input => {
    input.value = config[input.dataset.side].value
  })
}

// get values from config object and put into formula-text
function updateFormulaNumber() {
  formulaNumbers.forEach( text => {
    text.innerText = config[text.dataset.side].formulaNumber
  } )
}
// update select value with config info
function updateSelectElements() {
  selects.forEach(select => {
    select.value = config[select.dataset.side].type;
  })
}

function flipSides() {
  const temp = {...config.left};
  config.left = {...config.right};
  config.right = temp;
  console.log("working on this")
  updateSelectElements()
  updateInputElements()
  updateFormulaNumber()
  updateFormula()
}

// perhaps some wonky logic in here? Something isn't updating.
function updateFormula() {
  if (config.left.type === "celsius") {
    formula.innerHTML = `(${config.left.formulaNumber}<b>°C</b> * 9 / 5) + 32 = ${config.right.formulaNumber}<b>°F</b>`
  } else formula.innerHTML = `(${config.right.formulaNumber}<b>°F</b> - 32) * 5 / 9 = ${config.left.formulaNumber}<b>°C</b>`
}

// When the user inputs a value into the input element, this function
// 1. converts the temperature
// 2. Updates the config object with the values
// 3. Takes the config values and updates the both Input Elements with them
inputs.forEach(input => input.addEventListener('input', e => {
  const conversion = determineSideAndCalculate(e.target)
  updateConfigObject(e.target, conversion)
  updateInputElements()
  updateFormulaNumber()
  updateFormula()
  updateSelectElements()
}))

//update config object on select drop-down change
selects.forEach(select => select.addEventListener('change', e => {
  flipSides()
  updateFormulaNumber()
  updateFormula()
}))

window.addEventListener('load', () => {
  updateInputElements();
  updateSelectElements();
  updateFormula()
  const butt = "0"
  formula.innerHTML = `(${butt} <b>°C</b> * 9 / 5) + 32 = Number<b>°F</b> `
});