import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, searchPosts } from "../redux/actions/postActions";
import { addComment } from "../redux/actions/commentAction";
import { getUserDetails } from "../redux/actions/selfUser";
import CreatePost from "../components/CreatePost";
import Avatar from "@mui/material/Avatar";
import dayjs from "dayjs";
import { Tooltip } from "@mui/material";
import { Delete, Edit, LockOpen, Logout, ThumbDown, ThumbUp } from "@mui/icons-material";
import { deletePost } from "../redux/actions/deletePostAction";
import { likeDislikePost } from "../redux/actions/likeDislikePostAction";
import { likeDislikeCommentPost } from "../redux/actions/likeDislikeCommentAction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const Posts = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [open, setOpen] = useState(false);
  const { posts } = useSelector((state) => state.post);
  const { userDetails, loading: userDetailsLoading } = useSelector((state) => state?.user);
  const [currentPost, setCurrentPost] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, refresh, userDetails]);



  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);



  const handleSearch = () => {
    setSearchError(null);
    if (searchQuery.trim() === "") {
      dispatch(getAllPosts());
    } else {
      dispatch(searchPosts(searchQuery));
    }
  };



  const handleAddComment = (postId) => {
    const commentInput = commentInputs[postId];
    if (commentInput.trim() === "") {
      return;
    }
    dispatch(addComment(postId, commentInput)).then(() => {
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      setRefresh((prev) => !prev);
    });
  };



  const handleOpenModel = (post = null) => {
    setCurrentPost(post);
    setOpen(true);
  };



  const handleCloseModel = () => {
    setOpen(false);
    setCurrentPost(null);
  };




  const handleCommentInputChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };



  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => setRefresh((prev) => !prev));
  };




  const handleLikeDislikeReaction = (postId, reactionType) => {
    dispatch(likeDislikePost(postId, { reaction: reactionType })).then(() =>
      setRefresh((prev) => !prev)
    );
  };



  const handleLikeDislikeCommentReaction = (
    commentId,
    blogId,
    reactionType
  ) => {
    dispatch(
      likeDislikeCommentPost(commentId, blogId, { reaction: reactionType })
    ).then(() => setRefresh((prev) => !prev));
  };




  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
    toast.success("Logout successfully");
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", () => {
      navigate("/");
    });
  };




  return (
    <div className=" ">
      {/* ---------------------Navbar------------------------------- */}
      <div className="shadow-lg rounded-lg bg-violet-400  px-3 fixed top-0 z-50 left-0 w-full">
        <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center">
          <div className="flex py-5 px-3 gap-6">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-3xl px-6 py-3 bg-gray-200 outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-red-500 text-white px-4 rounded-lg"
            >
              Search
            </button>
          </div>

          <div className="flex gap-4 pb-2 md:pb-0">
            <div className="flex gap-2 items-center">
              <Avatar className="">{userDetails?.name?.[0]}</Avatar>
              {userDetailsLoading ? (
                <div className="w-24 h-5 bg-[#bdbeb7] rounded-md"></div>
              ) : (
                <p className="font-semibold">{userDetails?.name}</p>
              )}
            </div>

            <Tooltip title="Create Post">
              <button
                onClick={() => handleOpenModel()}
                className="py-2 px-3 bg-sky-500 rounded-md  font-semibold text-white"
              >
                Create Blog
              </button>
            </Tooltip>
            <Tooltip title="Logout">
              <button
                onClick={handleLogout}
                className="py-2 px-3 bg-red-500 rounded-md  font-semibold text-white"
              >
                <Logout />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      {/*  -----------------Post section------------------- */}
      {searchError ? (
        <div className="flex justify-center items-center h-screen w-full">
          <p className="">No blog found</p>
        </div>
      ) : posts?.length ? (
        <div className="mt-36 md:mt-28 flex flex-col gap-10">
          {posts
            ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            ?.map((item) => (
              <div className="md:mx-10  shadow-lg shadow-violet-300 bg-white rounded-md mt-8 md:mt-2 md:p-6 flex flex-col gap-4 md:flex-row md:gap-9">
                {/* ---------------------Left side-Blog Details-------------------  */}
                <div className="md:w-2/3 ">
                  <div className="flex flex-col">
                    <div className="flex gap-2 flex-col md:flex-row">
                      <div className="w-full md:w-2/3">
                        <div className=" px-4 md:pt-5">
                          <div>
                            <div className="flex items-center gap-5 md:gap-6">
                              <Avatar>{item?.author?.name?.[0]}</Avatar>
                              <div className=" flex flex-col gap-2">
                              <div className="flex gap-4">
                                <p className="font-semibold">
                                  {item?.author?.name}
                                </p>
                                {userDetails?._id === item?.author?._id && (
                                <Tooltip title="You have access to edit & delete this post">
                                <LockOpen className="text-green-600 cursor-pointer"/>
                                </Tooltip>
                                )}
                              </div>
                                <p className="text-sm text-gray-400">
                                  {dayjs(item?.createdAt).format(
                                    "MMMM D, YYYY h:mm A"
                                  )}
                                </p>
                              </div>
                              {/* -------------------------Edit & Delete--------------------- */}
                              {userDetails?._id === item?.author?._id && (
                                <div className="flex justify-center gap-4  md:hidden ">
                                  <span
                                    className="cursor-pointer h-full  flex items-center justify-center rounded-lg text-blue-500 bg-gray-200 p-2"
                                    onClick={() => handleOpenModel(item)}
                                  >
                                    <Tooltip title="Edit Blog">
                                      <Edit />
                                    </Tooltip>
                                  </span>
                                  <span
                                    className="cursor-pointer h-full  flex items-center justify-center rounded-lg text-red-500 bg-gray-200 p-2"
                                    onClick={() => handleDelete(item?._id)}
                                  >
                                    <Tooltip title="Delete Blog">
                                      <Delete />
                                    </Tooltip>
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex h-full mt-4">
                            <div className=" w-2/3 mx-16  flex flex-col gap-2 bg-gray-200 rounded-md">
                              <div className="flex px-2 gap-5">
                                <p className=" text-blue-400 font-semibold">
                                  {item?.title}
                                </p>
                              </div>

                              <div className="flex px-2 py-0.5 gap-5 max-h-[80px] overflow-y-scroll scrollbar-custom">
                                <p className="text-gray-400">
                                  {item?.description ||
                                    "No description provided"}{" "}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="hidden md:flex mx-20 md:mt-6">
                            <div className="flex gap-8">
                              <div className="flex gap-1">
                                <Tooltip title="Like Blog">
                                  <span
                                    className={`cursor-pointer hover:text-blue-600 font-semibold text-blue-400`}
                                    onClick={() =>
                                      handleLikeDislikeReaction(
                                        item?._id,
                                        "like"
                                      )
                                    }
                                  >
                                    <ThumbUp />
                                  </span>
                                </Tooltip>
                                <p className="text-gray-600 font-semibold">
                                  {item?.like?.totalLikes}
                                </p>
                              </div>

                              <div className="flex gap-1">
                                <Tooltip title="Dislike Blog">
                                  <span
                                    className="cursor-pointer hover:text-red-600 font-semibold text-red-400"
                                    onClick={() =>
                                      handleLikeDislikeReaction(
                                        item?._id,
                                        "dislike"
                                      )
                                    }
                                  >
                                    <ThumbDown />
                                  </span>
                                </Tooltip>
                                <p className="text-gray-600 font-semibold">
                                  {" "}
                                  {item?.dislike?.totalDislikes}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <Tooltip
                                  className="cursor-pointer"
                                  title={`Total Comments: ${item?.comments?.totalNumberOfComments}`}
                                >
                                  <p className="font-semibold text-gray-500">
                                    {item?.comments?.totalNumberOfComments > 1
                                      ? "Comments"
                                      : "Comment"}{" "}
                                  </p>
                                </Tooltip>
                                <p>{item?.comments?.totalNumberOfComments}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                     {item?.image && (
                      <div className="w-full md:w-1/3 flex justify-center items-center md:pt-10 md:pr-4 ">
                        <div className="w-full h-30">
                          <img
                            src={item?.image}
                            alt="Invalid url"
                            className="rounded-md w-full"
                          />
                        </div>
                      </div>
                     )}

                      <div className="md:hidden flex mx-20 pt-4 md:mt-6 ">
                        <div className="flex gap-5">
                          <div className="flex gap-1">
                            <span
                              className={`cursor-pointer hover:text-blue-600 font-semibold text-blue-400`}
                              onClick={() =>
                                handleLikeDislikeReaction(item?._id, "like")
                              }
                            >
                              <ThumbUp />
                            </span>
                            <p className="text-gray-600 font-semibold">
                              {item?.like?.totalLikes}
                            </p>
                          </div>

                          <div className="flex gap-1">
                            <span
                              className="cursor-pointer hover:text-red-600 font-semibold text-red-400"
                              onClick={() =>
                                handleLikeDislikeReaction(item?._id, "dislike")
                              }
                            >
                              <ThumbDown />
                            </span>
                            <p className="text-gray-600 font-semibold">
                              {" "}
                              {item?.dislike?.totalDislikes}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Tooltip
                              className="cursor-pointer"
                              title={`Total Comments: ${item?.comments?.totalNumberOfComments}`}
                            >
                              <p className="font-semibold text-gray-500">
                                {item?.comments?.totalNumberOfComments > 1
                                  ? "Comments"
                                  : "Comment"}{" "}
                              </p>
                            </Tooltip>
                            <p>{item?.comments?.totalNumberOfComments}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*  ----------------Add Comment Section------------------------ */}
                    <div className=" flex justify-between gap-4 ">
                      <div className="px-5 pt-10 w-full ">
                        <div className="flex gap-5 items-center  ">
                          <Avatar>{userDetails?.name?.[0]}</Avatar>
                          <input
                            type="text"
                            placeholder="Write your Comment"
                            value={commentInputs[item._id] || ""}
                            onChange={(e) =>
                              handleCommentInputChange(item._id, e.target.value)
                            }
                            className=" w-9/12 rounded-3xl px-6 py-3 bg-gray-200 outline-none"
                          />

                          <button
                            onClick={() => handleAddComment(item?._id)}
                            className="py-1.5 px-2.5 bg-red-400 text-white rounded-lg text-sm"
                          >
                            Add comment
                          </button>
                        </div>
                      </div>

                      {/* -------------------------Edit & Delete--------------------- */}
                      {userDetails?._id === item?.author?._id && (
                        <div className="md:flex justify-center gap-4 pt-10 hidden ">
                          <span
                            className="cursor-pointer h-full  flex items-center justify-center rounded-lg text-blue-500 bg-gray-200 p-2"
                            onClick={() => handleOpenModel(item)}
                          >
                            <Tooltip title="Edit Blog">
                              <Edit />
                            </Tooltip>
                          </span>
                          <span
                            className="cursor-pointer h-full  flex items-center justify-center rounded-lg text-red-500 bg-gray-200 p-2"
                            onClick={() => handleDelete(item?._id)}
                          >
                            <Tooltip title="Delete Blog">
                              <Delete />
                            </Tooltip>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/*-----------------------Right side Comment-list-Section-------------------- */}
                <div className="md:w-1/3 px-3 py-2 rounded-md shadow-lg shadow-gray-400">
                  {item?.comments?.commentsUserList?.length ? (
                    <div className="max-h-[300px] overflow-y-scroll scrollbar-custom">
                      <div className="flex flex-col gap-4 pl-2 md:pl-0 pt-3 md:pt-0">
                        {item?.comments?.commentsUserList?.map((item) => (
                          <div>
                            <div className="flex gap-2">
                              <Avatar className="uppercase">
                                {item?.username?.[0]}
                              </Avatar>
                              <div className="flex flex-col max-w-72 bg-gray-200 from-neutral-500 rounded-2xl px-4 py-1">
                                <div className="flex gap-4">
                                  <p className="">{item?.username}</p>
                                  {userDetails?.name !== item?.username && (
                                    <p className="text-blue-500 font-semibold">
                                      Follow
                                    </p>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500 ">
                                  {item?.content}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-4 pl-14 mt-1.5">
                              <div className="flex gap-1">
                                <p
                                  className="cursor-pointer hover:text-sky-600 font-semibold text-blue-400"
                                  onClick={() =>
                                    handleLikeDislikeCommentReaction(
                                      item?._id,
                                      item?.blogId,
                                      "like"
                                    )
                                  }
                                >
                                  {/* Like */}
                                  <ThumbUp />
                                </p>
                                <p className="text-gray-600 font-semibold">
                                  {item?.likeDislike?.totalLikesForThisComment}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <p
                                  className="cursor-pointer hover:text-red-600 font-semibold text-red-400"
                                  onClick={() =>
                                    handleLikeDislikeCommentReaction(
                                      item?._id,
                                      item?.blogId,
                                      "dislike"
                                    )
                                  }
                                >
                                  <ThumbDown />
                                </p>
                                <p className="text-gray-600 font-semibold">
                                  {
                                    item?.likeDislike
                                      ?.totalDislikesForThisComment
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center text-gray-500 md:py-40">
                      <p>No comment available</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen w-full">
          <p className="text-2xl font-semibold text-gray-400">No blog found</p>
        </div>
      )}

      <div>
        {open && (
          <>
            <CreatePost
              open={open}
              onClose={handleCloseModel}
              onPostCreated={() => dispatch(getAllPosts())}
              post={currentPost}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Posts;
