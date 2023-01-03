import { Outlet } from 'react-router-dom';
import './App.css';

function App({ socket }) {
  return (
    <div className="App">
      <Outlet context={[socket]} />
    </div>
  );
}

export default App;
