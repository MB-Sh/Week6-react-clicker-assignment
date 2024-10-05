import { useState, useEffect } from "react";
import upgradesData from "../lib/upgradeData.json";

export default function MainLogic() {
  const [trees, setTrees] = useState(0);
  const [treesPerSecond, setTreesPerSecond] = useState(0);
  const [upgrades, setUpgrades] = useState(upgradesData);

  // Handle clicking the cookie (plant a tree)
  const handleTreeClick = () => {
    setTrees((prevTrees) =>  { return prevTrees + 1;});
  };

  // Handle purchasing an upgrade
  const handleUpgradePurchase = (upgrade) => {
    if (trees >= upgrade.cost) {
      setTrees((prevTrees) => prevTrees - upgrade.cost);
      setTreesPerSecond((prevCPS) => prevCPS + calculateUpgradeEffect(upgrade));
    }
  };

  // Apply passive eco points per second
  useEffect(() => {
    const treesPerSecondInterval = setInterval(() => {
    console.log ("Trees per second:", treesPerSecond);
      setTrees((prevTrees) => prevTrees + treesPerSecond);
    }, 1000);

    return () => clearInterval(treesPerSecondInterval);
  }, [treesPerSecond]);


  return { 
    trees, treesPerSecond, handleTreeClick, upgrades,handleUpgradePurchase };
}