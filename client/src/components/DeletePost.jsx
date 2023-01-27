import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "state";

export default function DeletePost({ postId, postUserId }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  async function handleDeletePost() {
    const response = await fetch(
      `https://socio-backend.onrender.com/posts/${postId}/delete`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      }
    );
    const deletedPost = await response.json();
    dispatch(setPost({ post: deletedPost }));
  }

  return (
    <FlexBetween>
      <IconButton onClick={() => handleDeletePost()}>
        {loggedInUserId === postUserId ? (
          <ChatBubbleOutlineOutlined />
        ) : undefined}
      </IconButton>
      <Typography>Delete</Typography>
    </FlexBetween>
  );
}
