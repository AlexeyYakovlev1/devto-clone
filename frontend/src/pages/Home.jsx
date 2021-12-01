import React from 'react';
import Post from "../components/Post";
import { Box, CircularProgress } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const { token } = React.useContext(AuthContext);

    React.useEffect(() => {
        setLoading(true);
        async function fetchPosts() {
            const response = await fetch("/api/posts", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token
                }
            })

            response.json().then(data => {
                if (response.ok) {
                    setPosts(data);
                }
            });

            setLoading(false);
        }

        fetchPosts();

        // eslint-disable-next-line
    }, [])

    return (
        <Box>
            <Box
                sx={{
                    width: "100%"
                }}>
                    {loading && <CircularProgress />}
                    {posts.map((post, index) => {
                        return (
                            <Post key={post._id} info={post} />
                        )
                    })}
            </Box>
        </Box>
    )
}

export default Home
