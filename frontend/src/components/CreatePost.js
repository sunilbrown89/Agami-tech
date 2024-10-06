import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { useDispatch } from "react-redux";
import { createPost } from "../redux/actions/createPostAction";
import { updatePost } from "../redux/actions/updatePostAction";

const CreatePost = ({ open, onClose, onPostCreated, post }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post?.title || "");
      setDescription(post?.description || "");
      setImageUrl(post?.image || "");
    } else {
      setTitle("");
      setDescription("");
      setImageUrl("");
    }
  }, [post]);

  const handleSubmit = () => {
    const postData = {
      title,
      description,
      image: imageUrl,
    };

    if (post) {
      dispatch(updatePost(post._id, postData)).then(() => {
        if (onPostCreated) onPostCreated();
      });
    } else {
      dispatch(createPost(postData)).then(() => {
        if (onPostCreated) onPostCreated();
      });
      
    }
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="p-5 bg-white flex flex-col justify-center items-center w-full">
        <div className="w-[90%] flex flex-col gap-3">
          <h2 className="text-xl text-center font-bold">
            {" "}
            {post ? "Update Post" : "Create Post"}
          </h2>
          <div className=" flex flex-col gap-3">
            <input
              type="text"
              placeholder=" title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border outline-none py-2 "
            />
            <input
              type="text"
              placeholder=" description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border outline-none py-2 "
            />
            <input
              type="text"
              placeholder=" image url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border outline-none py-2 "
            />
            <button
              onClick={handleSubmit}
              className="bg-sky-500 py-2 text-white font-bold"
            >
              {post ? "Update Post" : "Create Post"}{" "}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CreatePost;
