import { useEffect } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

function Main() {


  useEffect(()=>{

  },[])

  return (
    <div className=''>
      <Header />
      <Outlet />
    </div>
  );
}

export default Main;
