import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/header";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import { store } from "./redux/store";
import { Container } from "@mui/material";
import { SignUp } from "./pages/SignUpPage";
import { Login } from "./pages/LoginPage";

const App = () => {
  return (
    // uses React Router v6
    <Router>
      <Provider store={store}>
        <Header />
        <Container maxWidth={false} sx={{ height: "100vh", width: "100vw" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="posts/:id" element={<PostPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </Provider>
    </Router>
  );
};

export default App;
