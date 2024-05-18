import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ChecklistList: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/checklist-detail');
    };

    return (
        <div className="checklist-list">
            <List>
                <ListItem button onClick={handleClick}>
                    <ListItemText primary="Truck daglig kontroll" />
                </ListItem>
                <ListItem button onClick={handleClick}>
                    <ListItemText primary="Traverskran" />
                </ListItem>
                <ListItem button onClick={handleClick}>
                    <ListItemText primary="Vernerunde" />
                </ListItem>
            </List>
            <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: 16, right: 16 }}>
                <AddIcon />
            </Fab>
        </div>
    );
};

export default ChecklistList;
