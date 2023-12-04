import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import logo from '../../assets/Logo sin letras.png';


export const AdminPage = () => {
  const {startGetNumbers} = useAuth()
  const {userNumbers} = useSelector( (state: any) => state.userNumbers)
  const numbers = userNumbers.map( (number: any) => {
    return +number.register_number
  })

  const [numerosRestantes, setNumerosRestantes] = useState<number[]>([]);
  const [girando, setGirando] = useState(false);
  const [ultimoGanador, setUltimoGanador] = useState<number | null>(null);
  const [numeroEnGiro, setNumeroEnGiro] = useState<number | null>(null);

  useEffect(() => {
    startGetNumbers()  
  }, [])
  
  useEffect(() => {
    // Actualiza el estado local cuando cambia el estado en el store
    setNumerosRestantes(numbers);
  }, [userNumbers]);

  const iniciarRuleta = () => {
    if (!girando && numerosRestantes.length > 0) {
      girarRuleta();
    }
  };

  const girarRuleta = () => {
    setGirando(true);

    const numerosRestantesShuffled = shuffleArray(numerosRestantes);
    let velocidad = 1000;
    let giroTotal = 0;
    let resultadoIndex: number;

    const girar = () => {
      giroTotal += velocidad;

      if (velocidad > 0.1) {
        velocidad *= 0.995;

        const numeroEnGiro = numerosRestantesShuffled[Math.floor(giroTotal / 36) % numerosRestantesShuffled.length];
        setNumeroEnGiro(numeroEnGiro);
        requestAnimationFrame(girar);
      } else {

        setGirando(false);
        setNumeroEnGiro(null);
        resultadoIndex = Math.floor(giroTotal / 36) % numerosRestantesShuffled.length;
        const resultado = numerosRestantesShuffled[resultadoIndex];
        setUltimoGanador(resultado);
        setNumerosRestantes(numerosRestantesShuffled.filter((_, index) => index !== resultadoIndex));
      }
    };

    velocidad = 1000;
    giroTotal = 0;

    girar();
  };

  const shuffleArray = (array: number[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return (
    <div>
      <div className="registro-exitoso-container">
        <div className="registro-exitoso-content">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
          <h1 className="registro-exitoso-title">¡Que comience la rifa!</h1>
          <p className="registro-exitoso-text"></p>
          <button onClick={iniciarRuleta} disabled={girando}>
            Girar
          </button>
          {girando && numeroEnGiro !== null && <p className="registro-exitoso-text">Número: {numeroEnGiro}</p>}
          {!girando && ultimoGanador !== null && <p className="registro-exitoso-number">El ganador es el número {ultimoGanador}.</p>}
        </div>
      </div>

    </div>
  );
}
