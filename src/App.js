import { useMemo, useState, useEffect} from 'react';
import { Outlet, useLoaderData, useNavigate, useLocation } from 'react-router-dom';
import UserProvider from './provider/userProvider';

import './App.css';

const NumberItem = ({ number }) => {

  useEffect(() => {
    console.log('number item mounted')
  }, [])

  console.log('number item render');
  <li key={number}>{number}</li>
};

const NumberList = ({ numbers }) => {
  console.log('render number list');

  return (
    <div>
      <span>List of countries</span>
      <ul>
        {numbers.map((number) => (
          <NumberItem key={number}>{number}</NumberItem>
        ))}
      </ul>
    </div>
  )
}
const Page = ({ numbers }) => {
  const [counter, setCounter] = useState(0)
  const list = useMemo(() => {
    return (
      <NumberList numbers={numbers} />
    );
  }, [numbers])
  return (
  <>
    <button type='button'
      onClick={() => setCounter(counter + 1)}
    >
      Click { counter}
    </button>
    {list}
  </>)
}

function App({ socket }) {
  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (sessionId) {
      navigate('/chat', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [sessionId, navigate]);
  return (
    <UserProvider>
      <div className="App">
        <Outlet context={[socket]} />
      </div>
    </UserProvider>
  );
}

export default App;
