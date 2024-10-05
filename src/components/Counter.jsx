
export default function Counter({ trees, treesPerSecond }) {
    return (
      <div className="counter">
        <h2>Eco Points: {trees}</h2>
        <h3>Eco Points per second: {treesPerSecond}</h3>
      </div>
    );
  }
  