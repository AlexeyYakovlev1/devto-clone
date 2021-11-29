import React from 'react';
import { Box, Link, Typography, TextField, Input, Button, Alert } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import MySettingsItem from "../components/MySettingsItem";

const Settings = () => {
    const avatarRef = React.useRef();
    const { token, logout, userInfo } = React.useContext(AuthContext);
    const [user, setUser] = React.useState({
        name: "", email: "", bio: "",
        skills: "", work: "", avatar: "",
        city: ""
    })
    const [message, setMessage] = React.useState({
        text: "", type: ""
    })

    React.useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`/api/users/${userInfo._id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
    
                response.json().then(data => {
                    if (response.ok) setUser(data.findUser);
                    else logout();
                })
            } catch(e) {
                setMessage({text: e.message, type: "error"});
            }
        } 

        fetchUser();
        // eslint-disable-next-line
    }, []);

    const changeAvatarHandler = event => {
        const file = Array.from(event.target.files)[0];
        const reader = new FileReader();

        if (!file) return;

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result;
            setUser({...user, avatar: result});
        }

        reader.onerror = () => {
            setMessage({
                text: reader.error, type: "error"
            })
        }
    }

    const changeUserInfoHandler = async() => {
        try {
            const response = await fetch(`/api/users/change/${user._id}`, {
                method: "PUT",
                body: JSON.stringify(user),
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                }
            })

            response.json().then(data => {
                if (response.ok) {
                    setMessage({
                        text: data.message, type: "success"
                    })
                } else {
                    setMessage({
                        text: data.message, type: "error"
                    })
                }
            })
        } catch(e) {
            setMessage({text: e.message, type: "error"});
        }
    }

    return (
        <>
            <Box>
                <Box>
                    <Typography variant="h4" sx={{fontWeight: "bold"}}>
                        Настройки для <Link href={"/user/" + user._id}>@{user.name}</Link>
                    </Typography>
                </Box>

                <Box sx={{maxWidth: "70%", marginLeft: "auto", marginBottom: 2}}>
                    <MySettingsItem>
                        <Box sx={{marginBottom: 3}}>
                            <Typography variant="h5" sx={{fontWeight: "bold"}}>Пользователь</Typography>
                        </Box>
                        <Box sx={{marginBottom: 3}}>
                            <Typography variant="h6">Имя пользователя</Typography>
                            <TextField onChange={event => setUser({...user, name: event.target.value})} value={user.name} variant="outlined" fullWidth sx={{marginTop: 1}} />
                        </Box>
                        <Box sx={{marginBottom: 3}}>
                            <Typography variant="h6">Почта</Typography>
                            <TextField onChange={event => setUser({...user, email: event.target.value})} value={user.email} variant="outlined" fullWidth sx={{marginTop: 1}} />
                        </Box>
                        <Box sx={{marginBottom: 3}}>
                            <Typography variant="h6">Фото профиля</Typography>
                            <Box sx={{
                                marginTop: 1,
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Box sx={{
                                    backgroundImage: "url(" + user.avatar + ")",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    width: 60,
                                    height: 60,
                                    marginRight: 3,
                                    borderRadius: "50%",
                                    border: "1px solid lightgrey"
                                }}></Box>
                                <Box sx={{backgroundColor: "lightgrey", padding: 1, borderRadius: 1}}>
                                    <Input accept="image/*" type="file" ref={avatarRef} onChange={changeAvatarHandler} />
                                </Box>
                            </Box>
                        </Box>
                    </MySettingsItem>

                    <MySettingsItem>
                        <Box sx={{marginBottom: 3}}>
                            <Typography variant="h5" sx={{fontWeight: "bold"}}>Основы</Typography>
                        </Box>
                        <Box sx={{marginBottom: 3}}>
                            <Typography variant="h6">Город</Typography>
                            <TextField onChange={event => setUser({...user, city: event.target.value})} value={user.city} variant="outlined" fullWidth sx={{marginTop: 1}} />
                        </Box>
                        <Box sx={{marginBottom: 3}}>
                            <Typography variant="h6">Биография</Typography>
                            <TextField onChange={event => setUser({...user, bio: event.target.value})} value={user.bio} multiline rows={3} variant="outlined" fullWidth sx={{marginTop: 1}} />
                        </Box>
                    </MySettingsItem>

                    <MySettingsItem>
                        <Box sx={{marginBottom: 3}}>
                            <Typography variant="h5" sx={{fontWeight: "bold"}}>Код</Typography>
                        </Box>
                        <Box sx={{marginBottom: 3}}>
                            <Typography variant="h6">Навыки</Typography>
                            <TextField onChange={event => setUser({...user, skills: event.target.value})} value={user.skills} variant="outlined" fullWidth sx={{marginTop: 1}} />
                        </Box>
                        <Box sx={{marginBottom: 3}}>
                            <Typography variant="h6">Работа</Typography>
                            <TextField onChange={event => setUser({...user, work: event.target.value})} value={user.work} variant="outlined" fullWidth sx={{marginTop: 1}} />
                        </Box>
                    </MySettingsItem>

                    <MySettingsItem>
                        {message.text && <Alert sx={{marginBottom: 1}} severity={message.type}>{message.text}</Alert>}
                        <Button variant="contained" fullWidth onClick={changeUserInfoHandler}>Сохранить информацию о профиле</Button>
                    </MySettingsItem>
                </Box>
            </Box>
        </>
    )
}

export default Settings;
