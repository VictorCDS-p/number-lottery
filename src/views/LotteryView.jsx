import { useState } from "react";
import { LotteryController } from "../controllers/LotteryController";
import "./LotteryView.css";
import arrowIcon from "../assets/arrow-right-solid.svg";
import replayIcon from "../assets/repeat-solid.svg";
import backIcon from "../assets/reply-solid.svg";

export function LotteryView() {
  const [quantity, setQuantity] = useState(1);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const MAX_NUMBERS = 20;

  const validateInputs = () => {
    if (min >= max) {
      setError("Ei, malandro! O valor mínimo tem que ser menor que o máximo! 🤨");
      return false;
    }
    const totalNumbers = max - min + 1;
    if (quantity > totalNumbers && !isRepeatEnabled) {
      setError(`Você quer sortear ${quantity}, mas só existem ${totalNumbers} números únicos! 🤯`);
      return false;
    }
  
    if (quantity > MAX_NUMBERS) {
      return false;
    }
  
    setError(""); 
    return true;
  };
  

  const handleDraw = () => {
    if (!validateInputs()) return;
    setIsTransitioning(true);
    const numbers = LotteryController.drawNumbers(quantity, min, max, isRepeatEnabled);
    setResults(numbers);
    resetAnimation(); // Reinicia a animação da borda
  };

  const handleRedoDraw = () => {
    if (!validateInputs()) return;
    setIsTransitioning(true);
    const numbers = LotteryController.drawNumbers(quantity, min, max, isRepeatEnabled);
    setResults(numbers);
    resetAnimation(); // Reinicia a animação da borda
  };

  const handleReset = () => {
    setIsTransitioning(true);
    setResults([]);
    setQuantity(1);
    setMin(1);
    setMax(100);
    setError("");
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value > MAX_NUMBERS) {
      setQuantity(MAX_NUMBERS);
    } else {
      setQuantity(value === "" ? "" : Math.max(1, Number(value)));
    }
  };

  const handleMinChange = (e) => {
    const value = e.target.value;
    setMin(value === "" ? "" : Math.max(0, Number(value)));
  };

  const handleMaxChange = (e) => {
    const value = e.target.value;
    setMax(value === "" ? "" : Math.max(min + 1, Number(value)));
  };

  const resetAnimation = () => {
    const elements = document.querySelectorAll('.number-reveal');
    elements.forEach((element) => {
      const borderElement = element.querySelector('.number-border');
      if (borderElement) {
        borderElement.style.animation = 'none';
        void borderElement.offsetWidth;
        borderElement.style.animation = 'spinBorder 1s ease-out forwards';
      }
    });
  };



  return (
    <div className="lottery-container">
      <div className="all-text">
        <h1 className={`content-primary ${isTransitioning ? "fade-in" : ""}`}>
          {results.length > 0 ? "Resultado:" : "QUERO SORTEAR:"}
        </h1>
        <p className={`instruction-text content-secondary ${isTransitioning ? "fade-in" : ""}`}>
          {results.length > 0
            ? "Aqui estão os números sorteados!"
            : "Defina o intervalo e a quantidade de números, clique em 'Sortear' e veja os resultados na tela. É rápido e fácil!"}
        </p>
      </div>

      {!results.length && (
        <>
          <div className={`input-group ${isTransitioning ? "fade-in" : ""}`}>
            <div className="input-field">
              <label className="content-primary">NÚMEROS</label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                placeholder="qtd"
                className="content-tertiary"
                max={MAX_NUMBERS}
              />
            </div>

            <div className="input-field">
              <label className="content-primary">DE</label>
              <input
                type="number"
                value={min}
                onChange={handleMinChange}
                placeholder="min"
                className="content-tertiary"
              />
            </div>

            <div className="input-field">
              <label className="content-primary">ATÉ</label>
              <input
                type="number"
                value={max}
                onChange={handleMaxChange}
                placeholder="max"
                className="content-tertiary"
              />
            </div>
          </div>

          <div className={`toggle-container ${isTransitioning ? "fade-in" : ""}`}>
            <label className="switch">
              <input
                type="checkbox"
                checked={isRepeatEnabled}
                onChange={() => setIsRepeatEnabled(!isRepeatEnabled)}
              />
              <span className="slider round"></span>
            </label>
            <label className="content-secondary">Repetir número</label>
          </div>

          <button
            onClick={handleDraw}
            className={`draw-button sort-button content-brand ${isTransitioning ? "fade-in" : ""}`}
          >
            SORTEAR <img src={arrowIcon} alt="Seta" className="arrow-icon" />
          </button>
        </>
      )}

      {error && (
        <p className={`error-text color-inverse ${isTransitioning ? "fade-in" : ""}`}>{error}</p>
      )}

      {results.length > 0 && (
        <>
          <h2 className={`content-primary ${isTransitioning ? "fade-in" : ""}`}>Resultados:</h2>
          <div className="result-numbers content-secondary">
            {results.map((number, index) => (
              <span key={index} className="number-reveal">
                <span className="number-border"></span>
                {number}
              </span>
            ))}
          </div>
          <button
            onClick={handleRedoDraw}
            className={`reset-button content-brand ${isTransitioning ? "fade-in" : ""}`}
          >
            Refazer Sorteio <img src={replayIcon} alt="Seta" className="arrow-icon" />
          </button>

          <button
            onClick={handleReset}
            className={`reset-button content-brand ${isTransitioning ? "fade-in" : ""}`}
          >
            Voltar <img src={backIcon} alt="Seta" className="arrow-icon" />
          </button>
        </>
      )}
    </div>
  );
}
