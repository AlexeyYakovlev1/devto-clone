import { Card, CardContent, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import propTypes from "prop-types";
import Close from '@mui/icons-material/Close';

const ProfileCard = ({ open, setOpen }) => {
    const { userInfo, logout } = React.useContext(AuthContext);

    return (
        <Card sx={{
            display: !open && "none",
            bgcolor: '#fff',
            borderRadius: 1,
            boxShadow: 1,
            borderColor: "lightgrey",
            position: "absolute",
            width: 230,
            right: 0,
            top: 60,
            zIndex: 99
        }}>
            <CardContent sx={{padding: "10px !important"}}>
                <List sx={{
                    position: "relative",
                    width: '100%',
                    padding: 0
                }}>
                    <Close sx={{position: "absolute", top: 0, right: 0, zIndex: 99, cursor: "pointer"}} onClick={() => setOpen(false)} />
                    <ListItem className="profileCard__item" sx={{
                        padding: "10px, 15px",
                        width: "100%",
                        borderRadius: 1
                    }}>
                        <NavLink to={`/user/${userInfo._id}`}>
                            <Typography variant="h6">{userInfo.name}</Typography>
                        </NavLink>
                    </ListItem>
                    <ListItem className="profileCard__item" sx={{borderRadius: 1}}>
                        <NavLink to="/new">
                            <Typography>Создать пост</Typography>
                        </NavLink>
                    </ListItem>
                    <ListItem className="profileCard__item" sx={{borderRadius: 1}}>
                        <NavLink to="/settings">
                            <Typography>Настройки</Typography>
                        </NavLink>
                    </ListItem>
                    <ListItem className="profileCard__item" sx={{cursor: "pointer", borderRadius: 1}} onClick={logout}>
                        <Typography>Выйти</Typography>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}

ProfileCard.propTypes = {
    open: propTypes.bool.isRequired,
    setOpen: propTypes.func.isRequired
}

export default ProfileCard;
