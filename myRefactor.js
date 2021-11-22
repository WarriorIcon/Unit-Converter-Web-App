/* 
* This is the code the application actually uses
* The "originalScript.js" file is just a memento of my first attempt
* at making a project myself. 
* Soonafter I  refactored the code using a React.js code paradigm and
* that's what you see in this file here. 
*/
const inputs = document.querySelectorAll('input');
const selects = document.querySelectorAll('select');
const formula = document.querySelector('.formula')

// Our config object is the source of all truth
let config = {
  left: { value: 0, type: "celsius", conversion: 'toFahrenheit', formulaNumber: null },  
  right: {value: 32, type: "fahrenheit", conversion: 'toCelsius', formulaNumber: null },
}

const conversions = {
  toFahrenheit(val) {
    const celsiusNumber = parseFloat(val); 
    return parseFloat(((celsiusNumber * 9 / 5) + 32).toFixed(3));
  },

  toCelsius(val) {
    const fahrenheitNumber = parseFloat(val)  
    // Display a maximum of 3 decimal points celsius and if the result has no decimal points, don't display them.
    return parseFloat(((fahrenheitNumber - 32) * 5 / 9).toFixed(3));
  }
}

function checkRegex(value) {
  // Check that input numbers validate via regular expression & handle potential NaN output. 
  const regex = /[+-]?([0-9]*[.])?[0-9]+/; 
  if (String(value).match(regex) && !isNaN(value)) {    
    return value
  } else { 
    return value = false
  }
}

/*
* This function uses the input elements' data-side to determines which calculation to run from
* the config object. It accesses config conversion key which stores the specific function to use for that side.
*/
function calculate(side, value) {
  value = checkRegex(value)
  if (value !== false) {
    const conversion = conversions[config[side].conversion]
    return conversion(value)
  } else return ""
}

// update the config object with the input value and the converted value for the other
function updateConfigObjectInputValues(el, conversion) {
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

// update select value with config info
function updateSelectElements() {
  selects.forEach(select => {
    select.value = config[select.dataset.side].type;
  })
}

// Update the DOM formula numbers with value from the config obkect
function updateFormula() {
  const left = isNaN(config.left.value) ? ' ' : config.left.formulaNumber
  const right = isNaN(config.right.value) ? ' ' : config.right.formulaNumber

  if (config.left.type === "celsius") {
    formula.innerHTML = `(${left}<b>°C</b> * 9 / 5) + 32 = ${right}<b>°F</b>`
  } else formula.innerHTML = `(${left}<b>°F</b> - 32) * 5 / 9 = ${right}<b>°C</b>`
}

/*
* When the user inputs a value into the input element, this function
* 1. converts the temperature
* 2. Updates the config object with the values
* 3. Takes the config values and updates the both Input Elements with them
*/
inputs.forEach(input => input.addEventListener('input', e => {
  const el = e.target;
  const conversion = calculate(el.dataset.side, el.value);
  updateConfigObjectInputValues(e.target, conversion)
  updateInputElements();
  updateFormula();
}))

function getOtherSide(side) {
  return side === 'left' ? 'right' : 'left'
}
/*
 * HTML selectors will flip the calculations when changed so 
 * the new conversion value is displayed for the corresponding input.
 * The `config` object is reassigned to a new object containing all of the
 * updated data.
*/
selects.forEach(select => select.addEventListener('change', e => {
  const el = e.target
  const side = e.target.dataset.side
  const otherSide = getOtherSide(side)
  const conversion = calculate(otherSide, config[side].value)
  config = {
    [side]: {
      value: config[side].value,
      type: el.value,
      conversion: config[otherSide].conversion,
      formulaNumber: config[side].value,
    },
    [otherSide]: {
      value: conversion,
      type: config[side].type,
      conversion: config[side].conversion,
      formulaNumber: conversion,
    },
  };
  updateInputElements();
  updateSelectElements();
  updateFormula()
}))

window.addEventListener('load', () => {
  updateInputElements();
  updateSelectElements();
  // updateFormula()
  formula.innerHTML = `(0<b>°C</b> * 9 / 5) + 32 = 32<b>°F</b> `
});