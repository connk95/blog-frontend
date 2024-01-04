import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import { userLogout } from "../redux/auth/auth.actions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/theme";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const defaultTheme = createTheme(theme);

export const ButtonAppBar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const onClick = async () => {
    const data = {
      username: auth.loggedInUser.user.username,
      password: auth.loggedInUser.user.password,
    };
    await dispatch(userLogout(data));
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, mr: 10 }}
            >
              <Link to={"/home"} style={{ color: "white" }}>
                ChatBox
                <ChatBubbleIcon></ChatBubbleIcon>
              </Link>
            </Typography>
            {auth.loggedInUser.access_token ? (
              <>
                <Typography sx={{ mr: 4 }}>
                  Welcome back {auth.loggedInUser.user.username}!
                </Typography>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  href="/profile"
                >
                  <AccountCircleOutlinedIcon />
                </IconButton>
                <Button color="inherit" href="/" onClick={onClick}>
                  Logout
                </Button>
              </>
            ) : window.location.pathname !== "/" ? (
              <>
                <Button color="inherit" href="/login">
                  Login
                </Button>
                <Button color="inherit" href="/signup">
                  Create Account
                </Button>
              </>
            ) : (
              <></>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default ButtonAppBar;
