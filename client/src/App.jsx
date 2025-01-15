
import { Routes, Route } from 'react-router-dom';
import Loggedinpage from './components/Loggedinpage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Loggedinpage />} />
    </Routes>
  );
};

export default App;
