import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogDetails = () => {

  const { id } = useParams();
  const { error, isPending, data: blog } = useFetch('http://localhost:8000/api/blog' + id);
  const navigate = useNavigate();

  const handleDelete = () =>{
    axios.delete('http://localhost:8000/api/blog' + blog.id);
    navigate("/");
  }


  return (
    <div className="blog-details">
      <h2>{blog && blog.title}</h2>
      <p>{blog && blog.body}</p>
      <button onClick={handleDelete}>Delete Blog</button>
    </div>
  );
}
 
export default BlogDetails;