const billAmountInput = document.getElementById('bill-amount');
const peopleAmountInput = document.getElementById('number-of-people');
const tipAmountRadioInputs = document.querySelectorAll('input[type="radio"]')
const customTipInput = document.getElementById('custom-tip');

const tipDisplay = document.getElementById('tip-per-person')
const totalDisplay = document.getElementById('total-per-person')

document.querySelector('button[type="reset')?.addEventListener('click', () => {
  tipDisplay.innerText = '$0.00'
  totalDisplay.innerText = '$0.00'
})

billAmountInput?.addEventListener('input', handleBillInput)
peopleAmountInput?.addEventListener('input', handlePeopleInput)
tipAmountRadioInputs.forEach(input => {
  input.addEventListener('input', handleTipRadioInput)
})
customTipInput?.addEventListener('input', handleCustomTipInput)

let tip = 0
let bill = 0
let people = 0

function handleBillInput () {
  updateView()
}

function handlePeopleInput () {
  updateView()
}

function handleTipRadioInput () {
  customTipInput.value = ''
  tip = this.id / 100
  updateView()
}

function handleCustomTipInput () {
  const customTip = this.value
  if (customTip > 100) {
    this.value = this.value.substring(0, this.value.length - 1)
    return
  }
  tip = customTip / 100
  tipAmountRadioInputs.forEach(input => {
    input.checked = false
  })
  updateView()
}

function updateView ({ clear = false } = {}) {
  if (clear) {
    tipDisplay.innerText = '$0.00'
    totalDisplay.innerText = '$0.00'
  }
  const people = peopleAmountInput.value * 1
  const bill = billAmountInput.value * 1
  const totalTip = bill * tip
  const tipPerPerson = totalTip / people
  const totalPerPerson = (bill + totalTip) / people
  const total = bill + totalTip

  if (people) {
    tipDisplay.innerText = `$${tipPerPerson.toFixed(2)}`
    totalDisplay.innerText = `$${totalPerPerson.toFixed(2)}`
  } else {
    tipDisplay.innerText = '$-.--'
    totalDisplay.innerText = '$-.--'
  }
}