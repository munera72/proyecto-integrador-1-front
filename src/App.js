import './App.css';
import { HashRouter as Router, Routes, Route  } from 'react-router-dom';
import Home from './pages/home';
import ProgressBar from './pages/progressbar';
import Results from './pages/results';
import ImgUploader from './pages/imgUploader';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/progressbar' element={<ProgressBar/>}/>
        <Route path='/results' element={<Results/>}/>
        <Route path='/upload-img' element={<ImgUploader/>}/>
      </Routes>
    </Router>


  );
}

export default App;
