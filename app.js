const brl = document.getElementById("brl");
const result = document.getElementById("result");

async function getData() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/BRL");
    let result = await response.json();
    const currencies = {
      usd: result.rates.USD,
      eur: result.rates.EUR,
      gbp: result.rates.GBP,
    };
    return currencies;
  } catch (err) {
    console.log(err);
  }
}

const formatResult = (currency, result) => currency + result.toFixed(2);

getData().then(({ usd, eur, gbp }) => {
  const exchangeRate = document.querySelector("#exchange-rate");
  exchangeRate.textContent = `R$1 = ${formatResult("$", usd)} - ${formatResult(
    "€",
    eur
  )} - ${formatResult("£", gbp)}`;
});

function convert() {
  let brlVal = parseFloat(brl.value).toFixed(2);
  const currencies = document.querySelector("#currencies");

  if (brl.value !== "") {
    getData().then(({ usd, eur, gbp }) => {
      switch (currencies.value) {
        case "dollar":
          result.textContent = formatResult("$", brlVal * usd);
          break;
        case "euro":
          result.textContent = formatResult("€", brlVal * eur);
          break;
        case "pound":
          result.textContent = formatResult("£", brlVal * gbp);
          break;
      }
      brl.value = "";
    });
  } else {
    if (result.textContent !== "") {
      result.textContent = "";
    }
  }
}

document.querySelector("#convert").addEventListener("click", convert);
brl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    convert();
  }
});

brl.focus();
