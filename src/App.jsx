import Footer from './components/Footer';
import Header from './components/Header';
import './App.css';

import MainLogic from './components/Mainlogic'; 

export default function App() {
  return (
    <div className='app-container'>
      <Header />
      <MainLogic /> 
      <Footer />
    </div>
  );
}
