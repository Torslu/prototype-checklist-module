import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, List, ListItem, ListItemText, IconButton, Popover, MenuItem, ListItemIcon } from '@mui/material';
import { ChecklistItem } from './App';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LensIcon from '@mui/icons-material/Lens';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ChecklistDetailProps {
    checklist: ChecklistItem | null;
    addChecklistItem: (item: ChecklistItem) => void;
    updateChecklistItem: (item: ChecklistItem) => void;
    onClose: () => void;
}

const ChecklistDetail: React.FC<ChecklistDetailProps> = ({ checklist, addChecklistItem, updateChecklistItem, onClose }) => {
    const [localChecklist, setLocalChecklist] = useState<ChecklistItem | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    useEffect(() => {
        if (checklist) {
            setLocalChecklist(checklist);
        } else {
            setLocalChecklist({
                id: new Date().toISOString(),
                date: new Date().toLocaleDateString(),
                type: 'New Inspection',
                status: {}
            });
        }
    }, [checklist]);

    const handleStatusChange = (item: string, value: string) => {
        if (localChecklist) {
            setLocalChecklist({
                ...localChecklist,
                status: { ...localChecklist.status, [item]: value }
            });
            handleClosePopover();
        }
    };

    const handleToggle = (item: string) => {
        if (localChecklist) {
            const currentStatus = localChecklist.status[item];
            const newStatus = currentStatus === "Gode forhold, ingen tiltak nødvendig" ? "" : "Gode forhold, ingen tiltak nødvendig";
            setLocalChecklist({
                ...localChecklist,
                status: { ...localChecklist.status, [item]: newStatus }
            });
        }
    };

    const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>, item: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedItem(item);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
        setSelectedItem(null);
    };

    const handleSave = () => {
        if (localChecklist) {
            if (checklist) {
                updateChecklistItem(localChecklist);
            } else {
                addChecklistItem(localChecklist);
            }
            onClose();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const checklistItemsList = [
        'Bygnings- og utstyrsmessige forhold',
        'Inneklima',
        'Lysforhold',
        'Støy',
        'Stråling',
        'Maskiner og annet arbeidsutstyr',
        'Innkvartering'
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Gode forhold, ingen tiltak nødvendig':
                return <CheckCircleIcon style={{ color: '#008450' }} />;
            case 'Akseptable forhold, tiltak bør vurderes':
                return <LensIcon style={{ color: '#EFB700' }} />;
            case 'Ikke-akseptable forhold, tiltak nødvendig':
                return <LensIcon style={{ color: '#B81D13' }} />;
            case 'Ikke aktuelt':
                return <LensIcon style={{ color: 'grey' }} />;
            default:
                return <RadioButtonUncheckedIcon style={{ color: 'grey' }} />;
        }
    };

    if (!localChecklist) return null;

    return (
        <Container style={{ paddingBottom: '16px' }}>
            <div className="checklist-detail">
                <Typography variant="body1" gutterBottom>
                    Vernerundesjemaets oppbygning er basert på Arbeidstilsynets arbeidsmiljømodell. Se prosedyre <a href="#">her</a>.
                </Typography>
                <Typography variant="h6">Fysiske forhold</Typography>
                <List>
                    {checklistItemsList.map(item => (
                        <ListItem key={item}>
                            <ListItemText primary={item} />
                            <IconButton onClick={() => handleToggle(item)}>
                                {getStatusIcon(localChecklist.status[item] || '')}
                            </IconButton>
                            <IconButton onClick={(e) => handleOpenPopover(e, item)}>
                                <MoreVertIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {selectedItem && (
                        <div>
                            <MenuItem onClick={() => handleStatusChange(selectedItem, 'Gode forhold, ingen tiltak nødvendig')}>
                                <ListItemIcon><CheckCircleIcon style={{ color: '#008450' }} /></ListItemIcon>
                                Gode forhold, ingen tiltak nødvendig
                            </MenuItem>
                            <MenuItem onClick={() => handleStatusChange(selectedItem, 'Akseptable forhold, tiltak bør vurderes')}>
                                <ListItemIcon><LensIcon style={{ color: '#EFB700' }} /></ListItemIcon>
                                Akseptable forhold, tiltak bør vurderes
                            </MenuItem>
                            <MenuItem onClick={() => handleStatusChange(selectedItem, 'Ikke-akseptable forhold, tiltak nødvendig')}>
                                <ListItemIcon><LensIcon style={{ color: '#B81D13' }} /></ListItemIcon>
                                Ikke-akseptable forhold, tiltak nødvendig
                            </MenuItem>
                            <MenuItem onClick={() => handleStatusChange(selectedItem, 'Ikke aktuelt')}>
                                <ListItemIcon><LensIcon style={{ color: 'grey' }} /></ListItemIcon>
                                Ikke aktuelt
                            </MenuItem>
                        </div>
                    )}
                </Popover>
                <div style={{ marginTop: '16px', paddingBottom: '16px' }}>
                    <Button variant="contained" color="primary" style={{ marginRight: 8 }} onClick={handleSave}>
                        Lagre
                    </Button>
                    <Button variant="outlined" onClick={handleCancel}>
                        Avbryt
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default ChecklistDetail;
