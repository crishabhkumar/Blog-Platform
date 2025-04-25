import { useEffect, useState } from "react";
import API from "../services/api";

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
      alert("Failed to load posts");
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
    } catch {
      alert("Post creation failed");
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
    } catch {
      alert("Delete failed");
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
  );
}

export default AdminDashboard;
