import React from 'react';
import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import propTypes from "prop-types";
import { NavLink } from 'react-router-dom';

const Comment = ({ info }) => {
    const [user, setUser] = React.useState({});
    const { token } = React.useContext(AuthContext);
    const [loading, setLoading] = React.useState(false);
    const date = `${new Date(info.createdAt).toLocaleDateString()}`;

    React.useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true);
                const response = await fetch("/api/users/" + info.owner, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })

                response.json().then(data => {
                    setLoading(false);
                    if (response.ok) {
                        setUser(data.findUser);
                    } else {
                        console.log(data.message);
                    }
                })
            } catch(e) {
                setLoading(false);
            }
        }

        fetchUser();
        // eslint-disable-next-line
    }, []);

    return (
        <Box sx={{marginTop: 3, display: "flex", alignItems: "flex-start"}}>
            {loading && <CircularProgress />}
            <Avatar alt={user.name} src={user.avatar} sx={{width: 32, height: 32}} />

            <Box sx={{marginLeft: 1, border: "1px solid lightgrey", borderRadius: 1, padding: "15px", width: "100%"}}>
                <Box sx={{marginBottom: 1}}>
                    <Typography component="span" sx={{fontWeight: "bold", marginRight: 1}}>
                        <NavLink to={`/user/${user._id}`}>{user.name}</NavLink>
                    </Typography>
                    <Typography component="span" sx={{color: "gray"}}>{date}</Typography>
                </Box>

                <Typography sx={{fontSize: 18}}>{info.text}</Typography>
            </Box>
        </Box>
    )
}

Comment.propTypes = {
    info: propTypes.object.isRequired
}

export default Comment;
