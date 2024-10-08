

export default function TreeClicker({ handleClick }) {
  return (
    <div className="tree-clicker">
      <img 
        src="https://cdn.pixabay.com/photo/2023/01/07/05/18/plant-7702558_640.jpg"
        alt="Click to plant trees"
        height={120}
        width={150}
        onClick={handleClick}  
        className="plant-image" 
      />
      <p className="tree-text">Click to plant trees</p>
    </div>
  );
}
