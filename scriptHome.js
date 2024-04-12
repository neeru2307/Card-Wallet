const masterCardImage = document.getElementById('mastercard-image');
const visaImage = document.getElementById('visa-image');
const cardForm = document.getElementById('card-form');
const userIcon = document.getElementById('user-icon');
const cardTableBody = document.getElementById('card-table-body');
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
const expiryDateInput = document.getElementById('expirydate');
const cardNumInput = document.getElementById('cardnumber');
const cvvInput = document.getElementById('cvv');
const visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const mastercardPattern = /^(?:5[1-5][0-9]{14})$/;

window.onload = function () {
    displaySavedCards();
};

userIcon.addEventListener('click', toggleDropdown);

document.getElementById('add-icon').addEventListener('click', toggleCardForm);

cardForm.addEventListener('submit', handleCardFormSubmission);

cardNumInput.addEventListener('keyup', handleCardNumberInput);
cardNumInput.addEventListener('keyup', () => {
    isCardNumValid(cardNumInput.value);
});

expiryDateInput.addEventListener('keyup', handleExpiryDateInput);
expiryDateInput.addEventListener('blur', () => {
    isExpiryDateValid(expiryDateInput.value);
});

cvvInput.addEventListener('keyup', handleCvvInput);
// cvvInput.addEventListener('blur', () => {
//     isCvvValid(cvvInput.value);
// });

document.getElementById('logout').addEventListener('click', handleLogout);


function toggleDropdown() {
    const dropDownContent = document.getElementById('dropdown-content');
    dropDownContent.style.display = dropDownContent.style.display === 'block' ? 'none' : 'block';
}

function toggleCardForm() {
    cardForm.style.display = cardForm.style.display === 'block' ? 'none' : 'block';
}

function handleCardFormSubmission(event) {
    event.preventDefault();

    const cardHolder = document.getElementById('cardholder').value;
    const cardNumber = cardNumInput.value;
    const expiryDate = expiryDateInput.value;
    const cvv = cvvInput.value;

    if (isValidCard(cardNumber, expiryDate, cvv)) {
        saveCardDetails(cardHolder, cardNumber, expiryDate, cvv);
        displaySavedCards();
        hideCardImages();
        cardForm.style.display = 'none';
        
    } 
}

function handleCardNumberInput() {
    const cardNumber = cardNumInput.value;

    if (visaPattern.test(cardNumber)) {
        showCardImage(visaImage);
    } else if (mastercardPattern.test(cardNumber)) {
        showCardImage(masterCardImage);
    } else {
        hideCardImages();
    }
}

function handleExpiryDateInput(event) {
    const input = event.target;
    const value = input.value;

    if (value.length === 2 && !value.includes('/')) {
        input.value = value + '/';
    }

    const inputDate = input.value;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const inputMonth = parseInt(inputDate.split('/')[0], 10);
    const inputYear = parseInt(inputDate.split('/')[1], 10);

    if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
        displayError("Expiry date must be greater than or equal to the current state.", 'expiry_error');
    } else {
        displayError('', 'expiry_error', false);
    }
}

function handleCvvInput() {
    const cvv = cvvInput.value;

    if (!/^[0-9]{3}$/.test(cvv)) {
        displayError("CVV must be a 3 digit number", 'cvv-error');
    } else {
        displayError('', 'cvv-error', false);
    }
}

function isValidCard(cardNumber, expiryDate, cvv) {
    return isCardNumValid(cardNumber) && isExpiryDateValid(expiryDate) && isCvvValid(cvv);
}

function isCardNumValid(cardNumber){
    if(visaPattern.test(cardNumber) || mastercardPattern.test(cardNumber)){
        displayError('', 'cardNum_error', false);
        return true; 
    }
    else{
        displayError("Card Number is not valid", 'cardNum_error');
        return false;
    }
}

function isExpiryDateValid(expiryDate) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const inputMonth = parseInt(expiryDate.split('/')[0], 10);
    const inputYear = parseInt(expiryDate.split('/')[1], 10);
    
    if(inputYear > currentYear || (inputYear === currentYear && inputMonth >= currentMonth)){
        return true; 
    }
    else{
        displayError("Expiry date is not valid", 'expiry_error');
        return false;
    }
}

function isCvvValid(cvv) {
    if (!/^[0-9]{3}$/.test(cvv)) {
        displayError("CVV must be a 3 digit number", 'cvv-error');
        return false;
    } else {
        return true;
    }
}

function saveCardDetails(cardHolder, cardNumber, expiryDate, cvv) {
    const existingCards = JSON.parse(localStorage.getItem(currentUser.username + '_cards')) || [];
    const newCard = { cardHolder, cardNumber, expiryDate, cvv };

    if (!isCardNumberUnique(cardNumber, existingCards)) {
        displayError('Card with this number already exists.', 'cardNum_error');
        // alert('Card with this number already exists. Please enter a unique card number.');
        return;
    }

    existingCards.push(newCard);
    localStorage.setItem(currentUser.username + '_cards', JSON.stringify(existingCards));
    cardForm.reset();
}

function isCardNumberUnique(newCardNumber, existingCards) {
    return !existingCards.some(card => card.cardNumber === newCardNumber);
}

function displaySavedCards() {
    cardTableBody.innerHTML = '';

    const savedCards = JSON.parse(localStorage.getItem(currentUser.username + '_cards')) || [];

    savedCards.reverse();

    savedCards.forEach(card => {
        const row = cardTableBody.insertRow();
        row.insertCell(0).textContent = card.cardHolder;
        row.insertCell(1).textContent = card.cardNumber;
        row.insertCell(2).textContent = card.expiryDate;
        row.insertCell(3).textContent = card.cvv;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteCard(card.cardNumber));
        row.insertCell(4).appendChild(deleteButton);
    });
}

function deleteCard(cardToDelete) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    let existingCards = JSON.parse(localStorage.getItem(currentUser.username + '_cards')) || [];

    const updatedCards = existingCards.filter(card => card.cardNumber !== cardToDelete.toString());

    localStorage.setItem(currentUser.username + '_cards', JSON.stringify(updatedCards));
    displaySavedCards();
}

function showCardImage(imageElement) {
    visaImage.style.display = imageElement === visaImage ? 'block' : 'none';
    masterCardImage.style.display = imageElement === masterCardImage ? 'block' : 'none';
}

function hideCardImages() {
    visaImage.style.display = 'none';
    masterCardImage.style.display = 'none';
}

function displayError(message, errorDivClass, isVisible = true) {
    const errorDiv = document.querySelector(`.${errorDivClass}`);
    errorDiv.textContent = message;
    errorDiv.style.display = isVisible ? 'block' : 'none';
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.replace('index.html');
}
