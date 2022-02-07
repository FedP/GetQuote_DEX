To fetch = prendere

Objects has properties and Methods
A property can be an object as well

const ticker = prompt("Enter here the ticker: ");
const amount = +prompt("Enter here the amount: ");

const purchase = {
    ticker : ticker,
    amount : amount
};

purchase.owner = {
    name : "Fed",
    age : "29"
};

Chaining: purchase.owner.name

purchase.Owner?.name

Referencing and cloneing

newCheeC = cheetCode.slice()
newCheeC = [...cheetCode]
JSON.stringify(cheetCode)

parse = analizzare

let age = 15;
let isSwitchedOn = true;
let top5Cripto = ['BTC','YET','ADA','BB'];
let transactions = {
    currency : top5Cripto[1],
    amount : 10000000000000
    };
    
age = age + 6;
isSwitchedOn = !isSwitchedOn;
let currentAmount = transactions.amount;
transactions.amount *= 2;

let criptos = [...top5Cripto];
criptos.push('UNA');
criptos[1] = 'AVAX';

let transactions = [
  {
    currency : "BTC",
    amount : 1
    },
    {
    currency : "ETH",
    amount : 2
    }
    ];
    
let clonedTransactions = JSON.parse(JSON.stringify(transactions));
clonedTransactions[1].amount += 1;

console.log(transactions);
console.log(clonedTransactions);

What we can do is serialize the data. That means it is converted into a
flat description. A popular serialization format is called JSON (pronounced
“Jason”), which stands for JavaScript Object Notation. It is widely used as a
data storage and communication format on the Web, even in languages other
than JavaScript.

JavaScript gives us the functions JSON.stringify and JSON.parse to convert
data to and from this format. The first takes a JavaScript value and returns
a JSON-encoded string. The second takes such a string and converts it to the
value it encodes.
let string = JSON.stringify({squirrel: false,
events: ["weekend"]});
console.log(string);
// → {"squirrel":false,"events":["weekend"]}
console.log(JSON.parse(string).events);
// → ["weekend"]

Objects and arrays (which are a specific kind of object) provide ways to group
several values into a single value.

const sum2 = (c,d) => c+d;

function calcVel(v0, acc, t) {
    return v0 +acc*t;
};
const calcVel2 = (v0, acc, t) => v0 +acc*t;

nextPlayerSymbol = nextPlayerSymbol == "O" ? "X" : "O";

fallback operation:
'2' ?? '5'
v === null ? 4 : 5;

gameBoard.every(element => element !== null)

new Array(9).fill(null).every(element => element !== null)

document.querySelector("a[role=button]");

document.querySelectorAll("a[role=button]")

for (let node of document.querySelectorAll("a[role=button]")) {
    console.log(node);
}


for (let node of document.querySelectorAll("a[role=button] > span > span")) {
    console.log(node);
}

document.querySelector('h1')

document.querySelector('h1').innerText

$node.classList.toggle("border-darkred");

// From JSON to js
const jsObj = JSON.parse(jsonStr)
// Back to JSON
JSON.stringify(jsObj)

//Fetch
let API_URL = "https://...."

fetch(API_URL)

Promise.reject().catch(error => console.log(Error))

fetch(API_URL).then(Response => response.json())

fetch(API_URL)
    .then(Response => response.json())
    .then(data => {
        document.body.innerHTML = `
<h1>Conversion data</h1>
<p>1ETH = ${Number.parseInt(data.toTokenAmount)/1000000}USDC</p>
<p>Estimated gas: ${data.estimatedGas}</p>`;

    console.log(data);
    console.timeEnd("fetch");
});
console.log("Operation after the fetch promise");
console.time("fetch");

// Whenever we use "await" we need to put it inside an "async" function:

async function get1inchEthUsdcData(){
let response = await fetch(API_URL);
let data = await response.json();
document.body.innerHTML = `
    <h1>Conversion data</h1>
    <p>1ETH = ${Number.parseInt(data.ToTokenAmount) / 10000000}USDC</p>
    <p>Estimated gas: ${data.estimatedGas}</p>
`;
}



