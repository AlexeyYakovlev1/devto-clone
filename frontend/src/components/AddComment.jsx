import React from 'react';
import { Avatar, Box, Button, TextareaAutosize } from "@mui/material";
import { AuthContext } from '../context/AuthContext';
import { useParams } from "react-router-dom";
import propTypes from "prop-types";

const AddComment = ({ setMessage }) => {
    const [loading, setLoading] = React.useState(false);
    const { token, userInfo } = React.useContext(AuthContext);
    const postId = useParams().id;
    const [text, setText] = React.useState("");

    const addCommentHandler = async() => {
        try {
            setLoading(true);
            const response = await fetch("/api/comments/add/" + postId, {
                method: "POST",
                body: JSON.stringify({text}),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            })

            response.json().then(data => {
                setLoading(false);
                if (response.ok) {
                    setMessage({
                        text: data.message, type: "success"
                    })
                    setText("");
                } else {
                    setMessage({
                        text: data.message, type: "error"
                    })
                }
            })
        } catch(e) {
            setLoading(false);
            setMessage({
                text: e.message, type: "error"
            })
        }
    }

    return (
        <Box sx={{
            marginBottom: 2
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "flex-start"
            }}>
                <Avatar alt={userInfo.name} src={userInfo.avatar} sx={{marginRight: 1}} />
                <TextareaAutosize
                    value={text}
                    onChange={event => setText(event.target.value)}
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
                <Button disabled={loading} variant="contained" onClick={addCommentHandler}>Отправить</Button>
            </Box>
        </Box>
    )
}

AddComment.propTypes = {
    setMessage: propTypes.func.isRequired
}

export default AddComment;
