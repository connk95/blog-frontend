import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/header";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import { store } from "./redux/store";
import { Container } from "@mui/material";
import { SignUp } from "./pages/SignUpPage";
import { Login } from "./pages/LoginPage";
import { NewPost } from "./pages/NewPost";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { setLoggedInUser } from "./redux/auth/auth.actions";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoggedInUser());
  }, [dispatch]);

  return (
    // uses React Router v6
    <Router>
      <Provider store={store}>
        <Header />
        <Container maxWidth={false} sx={{ height: "100vh", width: "100vw" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="posts/:id" element={<PostPage />} />
            <Route path="posts/new" element={<NewPost />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </Provider>
    </Router>
  );
};

export default App;
