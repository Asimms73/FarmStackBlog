import axios from "axios";
import { useState } from "react";
import useFetch from "./useFetch";
import { useNavigate } from 'react-router-dom';



const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [id, setId] = useState(0);
    const { data: blogs } =  useFetch('http://localhost:8000/api/blog');
    const [submitCount, setSubmitCount] = useState(0);

    const navigate = useNavigate();



    const handleSubmit = (e) =>{
        e.preventDefault()
        setSubmitCount(submitCount + 1);

        let blog = {title: title, body: body};

        if (blogs !== null) {
            const blogIds = Object.keys(blogs).map(key => parseInt(blogs[key].id.split("_")[1]));
            let count = blogIds.length;
            blog.id = 'user1_' + (count + submitCount);
        }

        axios.post('http://localhost:8000/api/blog', blog)
        .then((res) =>{
            console.log(res);
            if(res.status === 200){
                navigate('/');
            }
        })
    }

    return ( 
         <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <button>Add Blog</button>
            </form>
        </div>
        );
    }

export default CreateBlog;