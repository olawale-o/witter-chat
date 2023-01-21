import { Outlet } from 'react-router-dom';
import './App.css';
import UserProvider from './provider/userProvider';

function App({ socket }) {
  return (
    <UserProvider>
      <div className="App">
        <Outlet context={[socket]} />
      </div>
    </UserProvider>
  );
}

export default App;
