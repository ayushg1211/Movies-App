import './App.css';
import Banner from './components/Banner';
import Favourites from './components/Favourites';
import Movielist from './components/Movielist';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom' ;

function App() {
  return (
    <>

    <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route path='/' element={<><Banner/> <Movielist/> </>}  />
          <Route path='/favourites' element={<><Favourites/></>} />
        </Routes>
       
    </BrowserRouter>
      




      
    </>
  );
}

export default App;
