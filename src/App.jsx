import Footer from './components/Footer';
import Header from './components/Header';
import TreeClicker from './components/TreeClicker'
import './App.css'
import MainLogic from './components/Mainlogic'
import Upgrades from './components/Upgrade';
import Counter from './components/Counter';


export default function App (){
  return (
    <>
      <Header />
      <MainLogic>
        {({trees, treesPerSecond, handleTreeClicker, handleUpgradePurchase, upgrades}) => (
      <div className='eco-container'>
        <TreeClicker handleClick={handleTreeClicker} />
        <Counter trees={trees} treesPerSecond ={treesPerSecond} />
        <Upgrades upgrades={upgrades} handleUpgradePurchase={handleUpgradePurchase} trees={trees} />
        
      </div>
        )}
      </MainLogic>
      <Footer />
      </>
      
  );
}

