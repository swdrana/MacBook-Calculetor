const calculetorBody = document.getElementsByClassName('calculetor-body');
// Close Button Event 
const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click',hideWindow);
function hideWindow(){
    calculetorBody[0].style.display='none';
    isMinimize = true;
}
// Minimize Button Event
let isMinimize = false;
const minBtn = document.getElementById('min-btn');
minBtn.addEventListener('click',function (){
    hideWindow();
});
//Dock/Taskbar Event
const calIcon = document.getElementById('cal-icon');
calIcon.addEventListener('click',function(){
    if(isMinimize){
        calculetorBody[0].style.display='block';
        isMinimize=true;
    }
});
//Maximize Button Event
const maxBtn = document.getElementById('max-btn');
maxBtn.addEventListener('click', function(event){
    calculetorBody[0].style.transform='rotate(45deg)';
    calculetorBody[0].style.transition='1s';
    event.stopPropagation();
});
// Body Event
const body =document.getElementsByTagName('body');
body[0].addEventListener('click', function (){
    calculetorBody[0].style.transform='rotate(0deg)';
});

/*  ======================================================
                        Internet
    ====================================================== */
const exponentialToDecimal = exponential => {
    let decimal = exponential.toString().toLowerCase();
    if (decimal.includes('e+')) {
        const exponentialSplitted = decimal.split('e+');
        let postfix = '';
        for (
            let i = 0;
            i <
            +exponentialSplitted[1] -
                (exponentialSplitted[0].includes('.') ? exponentialSplitted[0].split('.')[1].length : 0);
            i++
        ) {
            postfix += '0';
        }
        const addCommas = text => {
            let j = 3;
            let textLength = text.length;
            while (j < textLength) {
                text = `${text.slice(0, textLength - j)},${text.slice(textLength - j, textLength)}`;
                textLength++;
                j += 3 + 1;
            }
            return text;
        };
        decimal = addCommas(exponentialSplitted[0].replace('.', '') + postfix);
    }
    if (decimal.toLowerCase().includes('e-')) {
        const exponentialSplitted = decimal.split('e-');
        let prefix = '0.';
        for (let i = 0; i < +exponentialSplitted[1] - 1; i++) {
            prefix += '0';
        }
        decimal = prefix + exponentialSplitted[0].replace('.', '');
    }
    return decimal;
};
/*  ======================================================
                        Internet
    ====================================================== */

/****************************************************
        Top And Dock/Taskbar area work end here  
****************************************************/

/****************************************************
        Dispaly area work Start From here  
****************************************************/

const display=document.getElementById('display');
let displayNumber = stringToNum();
function stringToNum(){
    let text = display.innerText;
    let num = parseFloat(text.replace(',',''));
    return exponentialToDecimal(num);
}

function setDisplay(num){
    let len = displayNumber.toString().length;
    if( len > 7){
        display.style.fontSize = '30px';
        display.innerText=num; //.toExponential(7)
    }else {
        display.style.fontSize = '55px';
        display.innerText=num;
    }
}
//all clear button ok
const ac = document.getElementById('ac');
ac.addEventListener('click',function (){
    clear();
});
function clear(){
    displayNumber = 0;
    setDisplay(displayNumber);
    isDotAvilable = false;
}

// Plus Minus Button ok 
const plusMinus = document.getElementById('plus-minus');
plusMinus.addEventListener('click',function(){
    if(display.innerText[0]!='-' || display.innerText[0]!='0.'){
        displayNumber *= -1;
        setDisplay(displayNumber);
    }else if(display.innerText[0] == 0){
        //do nothing
    }else{
        displayNumber *= -1;
        setDisplay(displayNumber);
    }
});

//parsent % Button 
const persentBtn = document.getElementById('parsent');
persentBtn.addEventListener('click',function(){
    let persentNo = displayNumber /= 100;
    setDisplay(persentNo);
});

/****************************************************
        Number Button Work Start From Here  
****************************************************/

let numBtn = document.getElementsByClassName('num-btn');
for(let pressBtn of numBtn){
    pressBtn.addEventListener('click',function(event){
        let eventNo = event.target.innerText;
        inputToDisplay(eventNo);
    });
}

let isDotAvilable= false;
let oldNumber=0 , oparetor;

function inputToDisplay(inputString){
    switch(inputString){
        case '0':
            if(displayNumber == '0'){
                displayNumber=inputString;
            }else{
                displayNumber+=inputString;
            }
            setDisplay(displayNumber);
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            if(displayNumber == '0'){
                displayNumber=inputString;
            }else{
                displayNumber+=inputString;
            }
            setDisplay(displayNumber);
            break;
        case '.':
            if(!isDotAvilable){
                isDotAvilable=true;
                displayNumber+=inputString;
                setDisplay(displayNumber);
            }
            break;
        case '+':
            oldNumber = parseFloat(displayNumber);
            displayNumber = 0;
            oparetor = '+';
            isDotAvilable = false;
            break;
        case '-':
            oldNumber = parseFloat(displayNumber);
            displayNumber = 0;
            oparetor = '-';
            isDotAvilable = false;
            break;
        case 'x':
            oldNumber = parseFloat(displayNumber);
            displayNumber = 0;
            oparetor = '*';
            isDotAvilable = false;
            break;
        case '/':
            oldNumber = parseFloat(displayNumber);
            displayNumber = 0;
            oparetor = '/';
            isDotAvilable = false;
            break;
        case '=':
            calculate();
            break;
        default:
            setDisplay('reload again!');
    }
}
function calculate(){
    if(oparetor=='+'){
        oldNumber += parseFloat(displayNumber);
    }else if(oparetor=='-'){
        oldNumber -= parseFloat(displayNumber);
    }else if(oparetor=='*'){
        oldNumber *= parseFloat(displayNumber);
    }else if(oparetor=='/'){
        oldNumber /= parseFloat(displayNumber);
    }
    displayNumber=oldNumber;
    setDisplay(oldNumber);
}
let count = 0;
function macBook(){
    count++;
    if(count%2!=0){
        document.getElementById('fun').style.visibility='visible';
    }else{
        document.getElementById('fun').style.visibility='hidden';
    }
}