fetch(API_URL)
    .then(Response => response.json())
    .then(data => {
        throw "A problem occurred";
        document.body.innerHTML = `
<h1>Conversion data</h1>
<p>1ETH = ${Number.parseInt(data.toTokenAmount)/1000000}USDC</p>
<p>Estimated gas: ${data.estimatedGas}</p>`;
})
.catch(e => {
    console.log(`Error: ${e}`);
});


async function parseTokens() {
    try { 
        let response = await fetch("https://api.1inch.exchange/v3.0/1/tokens");
        let tokens = await response.json();
        let tokenList = Object.values(tokens.tokens);
        // map execute a function on each and every value of the token list
        let listItems = tokenList.map(token => 
                        `<li>${token.name} (${token.symbol}): ${token.address}</li>`);

        document.body.innerHTML += `<ul>${listItems.join("")}</ul>`;
    } catch(e) {
        console.log(`Error: ${e}`);
    }
}


[1,2,3,4,5].map(x => `<li>${x+2}</li>`)

[1,2,3,4,5]
    .filter(x => x%2 == 1)
    .map(x => `<li>${x}</li>`)


Filtering: 
async function parseTokens() {
    try { 
        let response = await fetch("https://api.1inch.exchange/v3.0/1/tokens");
        let tokens = await response.json();
        let tokenList = Object.values(tokens.tokens);
        console.log("---------");
        // map execute a function on each and every value of the token list
        let listItems = tokenList
                        .filter(token => token.decimals === 6)
                        .map(token => 
                        `<li>${token.name} (${token.symbol}, decimals: ${token.decimals}): ${token.address}</li>`);

        document.querySelector(".tokens").innerHTML = `<ul>${listItems.join("")}</ul>`;
        console.log(tokenList);
    } catch(e) {
        console.log(`Error: ${e}`);
    }
}

Async exercise:

async function Top10Coin() {
    try { 
        let response = await fetch("https://api.coinpaprika.com/v1/coins");
        let tokens = await response.json();
        let tokenList = Object.values(tokens);
        console.log(tokenList.slice(0,11));
    } catch(e) {
        console.log(`Error: ${e}`);
    }
}
---------------------<<<<>>>>--------------

async function Top10Coin() {
    try { 
        let response = await fetch("https://api.coinpaprika.com/v1/coins");
        let tokens = await response.json();
        return tokens.filter(token => token.rank > 0 && token.rank <= 10)
                        .map(token => token.symbol);
    } catch(e) {
        console.log(`Error: ${e}`);
    }
}


async function Top10Coin1inch() {
    try { 
        let response = await fetch("https://api.1inch.exchange/v3.0/1/tokens");
        let tokens = await response.json();
        let tokenList = Object.values(tokens.tokens);
        let listItems = tokenList
                        .filter(token => token.symbol == "BTC")
                        .map(token => token.name);
    } catch(e) {
        console.log(`Error: ${e}`);
    }
}



async function GetTickerAddresses(tickerList) {
    try { 
        let response = await fetch("https://api.1inch.exchange/v3.0/1/tokens");
        let tokens = await response.json();
        let tokenList = Object.values(tokens.tokens);

        return tokenList.filter(token => tickerList.includes(token.symbol));
            
        
    } catch(e) {
        console.log(`Error: ${e}`);
    }
}

Top10Coin()
    //.then(tickerList1 => GetTickerAddresses(tickerList1)) //is equal to:
    .then(GetTickerAddresses)
    .then(console.log);



Destructuring:

"18-0xeeeeeee".split("-")

decimals = "18-0xeeeeee".split("-")[0]

address = "18-0xeeeeee".split("-")[1]

let [decimals, address] = "18-0xeeeee".split("-");




Easy swap:

let c = 5, b = 18;

// These 2 assignments happen simultaniously
[c,b] = [b,c]

[18, 5]
