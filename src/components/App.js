import { Routes, Route } from 'react-router-dom'
import Login from './subcomponents/Login';
import MainPage from './subcomponents/MainPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/:id" element={<MainPage/>}/>
    </Routes>
  );
}

export default App;
