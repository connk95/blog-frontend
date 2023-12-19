import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/header";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import UserPage from "./pages/UserPage";
import { store } from "./redux/store";
import { Container } from "@mui/material";
import { SignUp } from "./pages/SignUpPage";
import { Login } from "./pages/LoginPage";
import { NewPost } from "./pages/NewPost";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { setLoggedInUser } from "./redux/auth/auth.actions";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const App = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  console.log(auth);

  useEffect(() => {
    dispatch(setLoggedInUser());
  }, [dispatch]);

  return (
    <Router>
      <Provider store={store}>
        <Header />
        <Container maxWidth={false} sx={{ height: "100vh", width: "100vw" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/posts/new" element={<NewPost />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<UserPage />} />
          </Routes>
        </Container>
      </Provider>
    </Router>
  );
};

export default App;
