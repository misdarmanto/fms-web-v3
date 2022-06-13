import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./lib/config/firebase";
import { ContextApi } from "./lib/helper/ContextApi";
import Home from "./pages/Main/Home";
import Login from "./pages/Auth/Login";
import NoPage from "./pages/NoPage404";
import "./App.css";
import SignIn from "./pages/Auth/SignIn";
import LoadingPage from "./components/LoadingPage";
import Settings from "./pages/Main/Settings";
import MyProfile from "./pages/Main/MyProfile";
import Layout from "./Layout";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { readDataBase } from "./lib/function/dataBaseCRUD";
import { stringRegex } from "./lib/function/stringRegex";
import TestPage from "./pages/Main/Testpage";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [devices, setDevices] = useState([]);
  const [groupDevices, setGroupDevices] = useState([]);
  const [layouts, setLayouts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [icons, setIcons] = useState([]);
  const [deleteItems, setDeleteItems] = useState([]);
  const [saveItems, setSaveItems] = useState([]);

  const getDataFromDataBase = (data) => {
    setCurrentUserData(data);
    setDevices(data?.devices || []);
    setGroupDevices(data?.groupDevices || []);
    setCurrentUserId(stringRegex(data?.email));
    setLayouts(data?.layouts || []);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        const path = "users/" + stringRegex(user.email);
        readDataBase(path, getDataFromDataBase);
        readDataBase("icons/", setIcons);
        setIsAuth(true);
      } else {
        setCurrentUserData(true);
      }
    });
  }, []);

  if (!currentUserData) {
    return <LoadingPage />;
  }

  return (
    <ContextApi.Provider
      value={{
        isAuth,
        setIsAuth,
        currentUserData,
        devices,
        groupDevices,
        currentUserId,
        icons,
        layouts,
        deleteItems,
        setDeleteItems,
        saveItems,
        setSaveItems,
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          {isAuth ? (
            <Layout>
              <Routes>
                <Route index element={<Home />} />
                <Route path="Settings" element={<Settings />} />
                <Route path="MyProfile" element={<MyProfile />} />
                <Route path="Test" element={<TestPage />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </Layout>
          ) : (
            <Routes>
              <Route index element={<Login />} />
              <Route path="SignIn" element={<SignIn />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          )}
        </BrowserRouter>
      </DndProvider>
    </ContextApi.Provider>
  );
}

export default App;
