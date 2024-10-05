import { useState, useEffect } from "react";
import upgradesData from "../lib/upgradeData.json";
import TreeClicker from "./TreeClicker";
import Counter from "./Counter";
import Upgrades from "./Upgrade";

export default function MainLogic() {
  const [trees, setTrees] = useState(() => {
    const savedTrees = localStorage.getItem("trees");
    return savedTrees ? JSON.parse(savedTrees) : 0;
  });

  const [treesPerSecond, setTreesPerSecond] = useState(() => {
    const savedCPS = localStorage.getItem("treesPerSecond");
    return savedCPS ? JSON.parse(savedCPS) : 0;
  });

  const [upgrades, setUpgrades] = useState(upgradesData);  

  const handleTreeClick = () => {
    setTrees((prevTrees) => {
      const newTrees = prevTrees + 1;
      localStorage.setItem("trees", JSON.stringify(newTrees)); 
      return newTrees;
    });
  };

  const handleUpgradePurchase = (upgrade) => {
    if (trees >= upgrade.cost) {
      setTrees((prevTrees) => {
        const newTrees = prevTrees - upgrade.cost;
        localStorage.setItem("trees", JSON.stringify(newTrees)); 
        return newTrees;
      });

      setTreesPerSecond((prevCPS) => {
        const newCPS = prevCPS + upgrade.value;
        localStorage.setItem("treesPerSecond", JSON.stringify(newCPS)); 
        return newCPS;
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTrees((prevTrees) => {
        const newTrees = prevTrees + treesPerSecond;
        localStorage.setItem("trees", JSON.stringify(newTrees)); 
        return newTrees;
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, [treesPerSecond]);

  return (
    <div className='eco-container'>
      <TreeClicker handleClick={handleTreeClick} />  
      <Counter trees={trees} treesPerSecond={treesPerSecond} />  
      <Upgrades upgrades={upgrades} handleUpgradePurchase={handleUpgradePurchase} trees={trees} /> 
    </div>
  );
}
