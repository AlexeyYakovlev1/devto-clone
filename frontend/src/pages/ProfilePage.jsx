import React from 'react';
import { AuthContext } from "../context/AuthContext";
import { Avatar, Box, Button, CircularProgress, List, ListItem, Typography } from "@mui/material";
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Post from "../components/Post";

const ProfilePage = () => {
    const userId = useParams().id;
    const { token, userInfo } = React.useContext(AuthContext);
    const [user, setUser] = React.useState({});
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const date = new Date(user.createdAt).toLocaleDateString();

    React.useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            const response = await fetch("/api/users/" + userId, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token
                }
            })

            response.json().then(data => {
                setLoading(false);
                setUser(data.findUser);
            })
        }

        fetchUser();
        // eslint-disable-next-line
    }, []);

    React.useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            const response = await fetch("/api/posts/owner/" + userId, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token
                }
            })

            response.json().then(data => {
                setLoading(false);
                setPosts(data);
            })
        }

        fetchPosts();
        // eslint-disable-next-line
    }, [user._id]);

    return (
        <Box sx={{
            marginTop: 15
        }}>
            <Box sx={{
                position: "relative",
                backgroundColor: "#fff",
                borderRadius: 1,
                border: "1px solid lightgrey",
                padding: "20px",
                marginBottom: 3
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "right"
                }}>
                    <Avatar
                        alt={user.name}
                        src={user.avatar} 
                        sx={{
                            width: "120px",
                            height: "120px",
                            position: "absolute",
                            top: -5,
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            border: "1px solid lightgrey"
                        }} 
                    />

                   {userInfo._id === user._id ? <Button variant="contained">
                        <NavLink to="/settings">Изменить профиль</NavLink>
                    </Button> : <Button variant="contained">Подписаться</Button>}
                </Box>

                <Box sx={{
                    paddingBottom: 4,
                    borderBottom: "1px solid lightgrey",
                    marginTop: 4,
                    textAlign: "center"
                }}>
                    <Typography variant="h3" sx={{fontWeight: "bold"}}>{user.name}</Typography>
                    <Typography sx={{marginTop: 2}}>{user.bio}</Typography>
                    <Typography sx={{marginTop: 3, color: "gray"}}>Зарегистрирован {date}</Typography>
                </Box>

                <Box sx={{marginTop: 2}}>
                    <List sx={{
                        display: "flex"
                    }}>
                        <ListItem sx={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <Typography sx={{fontSize: 15, color: "gray"}}>Образование</Typography>
                            <Typography>Самоучка</Typography>
                        </ListItem>
                        <ListItem sx={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <Typography sx={{fontSize: 15, color: "gray"}}>Работа</Typography>
                            <Typography>{user.work}</Typography>
                        </ListItem>
                    </List>
                </Box>
            </Box>

            <Box sx={{marginTop: 2}}>
                {loading && <CircularProgress />}
                {posts.length ? posts.map(post => {
                    return (
                        <Post key={post._id} info={post} />
                    )
                }) : false}
            </Box>
        </Box>
    )
}

export default ProfilePage;
