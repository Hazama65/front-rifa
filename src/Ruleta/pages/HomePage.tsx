import { useSelector } from "react-redux";
import { UserStateProps } from "../../interfaces/interfaces";


export const HomePage = () => {
  const {user} = useSelector( (state: UserStateProps) => state.user );

  return (
    <div className="registro-exitoso-container">
      <div className="registro-exitoso-content">
        <h1 className="registro-exitoso-title">¡Ya has sido registrado!</h1>
        <p className="registro-exitoso-text">Toma una Captura de pantalla de tu número para no perderlo</p>
        <p className="registro-exitoso-text">{user.email}</p>
        <p className="registro-exitoso-text">Tu número de rifa es:</p>
        <p className="registro-exitoso-number">{user.register_number}</p>
      </div>
    </div>
  )
}
