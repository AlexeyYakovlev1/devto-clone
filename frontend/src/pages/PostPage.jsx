import React from 'react';
import { Alert, Avatar, Box, Button, Card, CardContent, CardMedia, CircularProgress, List, ListItem, Typography, TextareaAutosize } from "@mui/material";
import { ThumbUpAltOutlined, ChatBubbleOutlineOutlined } from '@mui/icons-material';
import { NavLink, useParams, useHistory } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import Profile from "../components/Profile";
import MyModal from '../components/MyModal';
import ReactMarkdown from 'react-markdown';

const PostPage = () => {
    const [open, setOpen] = React.useState(false);
    const history = useHistory()
    const [info, setInfo] = React.useState({});
    const [user, setUser] = React.useState({});
    const [message, setMessage] = React.useState({
        text: "", type: ""
    });
    const [loading, setLoading] = React.useState(false);
    const postId = useParams().id;
    const { token, userInfo } = React.useContext(AuthContext);

    React.useEffect(() => {
        async function fetchPost() {
            const response = await fetch(`/api/posts/${postId}`, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token
                }
            })

            response.json().then(data => {
                if (response.ok) {
                    setInfo(data)
                }
            })
        }

        fetchPost();
        // eslint-disable-next-line
    }, []);

    const date = `${new Date(info.createdAt).toLocaleDateString()} (${new Date(info.createdAt).toLocaleTimeString()})`;

    React.useEffect(() => {
        async function fetchPost() {
            const response = await fetch(`/api/users/${info.owner}`, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token
                }
            })

            response.json().then(data => {
                if (response.ok) {
                    setUser(data.findUser)
                }
            })
        }

        fetchPost();
        // eslint-disable-next-line
    }, [info.owner]);

    const deletePost = async() => {
        try {
            setLoading(true);

            const response = await fetch(`/api/posts/delete/${postId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            response.json().then(data => {
                setLoading(false);
                if (response.ok) {
                    setMessage({
                        text: data.message,
                        type: "success"
                    })

                    history.push("/");
                } else {
                    setMessage({
                        text: data.message,
                        type: "warning"
                    })
                }
            })
        } catch(e) {
            setLoading(false);
            setMessage({
                text: e.message,
                type: "error"
            })
        }
    }

    if (!info.owner) {
        return <CircularProgress />
    }

    return (
        <>
            {userInfo._id === user._id && <MyModal open={open} setOpen={setOpen}>
                <Typography variant="h6" component="h2">
                    Вы уверены, что хотите удалить этот пост?
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Вернуть его уже не удастся.
                </Typography>
                <Typography sx={{ mt: 3 }}>
                    <Button variant="contained" color="error" onClick={deletePost}>Удалить</Button>
                    <Button variant="outlined" sx={{marginLeft: 2}} onClick={() => setOpen(false)}>Закрыть</Button>
                </Typography>
            </MyModal>}
            {message.text && <Alert sx={{marginTop: 1}} severity={message.type}>{message.text}</Alert>}
            <Box sx={{
                display: "flex",
                alignItems: "flex-start",
                position: "relative",
                width: "100%",
                height: "100%",
                marginBottom: 3
            }}>
                <Box sx={{
                    width: "10%",
                    position: "sticky",
                    top: 130,
                    left: 0
                }}>
                    <List sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <ListItem sx={{
                            marginBottom: 1,
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <ThumbUpAltOutlined />
                            <Typography>{info.likes}</Typography>
                        </ListItem>
                        {
                            info.comments &&
                            <ListItem sx={{
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <ChatBubbleOutlineOutlined />
                                <Typography>{info.comments.length}</Typography>
                            </ListItem>
                        }
                    </List>
                </Box>

                <Card sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    boxShadow: 1,
                    marginRight: 2,
                    marginLeft: 2,
                    width: "75%"
                }}>
                    {info.coverPhoto &&
                        <CardMedia
                            sx={{
                                marginBottom: 4
                            }}
                            component="img"
                            height="338"
                            image={info.coverPhoto}
                            alt={info.title}
                        />
                    }
                    <CardContent sx={{padding: "0 50px"}}>
                        <Box sx={{marginBottom: 2}}>
                            <Box 
                                marginBottom={3}
                                marginTop={2} 
                                sx={{
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                <Avatar alt="user" src={user.avatar} />
                                <Box sx={{display: "flex", flexDirection: "column"}} marginLeft={1}>
                                    <Typography component="span" sx={{fontWeight: "bold"}}>
                                        <NavLink className="post__userName-href" to={"/user/" + user._id}>{user.name}</NavLink>
                                    </Typography>
                                    <Typography component="span" sx={{fontSize: "13px", color: "gray", padding: "2px"}}>{date}</Typography>
                                </Box>
                            </Box>

                            <Typography variant="h4" component="div" sx={{fontWeight: "bold"}}>{info.title}</Typography>

                            <List
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    marginTop: 1,
                                }}
                            >
                                {info.tags.map((tag, index) => {
                                    return (
                                        <Typography
                                            className="post__tags-item"
                                            key={tag + index}
                                            sx={{fontSize: "14px", color: "grey", padding: "2px"}}
                                        >
                                            #{tag}
                                        </Typography>
                                    )
                                })}
                            </List>
                        </Box>

                        <Box>
                            <Typography sx={{
                                fontSize: "1.2rem",
                                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', san-serif"
                            }}>
                                <ReactMarkdown>
                                    {info.description}
                                </ReactMarkdown>
                            </Typography>
                        </Box>

                        <Box sx={{
                            marginTop: 4,
                            paddingTop: 4,
                            borderTop: "1px solid lightgrey"
                        }}>
                            <Box sx={{
                                marginBottom: 5,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Typography variant="h6">Комментарии ({info.comments ? info.comments.length : 0})</Typography>
                                {
                                    userInfo._id !== user._id ?
                                    <Button
                                        disabled={loading}
                                        sx={{
                                            boxShadow: 1,
                                            color: "#000",
                                            borderColor: "#000"
                                        }}
                                        variant="outlined"
                                    >
                                        Подписаться
                                    </Button>
                                    :
                                    <Box sx={{display: "flex"}}>
                                        <Button
                                            disabled={loading}
                                            sx={{marginRight: 2}}
                                            variant="outlined"
                                            color="secondary"
                                        >
                                            Изменить
                                        </Button>
                                        <Button
                                            disabled={loading}
                                            variant="outlined"
                                            color="error"
                                            onClick={() => setOpen(true)}
                                        >
                                            Удалить
                                        </Button>
                                    </Box>
                                }
                            </Box>

                            <Box sx={{
                                marginBottom: 2
                            }}>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "flex-start"
                                }}>
                                    <Avatar alt={userInfo.name} src={userInfo.avatar} sx={{marginRight: 1}} />
                                    <TextareaAutosize
                                        minRows={3}
                                        placeholder="Добавьте текст комментария"
                                        style={{
                                            width: "100%",
                                            borderColor: "lightgrey",
                                            borderRadius: 4,
                                            padding: 10,
                                            minHeight: "30px",
                                            fontSize: 16,
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', san-serif"
                                        }}
                                    />
                                </Box>
                                <Box padding="15px 48px 0 48px">
                                    <Button disabled={loading} variant="contained">Отправить</Button>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                <Profile info={user} />
            </Box>
        </>
    )
}

export default PostPage;
