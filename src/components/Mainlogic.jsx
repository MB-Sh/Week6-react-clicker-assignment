import { useState, useEffect } from "react";
import upgradesData from "../lib/upgradeData.json";
import TreeClicker from "./TreeClicker";
import Counter from "./Counter";
import Upgrades from "./Upgrade";
import Notification from "./Notificaton";
import click from "../../public/audio/click.mp3"
import coinrecieved from "../../public/audio/coinrecieved.mp3"



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

  const [notification, setNotification] = useState ({message: "", type: "", visible: false });

  
  const handleTreeClick = () => {
    const audio = new Audio(click);
    audio.play();
    setTrees((prevTrees) => {
      const newTrees = prevTrees + 1;
      localStorage.setItem("trees", JSON.stringify(newTrees)); 
      return newTrees;
    });
  };

  const handleUpgradePurchase = (upgrade) => {
    if (trees >= upgrade.cost) {
      setTrees((prevTrees) => {
       const audio = new Audio(coinrecieved);
     audio.play();
        const newTrees = prevTrees - upgrade.cost;
        localStorage.setItem("trees", JSON.stringify(newTrees)); 
        return newTrees;
      });

      setTreesPerSecond((prevCPS) => {
        const newCPS = prevCPS + upgrade.value;
        localStorage.setItem("treesPerSecond", JSON.stringify(newCPS)); 
        return newCPS;
      });

      // Show success notification
      setNotification({ message: `Successfully purchased ${upgrade.name}`,
         type: "success", visible: true });
    } else {
      // Show insufficient trees notification
      setNotification({ message: `Not enough trees to buy ${upgrade.name}`, 
        type: "error", visible: true });

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

  // Hide notification after 3 seconds
  useEffect(() => {
    if (notification.visible) {
      const timeout = setTimeout(() => setNotification({ ...notification, visible: false }), 3000);
      return () => clearTimeout(timeout);
    }
  }, [notification]);

  return (
    <div className='eco-container'>
      <TreeClicker handleClick={handleTreeClick} />  
      {notification.visible && <Notification message={notification.message} type={notification.type} />}
      <Counter trees={trees} treesPerSecond={treesPerSecond} />  
      <Upgrades upgrades={upgrades} handleUpgradePurchase={handleUpgradePurchase} trees={trees} /> 
    </div>
  );
}
