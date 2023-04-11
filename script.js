const numberInputs = document.querySelectorAll("input[type='number']");
const allInputs = document.querySelectorAll("input")
const cardNumber = document.getElementById("number")
const cardName = document.getElementById("name")
const cardMonth = document.getElementById("month")
const cardYear = document.getElementById("year")
const cardCvc = document.getElementById("cvc")
const inputName = document.getElementById("card-name")
const inputNumber = document.getElementById("card-number")
const inputMonth = document.getElementById("card-month")
const inputYear = document.getElementById("card-year")
const inputCvc = document.getElementById("card-cvc")
const button = document.getElementById("btn")
const dateError = document.querySelector(".exp-date>span")
const form = document.querySelector("form")
const completeForm = document.querySelector(".form-complete")

inputName.addEventListener("keyup", (e) => {
    cardName.innerText = e.target.value;
})

inputNumber.addEventListener("keyup", (e) => {
    // cardNumber.innerText = e.target.value;
    cardNumber.innerText = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
})

inputMonth.addEventListener("keyup", (e) => {
    cardMonth.innerText = e.target.value;
})

inputYear.addEventListener("keyup", (e) => {
    cardYear.innerText = e.target.value;
})

inputCvc.addEventListener("keyup", (e) => {
    cardCvc.innerText = e.target.value;
})

button.addEventListener("click", (e) => {
    e.preventDefault();
    checkName()
    checkNumber()
    checkDate()
    checkCvc()
    let error = false
    allInputs.forEach(input => {
        if (input.classList.contains("error")) {
            error = true
        }
    })
    if (error == false) {
        form.classList.add("hidden")
        completeForm.classList.remove("hidden")
    }
})

function checkName() {

    let format = /^[a-zA-Z\s]*$/;
    if (inputName.value == "") {
        inputName.classList.add("error")
        inputName.nextElementSibling.classList.add("error");
        inputName.nextElementSibling.innerText = "Can't be blank"
    }
    else if (!inputName.value.match(format)) {
        inputName.classList.add("error")
        inputName.nextElementSibling.classList.add("error");
        inputName.nextElementSibling.innerText = "Use only letters"
    }
    else {
        inputName.classList.remove("error")
        inputName.nextElementSibling.classList.remove("error");
    }
}

function checkNumber() {
    let inputNumberValue = inputNumber.value.replace(/(\.)|(\s)/g, "")
    const cardMinNumber = 16;
    if (inputNumberValue.length == "") {
        inputNumber.classList.add("error")
        inputNumber.nextElementSibling.classList.add("error")
        inputNumber.nextElementSibling.innerText = "Can't be blank"
    }
    else if (inputNumberValue.length < cardMinNumber) {
        inputNumber.classList.add("error")
        inputNumber.nextElementSibling.classList.add("error")
        inputNumber.nextElementSibling.innerText = "Please insert card full number"
    }
    else {
        inputNumber.classList.remove("error")
        inputNumber.nextElementSibling.classList.remove("error");
    }
}

function checkDate() {

    const month = /^(1[012]|0?[1-9])$/.test(inputMonth.value)
    if (inputMonth.value == "" && inputYear.value == "") {
        inputMonth.classList.add("error")
        inputYear.classList.add("error")
        dateError.classList.add("error")
        dateError.innerText = "Can't be blank"
    }
    else if (inputMonth.value.length < inputMonth.minLength && inputYear.value.length < inputYear.minLength) {
        inputMonth.classList.add("error")
        inputYear.classList.add("error")
        dateError.classList.add("error")
        dateError.innerText = "Insert a valid date"
    }

    else if (month && inputYear.value.length < inputYear.minLength) {
        inputMonth.classList.remove("error")
        inputYear.classList.add("error")
        dateError.classList.add("error")
        dateError.innerText = "Insert a valid year"
    }
    else if (!month && inputYear.value.length == inputYear.minLength) {
        inputMonth.classList.add("error")
        inputYear.classList.remove("error")
        dateError.classList.add("error")
        dateError.innerText = "Insert a valid month"
    }
    else {
        inputMonth.classList.remove("error")
        inputYear.classList.remove("error")
        dateError.classList.remove("error")
    }
}

function checkCvc() {
    if (inputCvc.value == "") {
        inputCvc.classList.add("error")
        inputCvc.nextElementSibling.classList.add("error")
        inputCvc.nextElementSibling.innerText = "Can't be blank"
    }
    else if (inputCvc.value.length < inputCvc.minLength) {
        inputCvc.classList.add("error")
        inputCvc.nextElementSibling.classList.add("error")
        inputCvc.nextElementSibling.innerText = "Insert a valid CVC"
    }

    else {
        inputCvc.classList.remove("error")
        inputCvc.nextElementSibling.classList.remove("error")
    }
}

numberInputs.forEach(input => {
    input.oninput = () => {
        if (input.value.length > input.maxLength) {
            input.value = input.value.slice(0, input.maxLength)
        }
    }
})

document.addEventListener('DOMContentLoaded', () => {
    for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
        const pattern = el.getAttribute("placeholder"),
            slots = new Set(el.dataset.slots || "_"),
            prev = (j => Array.from(pattern, (c, i) => slots.has(c) ? j = i + 1 : j))(0),
            first = [...pattern].findIndex(c => slots.has(c)),
            accept = new RegExp(el.dataset.accept || "\\d", "g"),
            clean = input => {
                input = input.match(accept) || [];
                return Array.from(pattern, c =>
                    input[0] === c || slots.has(c) ? input.shift() || c : c
                );
            },
            format = () => {
                const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
                    i = clean(el.value.slice(0, i)).findIndex(c => slots.has(c));
                    return i < 0 ? prev[prev.length - 1] : back ? prev[i - 1] || first : i;
                });
                el.value = clean(el.value).join``;
                el.setSelectionRange(i, j);
                back = false;
            };
        let back = false;
        el.addEventListener("keydown", (e) => back = e.key === "Backspace");
        el.addEventListener("input", format);
        el.addEventListener("focus", format);
        el.addEventListener("blur", () => el.value === pattern && (el.value = ""));
    }
});