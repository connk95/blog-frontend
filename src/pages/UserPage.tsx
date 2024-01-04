import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Container,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchUser } from "../redux/user/user.actions";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { Linkify } from "../utils/utilities";

export const UserPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (auth.loggedInUser.access_token) {
      const userId = auth.loggedInUser.user._id;
      if (userId) {
        dispatch(fetchUser(userId));
      }
    }
  }, [dispatch, auth]);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 12 }}>
      {!user.user._id ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                    Username
                  </Typography>
                  <Typography>{user.user.username}</Typography>
                </CardContent>
              </Card>
            </Grid>
            {user.user.posts ? (
              <Grid item xs={12}>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: 20, ml: 2, mt: 2 }}
                >
                  Posts
                </Typography>
                {user.user.posts.toReversed().map((post) => (
                  <Link to={`/posts/${post._id}`} key={post._id}>
                    <Card sx={{ my: 1 }}>
                      <CardContent>
                        <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                          {post.title}
                        </Typography>
                        <Linkify sx={{ my: 1 }}>{post.text}</Linkify>
                        <Typography sx={{ fontSize: 14 }}>
                          posted at {post.createdAt.slice(11, 16)} on{" "}
                          {post.createdAt.slice(0, 10)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </Grid>
            ) : (
              <></>
            )}
            {user.user.comments ? (
              <Grid item xs={12} sx={{ mb: 8 }}>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: 20, ml: 2, mt: 2 }}
                >
                  Comments
                </Typography>
                {user.user.comments.map((comment) => (
                  <Link to={`/posts/${comment.postId}`} key={comment._id}>
                    <Card sx={{ my: 1 }}>
                      <CardContent key={comment._id}>
                        <Linkify sx={{ my: 1 }}>{comment.text}</Linkify>
                        <Typography sx={{ fontSize: 14 }}>
                          posted at {comment.createdAt.slice(11, 16)} on{" "}
                          {comment.createdAt.slice(0, 10)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default UserPage;
