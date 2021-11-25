const resultEl = document.querySelector('#result');
const lengthEl = document.querySelector('#length');
const uppercaseEl = document.querySelector('#uppercase');
const lowercaseEl = document.querySelector('#lowercase');
const numbersEl = document.querySelector('#numbers');
const symbolsEl = document.querySelector('#symbols');
const generateEl = document.querySelector('#generate');
const clipboardEl = document.querySelector('#clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUppercase,
    number: getRandomNum,
    symbol: getRandomSymbol
}

generateEl.addEventListener('click', ()=> {

    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNum = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNum, hasSymbol, length);
})

function generatePassword(lower, upper, number, symbol, length){
    if(length > 20) {
        lengthEl.value = 20;
        length = 20
    }

    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}]
        .filter(item => Object.values(item)[0]);

    if (typesCount === 0) return '';

    for (let i = 0; i < length; i+=typesCount) {
        typesArr.forEach(()=> {
            const randomType = Math.floor(Math.random() * typesArr.length);
            const funcKey = Object.keys(typesArr[randomType])[0];
            generatedPassword += randomFunc[funcKey]();
        })
    }

    return generatedPassword.slice(0, length);
}

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUppercase(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNum(){
    return Math.floor(Math.random() * 10).toString();
}

function getRandomSymbol(){
    const symbols = '!#$%&()*+,()-:;<=>?@{}[]^_';
    const indexOfSymbol = Math.floor(Math.random() * symbols.length);
    return symbols[indexOfSymbol];
}

clipboardEl.addEventListener('click', (e)=> {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;
    const container = document.querySelector('.container');

    if (!password) return '';

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();

    // alert('Password copied to clipboard!');

    const notification = document.createElement('div');
    notification.classList.add('toast');
    notification.innerText = 'Password copied!';
    container.appendChild(notification);
    setTimeout(()=> {
        notification.remove()
    }, 1000)

})
