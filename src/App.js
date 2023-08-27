import React from 'react';
import { Outlet } from 'react-router-dom';
import {HiOutlineUserGroup} from 'react-icons/hi';
import UserProvider from './provider/userProvider';

import './App.css';

const NumberItem = ({ number }) => {

  React.useEffect(() => {
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
  const [counter, setCounter] = React.useState(0)
  // const clickRef = React.useRef(() => {});
  // const increment = React.useCallback(() => clickRef.current?.(), [])

  // React.useEffect(() => {
  //   clickRef.current = () => {
  //     setCounter(counter + 1)
  //   }
  // }, [counter])
  const list = React.useMemo(() => {
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
  const [numbers, setNumbers] = React.useState([1,2,3,4,5,6]);
  return (
    <UserProvider>
      <div className="App">
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-list__item">
              <button type="button">
                <span className="icon icon--white">
                  <HiOutlineUserGroup fill='white' />
                </span>
              </button>
            </li>
          </ul>
        </nav>
        <Outlet context={[socket]} />
      </div>
    </UserProvider>
    // <>
    //   <button type='button'
    //     onClick={() => setNumbers((prevState) => [...prevState, prevState[prevState.length - 1] + 1])}
    //   >Push</button>
    //   <br />
    //   <Page numbers={numbers} />
    // </>
  );
}

export default App;
