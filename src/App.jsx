import React, { useEffect, useState } from 'react';
import Home from './Pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Player from './Pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is authenticated');
        setUser(user);
      } else {
        console.log('User is not authenticated');
        setUser(null);
      }
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!isAuthChecked) {
    return <div>Loading...</div>; // Loading state while auth is checked
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/player/:id'
          element={
            <ProtectedRoute user={user}>
              <Player />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
