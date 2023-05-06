import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {

    const { error, isPending, data: blogs } = useFetch('http://localhost:8000/api/blog');

    return (
        <div className="home">
            { blogs && <BlogList blogs={blogs} title='All Blogs'/>}
        </div>
    );
}
 
export default Home;