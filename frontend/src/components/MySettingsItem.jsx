import React from 'react';
import { Box } from "@mui/material";

const MySettingsItem = ({ children }) => {
    return (
        <Box sx={{
            marginTop: 5,
            backgroundColor: "#fff",
            padding: 2,
            borderRadius: 1,
            border: "1px solid lightgrey"
        }}>
            {children}
        </Box>
    )
}

export default MySettingsItem
