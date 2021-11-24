import { Box } from '@mui/system';
import { FormGroup, TextField, Typography, Button, Alert, Link } from '@mui/material';
import React from 'react';

const Register = () => {
    const [info, setInfo] = React.useState({
        name: "", city: "", email: "", password: "", bio: "", work: "", skills: ""
    })
    const [messageInfo, setMessageInfo] = React.useState({
        text: "", type: ""
    });
    const [loading, setLoading] = React.useState(false);

    const registerHandler = async() => {
        try {
            setLoading(true);

            const response = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(info),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            response.json().then(data => {
                setLoading(false);
                if (response.ok) {
                    setMessageInfo({
                        text: data.message,
                        type: "success"
                    })

                    setInfo({
                        name: "", city: "", email: "", password: "", bio: "", work: "", skills: ""
                    })
                } else {
                    setMessageInfo({
                        text: data.message,
                        type: "error"
                    })
                }
            })
        } catch(e) {
            setLoading(false);
            setMessageInfo({
                text: e.message,
                type: "error"
            })
        }
    }

    return (
        <>
            {messageInfo.text && <Alert sx={{marginTop: 1}} severity={messageInfo.type}>{messageInfo.text}</Alert>}
            <Box maxWidth={"50%"} margin={"0 auto"} marginTop={2} className="register">
                <Typography variant="h2" component="div" marginBottom={3}>Регистрация</Typography>
                <FormGroup>
                    <TextField
                        label="Имя пользователя"
                        variant="outlined"
                        name="name"
                        type="text"
                        value={info.name}
                        onChange={event => setInfo({...info, name: event.target.value})}
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        label="Город" 
                        variant="outlined"
                        name="city"
                        type="text"
                        value={info.city}
                        onChange={event => setInfo({...info, city: event.target.value})}
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        label="Почта" 
                        variant="outlined"
                        name="email"
                        type="email"
                        value={info.email}
                        onChange={event => setInfo({...info, email: event.target.value})}
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        label="Пароль" 
                        variant="outlined"
                        name="password"
                        type="password"
                        value={info.password}
                        onChange={event => setInfo({...info, password: event.target.value})}
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        label="Биография" 
                        variant="outlined"
                        name="bio"
                        value={info.bio}
                        onChange={event => setInfo({...info, bio: event.target.value})}
                        sx={{marginBottom: 2}}
                        multiline
                        rows={3}
                    />
                    <TextField
                        label="Что делаете? Чем занимаетесь?" 
                        variant="outlined"
                        name="work"
                        type="text"
                        value={info.work}
                        onChange={event => setInfo({...info, work: event.target.value})}
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        label="Навыки"
                        type="text" 
                        variant="outlined"
                        name="skills"
                        value={info.skills}
                        onChange={event => setInfo({...info, skills: event.target.value})}
                        sx={{marginBottom: 2}}
                    />

                    <Button variant="contained" sx={{padding: 1.3}} onClick={registerHandler} disabled={loading}>Зарегистрироваться</Button>
                </FormGroup>

                <Typography variant="body1" gutterBottom textAlign="center" marginTop={1}>
                    Есть аккаунт? <Link href="/login">Войти</Link>
                </Typography>
            </Box>
        </>
    )
}

export default Register;
