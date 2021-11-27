import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import propTypes from 'prop-types';

const MyModal = ({children, open, setOpen}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: '#fff',
        border: '1px solid lightgrey',
        p: 4,
        borderRadius: 2
    };
    
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{...style}}>
                {children}
            </Box>
        </Modal>
    )
}

MyModal.propTypes = {
    open: propTypes.bool.isRequired,
    setOpen: propTypes.func.isRequired
}

export default MyModal
