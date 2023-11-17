import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch } from "../redux/hooks";
// import { User } from "../redux/user/user.type";
import { createUser } from "../redux/user/user.actions";
// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CircularProgress } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

interface SignUpFormInput {
  username: string;
  email: string;
  password: string;
}

export const SignUp = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.users);
  //   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     const formData = new FormData(event.currentTarget);

  //     const userData: User = {
  //       username: formData.get("username")?.toString() || "username",
  //       password: formData.get("password")?.toString() || "password",
  //       email: formData.get("email")?.toString() || "email",
  //     };

  //     if (
  //       userData.username !== "username" &&
  //       userData.password !== "password" &&
  //       userData.email !== "email"
  //     ) {
  //       await dispatch(createUser(userData));
  //     } else {
  //       console.log("create use failed");
  //     }
  //     return userData;
  //   };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInput>();

  const onSubmit: SubmitHandler<SignUpFormInput> = async (data) => {
    await dispatch(createUser(data));

    return useNavigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {(!user.error || !user.loading) && (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {user.error && <Typography>{user.error}</Typography>}
            {user.loading && <CircularProgress />}
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters long",
                      },
                    })}
                    autoComplete="username"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                  />
                  {errors.username && (
                    <Typography variant="caption" color="error">
                      {errors.username.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address",
                      },
                    })}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                  />
                  {errors.email && (
                    <Typography variant="caption" color="error">
                      {errors.email.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                  {errors.password && (
                    <Typography variant="caption" color="error">
                      {errors.password.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
};
