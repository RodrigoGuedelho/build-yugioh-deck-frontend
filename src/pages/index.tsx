import RootLayout from '@/app/layout';
import React, { useEffect } from 'react';
import auth from '../services/Auth';


export default function HomePage() {
  function logout(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    auth.logout();
  }
  return (
      <RootLayout>
        <main className="">
          <h1>Home pagina principal</h1>
          <button onClick={logout}>Logout</button>
        </main>
        
     </RootLayout>
  )
}
