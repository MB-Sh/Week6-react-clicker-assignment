
export default function Upgrades({ upgrades, handleUpgradePurchase, trees }) {
    return (
      <div className="upgrades">
        <h2>Upgrades</h2>
        {upgrades.map((upgrade) => (
          <div key={upgrade.id} className="upgrade">
            <h3>{upgrade.name}</h3>
            <p>{upgrade.effect}</p>
            <button
              onClick={() => handleUpgradePurchase(upgrade)}
              disabled={trees < upgrade.cost}
            >
              Buy for {upgrade.cost} Eco Points
            </button>
          </div>
        ))}
      </div>
    );
  }
  