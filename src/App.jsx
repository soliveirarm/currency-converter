import { useState } from "react"
import Input from "./components/Input"
import { useEffect } from "react"

export default function App() {
  const [rates, setRates] = useState(null)
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")

  useEffect(() => {
    fetch(
      "https://v6.exchangerate-api.com/v6/80a96492db8d08ed40666660/latest/USD"
    )
      .then((res) => res.json())
      .then((json) => setRates(json.conversion_rates))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (rates) {
      const from = rates[fromCurrency] || 0
      const to = rates[toCurrency] || 0

      setOutput(((input / from) * to).toFixed(2))
    }
  }, [rates, fromCurrency, toCurrency, input])

  if (!rates) {
    return <p className="text-white text-4xl">Loading...</p>
  }

  const { USD, EUR, GBP, KWD } = rates
  const formatRate = (rate, symbol) => `${symbol}${rate.toFixed(2)}`

  return (
    <>
      <header className=" text-white text-center text-2xl font-bold">
        <h1 className="uppercase tracking-wider">Currency Converter</h1>
      </header>

      <section className="text-slate-200 text-lg text-center flex flex-col items-center gap-4">
        <h2>Dollar Exchange Rate:</h2>

        <ul className="flex flex-wrap justify-center gap-4 *:bg-blue-900/50 *:py-1 *:px-4 *:rounded-full *:border *:border-blue-500 *:select-none *:shadow-md *:text-blue-200">
          <li>{formatRate(USD, "US$")}</li>
          <li>{formatRate(EUR, "€")}</li>
          <li>{formatRate(GBP, "£")}</li>
          <li>{formatRate(KWD, "KD ")}</li>
        </ul>
      </section>

      <main className="mx-auto max-w-screen-sm  rounded-lg flex flex-col gap-2">
        <Input
          inputValue={input}
          onInputChange={(e) => setInput(e.target.value)}
          rates={rates}
          selectOption={fromCurrency}
          onSelectChange={(e) => setFromCurrency(e.target.value)}
        />

        <Input
          inputValue={output}
          onInputChange={(e) => setOutput(e.target.value)}
          rates={rates}
          selectOption={toCurrency}
          onSelectChange={(e) => setToCurrency(e.target.value)}
        />
      </main>

      <footer className="text-gray-300 text-center">
        Made with React, Tailwind and{" "}
        <a
          className="underline hover:text-white"
          href="https://www.exchangerate-api.com/"
          target="_blank"
        >
          ExchangeRate-API
        </a>
      </footer>
    </>
  )
}
