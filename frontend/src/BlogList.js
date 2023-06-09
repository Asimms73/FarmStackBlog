import { Link } from "react-router-dom";
import axios from "axios";

const BlogList = ({ blogs, title }) => {
    



    return (
      <div className="blog-list">
        <h2>{title}</h2>
        {blogs.map(blog => (
          <Link to={`/blogs/${blog.id}`}
          style={{ textDecoration: 'none' }}>
            <div className="blog-preview" key={blog.id} >
              <h2>{ blog.title }</h2>
              <p>Written by Anonymous</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
   
  export default BlogList;