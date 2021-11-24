import React from 'react';
import { Avatar, Box, Button, Container, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const { userInfo } = React.useContext(AuthContext);
    
    return (
        <Box className="header" sx={{backgroundColor: "#fff", padding: 1, boxShadow: 1, marginBottom: 2}}>
            <Container maxWidth="lg">
                <Box className="header__content" sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <Box className="header__left" sx={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <Typography
                            variant="h5"
                            component="div" 
                            sx={{
                                fontWeight: "bold",
                                color: "#fff",
                                backgroundColor: "#000",
                                padding: 1,
                                borderRadius: 1
                            }}
                        >
                            <NavLink to="/">DEV</NavLink>
                        </Typography>
                        <TextField label="Поиск..." variant="outlined" sx={{marginLeft: 3, width: 400}} />
                    </Box>

                    <Box className="header__right" sx={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <Button variant="contained">Создать пост</Button>
                        <NavLink to={"/profile/" + userInfo._id}>
                            <Avatar
                                alt={userInfo.name} 
                                src={userInfo.avatar} 
                                sx={{
                                    marginLeft: 3,
                                    border: 1,
                                    width: 48,
                                    height: 48
                                }}
                            />
                        </NavLink>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Header;
