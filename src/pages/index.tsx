import RootLayout from '../app/layout';
import React, { useEffect } from 'react';
import Home from '../components/Home';


export default function HomePage() {
  
  return (
    <RootLayout>
      <Home />  
    </RootLayout>
  )
}
