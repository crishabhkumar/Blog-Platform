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

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    API.get("/posts")
      .then((res) => setPosts(res.data))
      .catch(() => Swal.fire("Error", "Failed to fetch posts", "error"));
  }, []);

  return (
    <div className="container mt-5">
      <h2>All Blog Posts</h2>
      {posts.map((post) => (
        <div className="card my-3" key={post._id}>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <h6 className="card-subtitle text-muted">
              By {post.author?.name || "Unknown"} on{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </h6>
            <p className="card-text mt-2">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
