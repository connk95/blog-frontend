import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";
import {
  Grid,
  Typography,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";

export const NewPost = (): JSX.Element => {
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useAppDispatch;

  return (
    <Grid container flexDirection="column" alignItems="center">
      {posts.loading ? (
        <CircularProgress />
      ) : (
        <Grid container direction={"column"} sx={{ alignItems: "center" }}>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            sx={{ m: 2, width: "61vw" }}
          />
          <TextField
            id="outlined-multiline-static"
            label="New Post"
            multiline
            rows={4}
            sx={{ m: 2, width: "61vw" }}
          />
          <Grid item sx={{ alignItems: "flex-end" }}>
            <Button variant="contained" sx={{ width: 90, mx: 2 }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
