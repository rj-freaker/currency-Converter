const BASE_URL = "https://v6.exchangerate-api.com/v6/b0d3561809943aed3d922367";

const amount = document.querySelector('#amount');
const btn = document.getElementById('btn');
const fromImage = document.querySelector('.fromImage');
const toImage = document.querySelector('.toImage');
const select1 = document.querySelector('#fromCountry');
const select2 = document.querySelector('#toCountry');
const dropdowns = document.querySelectorAll('.dropdown select');
const msg = document.querySelector('.conversion');

for(let select of dropdowns){
    for(curCode in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = curCode;
        newOption.value = curCode;
        if(select.name === "from" && curCode === "INR"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && curCode === "RUB"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
}

let newAmount = amount.value;
let fromFlag = 'INR';
let toFlag = 'RUB';

select1.addEventListener('change',(eve)=>{

    fromFlag= (eve.target.value).slice(0,2);
    fromImage.src = `https://flagsapi.com/${fromFlag}/shiny/64.png`;
    fromFlag = (eve.target.value);
    
});

select2.addEventListener('change',(eve)=>{
    toFlag = (eve.target.value).slice(0,2);
    toImage.src = `https://flagsapi.com/${toFlag}/shiny/64.png`
    toFlag = (eve.target.value);
    
});

amount.addEventListener('input', (eve) => {
    newAmount = eve.target.value;
});

const getExchange = async (from,to) => {
    try{
        let response = await fetch(`${BASE_URL}/pair/${to}/${from}`);
        let data = await response.json();
        let totalAmount = Number(newAmount) * data.conversion_rate;
        msg.innerHTML = `${newAmount} ${to} = ${totalAmount} ${from}`;
    }catch(err){
        console.log('some error occured');
        console.log(err);
    }
}

btn.addEventListener('click', (eve) => {
    eve.preventDefault();
    getExchange(toFlag,fromFlag);
})