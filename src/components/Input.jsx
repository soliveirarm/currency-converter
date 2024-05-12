Input.propTypes = {
  rates: Number,
  inputValue: Number,
  onInputChange: Function,
  onSelectChange: Function,
  selectOption: String,
}

export default function Input({
  rates,
  inputValue,
  onInputChange,
  onSelectChange,
  selectOption,
}) {
  const inputClasses =
    "p-1 bg-transparent outline-none rounded focus:ring-1 focus:ring-blue-400"
  return (
    <section className="flex gap-4 items-center bg-slate-700 text-white p-4 rounded-lg shadow-xl">
      <input
        value={inputValue}
        onChange={onInputChange}
        className={`w-full focus:bg-blue-800/20 text-lg placeholder:text-slate-300/50 ${inputClasses}`}
        type="number"
        placeholder="Digite o valor"
      />

      <span className="text-slate-300">|</span>

      <select
        value={selectOption}
        onChange={onSelectChange}
        className={inputClasses + " w-full"}
      >
        {Object.keys(rates).map((rate) => (
          <option className="text-black" value={rate} key={rate}>
            {rate}
          </option>
        ))}
      </select>
    </section>
  )
}
