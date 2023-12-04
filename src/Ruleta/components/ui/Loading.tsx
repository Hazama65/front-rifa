import './LoadingCircle.css';

const LoadingCircle = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-circle"></div>
      <div className="loading-text">Cargando...</div>
    </div>
  );
};

export default LoadingCircle;
