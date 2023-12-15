import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import { userLogout } from "../redux/auth/auth.actions";
// import { useEffect } from "react";

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
    <Box sx={{ flexGrow: 1, mb: 12 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={"/"} style={{ color: "white" }}>
              Home
            </Link>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <AddCircleOutlineOutlinedIcon />
            </IconButton> */}
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
              {/* <Button color="inherit" href="/profile">
                My Profile
              </Button> */}
              <Button color="inherit" href="/" onClick={onClick}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" href="/login">
                Login
              </Button>
              <Button color="inherit" href="/signup">
                Create Account
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
