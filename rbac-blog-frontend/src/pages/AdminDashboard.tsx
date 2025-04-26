import { useEffect, useState } from "react";
import API from "../services/api";
import Swal from "sweetalert2";

type Post = {
  _id: string;
  title: string;
  content: string;
  author: { name: string };
  createdAt: string;
};

function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  // Load posts
  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load posts.",
        showConfirmButton: true,
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create Post
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post(
        "/posts",
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTitle("");
      setContent("");
      fetchPosts();
      Swal.fire({
        icon: "success",
        title: "Post Created",
        text: "Your post has been created successfully.",
        showConfirmButton: true,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create post.",
        showConfirmButton: true,
      });
    }
  };

  // Delete Post
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    try {
      await API.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
      Swal.fire({
        icon: "success",
        title: "Post Deleted",
        text: "Your post has been deleted successfully.",
        showConfirmButton: true,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete post.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      <form className="my-4" onSubmit={handleCreate}>
        <h4>Create New Post</h4>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="form-control my-2"
          placeholder="Content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className="btn btn-success">Create</button>
      </form>

      <h4>All Posts</h4>
      <div
        className="posts-container"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {posts.map((post) => (
          <div className="card my-3" key={post._id}>
            <div className="card-body">
              <h5>{post.title}</h5>
              <p>{post.content}</p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
