import { Outlet } from 'react-router-dom';
import HeaderFinal from './Component/Header/headerFinal';
import Footer from "./Component/Home/Footer"
import { useLocation } from 'react-router-dom';
import { Suspense } from 'react';

function App() {
  return (
    <Suspense >
      <div className="bg-custom-dark text-white min-h-screen flex flex-col">
        <HeaderFinal />
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex-grow">
            <Outlet />
          </div>
        </Suspense>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
