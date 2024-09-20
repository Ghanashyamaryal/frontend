import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { createRoutesFromElements,createBrowserRouter,Route } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import Home from './Component/Home/Home.jsx'
import Destination from './pages/Destination.jsx'
import Hotels from './pages/Hotels.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import PlanyourTrip from './pages/PlanyourTrip.jsx'
import NearbyAttraction from './pages/NearbyAttraction.jsx'
import Package from "./pages/Package.jsx"
import Contact from './pages/Contact.jsx'
import FAQs from './Support/Faqs.jsx'
import CustomerSupport from './Support/CustomerSupport.jsx'
import TermsConditions from './Support/TermsandConditions.jsx'
import Trek from './pages/Trek.jsx';
import Festival from './pages/Festival.jsx';
import HotelsDetails from './pages/HotelsDetails.jsx';


const router  = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} >
      <Route path='/' element ={<Home/>} />
      <Route path='/hotels' element={<Hotels/>} />
      <Route path='/hotels/:hotelId' element={<HotelsDetails/>} />
      <Route path='/destinations' element = {<Destination/>}  />
      <Route path='/login' element= {<Login/>} />
      <Route path='/register' element ={<Register/>} />
      <Route path='/planyourtrip' element ={<PlanyourTrip/>} />
      <Route path='/nearbyattraction' element ={<NearbyAttraction/>}/>
      <Route path='/contact' element = {<Contact/>}/>
      <Route path='/packages' element = {<Package/>} />
      <Route path='/faqs' element={<FAQs/>} />
      <Route path='/TermsandCondition' element ={<TermsConditions/>}/>
      <Route path='/customerSupport' element={<CustomerSupport/>} />
      <Route path='/trek' element = {<Trek/>}/>
      <Route path='/festivalsandevents' element={<Festival/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />
)
