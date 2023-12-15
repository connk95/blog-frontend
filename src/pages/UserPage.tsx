import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// import { useAppDispatch } from "../redux/hooks";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  // TextField,
  // Button,
  Container,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export const UserPage = (): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth);
  // const dispatch = useAppDispatch();
  console.log(auth);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        {auth.loading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center,",
            }}
          >
            <Grid container spacing={2}>
              <Card>
                <CardContent>
                  <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                    Username
                  </Typography>
                  <Typography>{auth.loggedInUser.user.username}</Typography>
                </CardContent>
              </Card>
              {auth.loggedInUser.user.posts.length > 0 ? (
                <Card>
                  {auth.loggedInUser.user.posts.map((post) => (
                    <Link to={`/posts/${post._id}`} key={post._id}>
                      <CardContent>
                        <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                          {post.title}
                        </Typography>
                        <Typography sx={{ my: 1 }}>{post.text}</Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          posted at {post.createdAt.slice(11, 16)} on{" "}
                          {post.createdAt.slice(0, 10)}
                        </Typography>
                      </CardContent>
                    </Link>
                  ))}
                </Card>
              ) : (
                <></>
              )}
              {auth.loggedInUser.user.comments.length > 0 ? (
                <Card>
                  {auth.loggedInUser.user.comments.map((comment) => (
                    <Link to={`/posts/${comment._id}`} key={comment._id}>
                      <CardContent>
                        <Typography sx={{ my: 1 }}>{comment.text}</Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          posted at {comment.createdAt.slice(11, 16)} on{" "}
                          {comment.createdAt.slice(0, 10)}
                        </Typography>
                      </CardContent>
                    </Link>
                  ))}
                </Card>
              ) : (
                <></>
              )}
            </Grid>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default UserPage;
