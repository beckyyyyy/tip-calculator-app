const inputBill = document.querySelector('.input-bill')
const inputPeople = document.querySelector('.input-people')
const inputCustom = document.querySelector('.input-custom')
const inputContainer = document.querySelector('#input-container')
const percentBox = document.querySelector('.percent-box')
const eachPercentBtn = document.querySelectorAll('.percent-box button')
const customBtn = document.querySelector('.custom-percent')
const resetBtn = document.querySelector('.reset-btn')
const tipAmount = document.querySelector('.tip-amount')
const totalPrice = document.querySelector('.total-price')
const billTitle = document.querySelectorAll('.bill-title h3')
const peopleTitle = document.querySelectorAll('.people-title h3')

let finalBill = 0
let finalPeople = 0
let tipPercent = 0
let tipAmountPerPerson = 0
let totalPricePerPerson = 0

function calculate() {
    const finalTip = Number(tipPercent)
    tipAmountPerPerson = (finalBill * (finalTip / 100)) / finalPeople
    totalPricePerPerson = (finalBill / finalPeople) + tipAmountPerPerson
    //無條件進位小數點後兩位
    tipAmountPerPerson = Math.ceil(tipAmountPerPerson * 100) / 100
    totalPricePerPerson = Math.ceil(totalPricePerPerson * 100) / 100
    tipAmount.textContent = tipAmountPerPerson
    totalPrice.textContent = totalPricePerPerson
}

function countPricePerPerson() {
    if (inputBill.value && inputBill.value !== '0' && tipPercent !== 0 && inputPeople.value && inputPeople.value !== '0') {
        calculate()
    }
}

function alertZeroError(title) {
    title[1].classList.remove('d-none')
}

function removeZeroError(title) {
    title[1].classList.add('d-none')
}

percentBox.addEventListener('click', function displayClickedStyle(event) {
    const targetEvent = event.target
    if (targetEvent.matches('.custom-percent')) {
        eachPercentBtn.forEach((btn) => {
            btn.classList.remove('clicked')
            tipPercent = 0
        })
        customBtn.classList.add('d-none')
        inputCustom.classList.remove('d-none')
    }
    else {
        eachPercentBtn.forEach((btn) => {
            btn.classList.remove('clicked')
            tipPercent = 0
        })
        if (targetEvent.tagName === 'BUTTON' && !targetEvent.matches('.custom-percent')) {
            targetEvent.classList.add('clicked')
            customBtn.classList.remove('d-none')
            inputCustom.classList.add('d-none')
            tipPercent = targetEvent.dataset.rate
            countPricePerPerson()
        }
    }
})

inputCustom.addEventListener('click', (event) => {
    inputCustom.value = ''
})

inputCustom.addEventListener('input', (event) => {
    tipPercent = inputCustom.value
    countPricePerPerson()
})

inputBill.addEventListener('input', function () {
    if (inputBill.value === '0') {
        alertZeroError(billTitle)
    } else {
        removeZeroError(billTitle)
        finalBill = Number(inputBill.value)
        countPricePerPerson()
    }
})

inputPeople.addEventListener('input', function () {
    if (inputPeople.value === '0') {
        alertZeroError(peopleTitle)
    } else {
        removeZeroError(peopleTitle)
        finalPeople = Number(inputPeople.value)
        countPricePerPerson()
    }
})

resetBtn.addEventListener('click', function displayReset() {
    inputBill.value = ''
    inputPeople.value = ''
    eachPercentBtn.forEach((btn) => {
        btn.classList.remove('clicked')
        tipPercent = 0
    })
    customBtn.classList.remove('d-none')
    inputCustom.classList.add('d-none')
    tipAmount.textContent = '0'
    totalPrice.textContent = '0'
    removeZeroError(billTitle)
    removeZeroError(peopleTitle)
})