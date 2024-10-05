

export default function TreeClicker({ handleTreeClick }) {
  return (
    <div className="tree-clicker">
      <img src="https://cdn.pixabay.com/photo/2023/01/07/05/18/plant-7702558_640.jpg" 
      alt="Click to plant trees" height={120} width={150} onClick={handleTreeClick}
      className="plant-image" /> 
    </div>
  );
}