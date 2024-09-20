import { Outlet } from 'react-router-dom';
import HeaderFinal from './Component/Header/headerFinal';
import Footer from "./Component/Home/Footer"
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <div className="bg-custom-dark text-white min-h-screen flex flex-col">
      <HeaderFinal />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
