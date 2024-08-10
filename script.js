// button variable

const openBracket = document.querySelector("#open-bracket");
const closedBracket = document.querySelector("#closed-bracket");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const mult = document.querySelector("#multiply");
const div = document.querySelector("#division");
const zero = document.querySelector("#zero");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const point = document.querySelector("#point");
const allClear = document.querySelector("#all-clear");
const deleteOption = document.querySelector("#delete");
const equalto = document.querySelector("#equal");

// display variable

const textField = document.querySelector("#text-field"); 


// manipulating the text in span variable
function addOpen(){
    textField.innerText += "(";
    scrollToRight()
}

function addClosed(){
    textField.innerText += ")";
    scrollToRight()
}

function addOne(){
    textField.innerText += "1";
}

function addTwo(){
    textField.innerText += "2";
}

function addThree(){
    textField.innerText += "3";
}

function addFour(){
    textField.innerText += "4";
}

function addFive(){
    textField.innerText += "5";
}

function addSix(){
    textField.innerText += "6";
}

function addSeven(){
    textField.innerText += "7";
}

function addEight(){
    textField.innerText += "8";
}

function addNine(){
    textField.innerText += "9";
}

function addZero(){
    textField.innerText += "0";
}

function addPoint(){
    textField.innerText += ".";
}

function addPlus(){
    textField.innerText += "+";
}

function addMinus(){
    textField.innerText += "-";
}

function addMultiply(){
    textField.innerText += "*";
}

function addDivision(){
    textField.innerText += "/";
}

function addDustbin(){
    textField.innerText = "";
}

function removeDust(){
    textField.innerText = textField.innerText.slice(0,-1);
}


// Taking input from keyboard
function addFromKey(event){
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '+' || key === '-' || key === '*' || key === '/' || key === '.' || key === ')' || key === '(') {
        textField.innerText += key;
    }
    else if(key === "Delete" || key === "Backspace"){
        textField.innerText = textField.innerText.slice(0,-1);
    }
    else if(key == '=' || key == 'Enter'){
        evaluate();
    }
}



function scrollToRight() {
    textField.scrollLeft = textField.scrollWidth;
}

const observer = new MutationObserver(scrollToRight);

observer.observe(textField, { childList: true, subtree: true });
// adding event listener
openBracket.addEventListener("click",addOpen);
closedBracket.addEventListener("click",addClosed);
one.addEventListener("click",addOne);
two.addEventListener("click",addTwo);
three.addEventListener("click",addThree);
four.addEventListener("click",addFour);
five.addEventListener("click",addFive);
six.addEventListener("click",addSix);
seven.addEventListener("click",addSeven);
eight.addEventListener("click",addEight);
nine.addEventListener("click",addNine);
zero.addEventListener("click",addZero);
point.addEventListener("click",addPoint);
plus.addEventListener("click",addPlus);
minus.addEventListener("click",addMinus);
mult.addEventListener("click", addMultiply);
div.addEventListener("click",addDivision);
document.addEventListener("keydown", addFromKey);
allClear.addEventListener("click",addDustbin);
deleteOption.addEventListener("click",removeDust);



function evaluate() {
    let s = textField.innerText;
    const mapping = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    const ans = [];
    const st = [];

    // Convert infix expression to postfix
    for (let i = 0; i < s.length; i++) {
        if (s[i] >= '0' && s[i] <= '9') {
            let number = '';
            while (i < s.length && ((s[i] >= '0' && s[i] <= '9') || s[i] === '.')) {
                number += s[i];
                i++;
            }
            ans.push(number);
            i--; // to adjust for the incremented i
        }
        else if(s[i] == '.'){
            let number = '0.';
            i++;
            while (i < s.length && ((s[i] >= '0' && s[i] <= '9'))) {
                number += s[i];
                i++;
            }
            ans.push(number);
            i--;
        } 
        else if (s[i] === '+' || s[i] === '-' || s[i] === '*' || s[i] === '/') {
            while (st.length > 0 && st[st.length - 1] !== '(' && mapping[st[st.length - 1]] >= mapping[s[i]]) {
                ans.push(st.pop());
            }
            st.push(s[i]);
        } else if (s[i] === '(') {
            st.push(s[i]);
        } else if (s[i] === ')') {
            while (st.length > 0 && st[st.length - 1] !== '(') {
                ans.push(st.pop());
            }
            st.pop();
        }
    }

    while (st.length > 0) {
        ans.push(st.pop());
    }

    const sta = [];
    let check = 1;

    for (const i of ans) {
        if (i[0] >= '0' && i[0] <= '9') {
            sta.push(parseFloat(i));
        } else {
            if (sta.length >= 2) {
                const a = sta.pop();
                const b = sta.pop();
                if (i === '+') {
                    sta.push(b + a);
                } else if (i === '-') {
                    sta.push(b - a);
                } else if (i === '*') {
                    sta.push(b * a);
                } else if (i === '/') {
                    if (a === 0) {
                        check = 0;
                        break;
                    } else {
                        sta.push(b / a);
                    }
                }
            } else {
                check = 0;
                break;
            }
        }
    }

    if (check === 1) {
        textField.innerText = Math.round(sta[sta.length - 1] * 100)/100;
    } else {
        textField.innerText = "Error: Invalid expression or division by zero.";
    }
}

equalto.addEventListener("click",evaluate);