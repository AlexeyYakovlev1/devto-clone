import { Box } from '@mui/system';
import React from 'react';
import { FormGroup, TextField, Typography, Button, Alert, Link } from '@mui/material';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [messageInfo, setMessageInfo] = React.useState("");
    const [info, setInfo] = React.useState({email: "", password: ""});
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();
    const auth = React.useContext(AuthContext);

    const loginHandler = async() => {
        try {
            setLoading(true);

            const response = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(info),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            response.json().then(data => {
                setLoading(false);

                if (!response.ok) {
                    return setMessageInfo({
                        text: data.message,
                        type: "error"
                    })
                }

                auth.login(data.token, data.userInfo);
                history.push("/");
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
            <Box maxWidth={"50%"} margin={"0 auto"} marginTop={2} className="login">
                <Typography variant="h2" component="div" marginBottom={3}>Вход</Typography>
                <FormGroup>
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
                    <Button variant="contained" sx={{padding: 1.3}} onClick={loginHandler} disabled={loading}>Войти</Button>
                </FormGroup>

                <Typography variant="body1" gutterBottom textAlign="center" marginTop={1}>
                    Нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
                </Typography>
            </Box>
        </>
    )
}

export default Login;
