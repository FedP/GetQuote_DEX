async function Top10Coin() {
  try {
    const response = await fetch("https://api.coinpaprika.com/v1/coins");
    const tokens = await response.json();
    return tokens
      .filter((token) => token.rank > 0 && token.rank <= 10)
      .map((token) => token.symbol);
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}

async function GetTickerAddresses(tickerList) {
  try {
    const response = await fetch("https://api.1inch.exchange/v3.0/56/tokens");
    const tokens = await response.json();
    const tokenList = Object.values(tokens.tokens);

    return tokenList.filter((token) => tickerList.includes(token.symbol));
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}

function renderForm(tokens) {
  const options = tokens.map(
    (token) =>
      `<option value = "${token.decimals}-${token.address}">${token.name} (${token.symbol})</option>`
  );
//   console.log(tokens);
//   console.log(options.join(""));
  document.querySelector("[name =From-token]").innerHTML = options;
  document.querySelector("[name =To-token]").innerHTML = options;
  // Disable field
  document.querySelector(".js-submit-quote").removeAttribute("disabled");
}

async function formSubmitted(event) {
  event.preventDefault();
  const fromToken = document.querySelector("[name =From-token]").value;
  const toToken = document.querySelector("[name =To-token]").value;

  const [fromDecimals, fromAddress] = fromToken.split("-");
  const [toDecimals, toAddress] = toToken.split("-");

  const fromUnit = 10 ** fromDecimals;

  const decimalRatio = 10 **(fromDecimals - toDecimals);

  // It is called query String. It starts with a "?"
  // Inside there are key-value pairs saperated by "&"
  const url = `https://api.1inch.exchange/v3.0/56/quote?fromTokenAddress=${fromAddress}&toTokenAddress=${toAddress}&amount=${fromUnit}`;

  try {
    const response = await fetch(url);
    const quote = await response.json();
    const exchange_rate =
      Number(quote.toTokenAmount) / Number(quote.fromTokenAmount) * decimalRatio;

    document.querySelector(".js-quote-container").innerHTML = `
      <p>1 ${quote.fromToken.symbol} = ${exchange_rate} ${quote.toToken.symbol}</p>
      <br><br> 
      <p>Estimated Gas Fee: ${quote.estimatedGas}</p>`;
  } catch (e) {
    document.querySelector(".js-quote-container").innerHTML = `The conversion didn't succeded!`
  }
}

document
  .querySelector(".js-submit-quote")
  .addEventListener("click", formSubmitted);

Top10Coin()
  //.then(tickerList1 => GetTickerAddresses(tickerList1)) //is equal to:
  .then(GetTickerAddresses)
  .then(renderForm);
