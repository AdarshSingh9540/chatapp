import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Chat from './pages/chat';
import Auth from './pages/auth';
import Profile from './pages/profile';
import { useAppStore } from './store';
import { useEffect, useState, ReactNode } from 'react';
import { apiClient } from './lib/api-client';
import { GET_USER_INFO } from './utils/constant';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const userInfo = useAppStore((state) => state.userInfo);
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const userInfo = useAppStore((state) => state.userInfo);
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : <>{children}</>;
};

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        }
        console.log('API Response:', response);
      } catch (error) {
        console.log('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loading.....</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
