import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Fab, Dialog, DialogTitle, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SecurityIcon from '@mui/icons-material/Security';
import ChecklistIcon from '@mui/icons-material/Checklist';
import DescriptionIcon from '@mui/icons-material/Description';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import ChecklistDetail from './ChecklistDetail';
import { ChecklistItem } from './App'; // Import the ChecklistItem interface

interface MainPageProps {
    checklistItems: ChecklistItem[];
    addChecklistItem: (item: ChecklistItem) => void;
    updateChecklistItem: (item: ChecklistItem) => void;
}

const MainPage: React.FC<MainPageProps> = ({ checklistItems, addChecklistItem, updateChecklistItem }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [editingChecklist, setEditingChecklist] = useState<ChecklistItem | null>(null);

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleClickOpen = () => {
        setEditingChecklist(null); // Indicate creating a new checklist
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleListItemClick = (item: ChecklistItem) => {
        setEditingChecklist(item); // Set the checklist to be edited
        setOpenDialog(true);
    };

    const menuItems = [
        { text: 'Startside', icon: <HomeIcon /> },
        { text: 'Prosjekter', icon: <BusinessIcon /> },
        { text: 'Rapporter', icon: <AssessmentIcon /> },
        { divider: true },
        { text: 'Avvik og forbedring', icon: <ReportProblemIcon /> },
        { text: 'Risikoer', icon: <SecurityIcon /> },
        { text: 'Sjekklister', icon: <ChecklistIcon /> },
        { text: 'Dokumenter', icon: <DescriptionIcon /> },
        { text: 'Maler og skjema', icon: <FormatListBulletedIcon /> },
        { divider: true },
        { text: 'Brukere', icon: <PeopleIcon /> },
        { text: 'Innstillinger', icon: <SettingsIcon /> },
        { text: 'Logg ut', icon: <ExitToAppIcon /> },
    ];

    return (
        <div className="main-page">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Sjekklister</Typography>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={openDrawer} onClose={handleDrawerToggle}>
                <List>
                    {menuItems.map((menuItem, index) => (
                        <React.Fragment key={index}>
                            {menuItem.divider ? (
                                <Divider />
                            ) : (
                                <ListItem button>
                                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                    <ListItemText primary={menuItem.text} />
                                </ListItem>
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>
            <main className="main-content">
                <List>
                    {checklistItems.map(item => (
                        <ListItem button key={item.id} onClick={() => handleListItemClick(item)}>
                            <ListItemText 
                                primary={`Inspeksjonstype: ${item.type}`}
                                secondary={`Dato lagt til: ${item.date}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </main>
            <Fab
                variant="extended"
                color="primary"
                aria-label="add"
                onClick={handleClickOpen}
                sx={{ 
                    position: 'fixed', 
                    bottom: 66, 
                    right: 66, 
                    height: '70px', 
                    width: '250px', 
                    fontSize: '1.2rem', 
                    justifyContent: 'flex-start', 
                    px: 2 
                }}
            >
                <AddIcon sx={{ mr: 1, fontSize: '1.5rem' }} />
                Ny kontroll
            </Fab>
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
                <DialogTitle>{editingChecklist ? 'Rediger Sjekkliste' : 'Ny Sjekkliste'}</DialogTitle>
                <ChecklistDetail 
                    checklist={editingChecklist}
                    addChecklistItem={addChecklistItem} 
                    updateChecklistItem={updateChecklistItem} 
                    onClose={handleCloseDialog}
                />
            </Dialog>
        </div>
    );
};

export default MainPage;
