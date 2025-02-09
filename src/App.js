
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Footer from './components/Footer';

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow no-scrollbar">
        <SideBar />
        <div className="flex flex-col flex-grow no-scrollbar">
          <Header />
          <div className="flex-grow overflow-auto no-scrollbar">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
