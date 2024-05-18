import React, { useState, useEffect } from 'react';
import MainPage from './MainPage';
import './App.css';

// Define the ChecklistItem interface
export interface ChecklistItem {
    id: string;
    date: string;
    type: string;
    status: { [key: string]: string };
}

const App: React.FC = () => {
    const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(() => {
        const savedItems = localStorage.getItem('checklistItems');
        return savedItems ? JSON.parse(savedItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('checklistItems', JSON.stringify(checklistItems));
    }, [checklistItems]);

    const addChecklistItem = (item: ChecklistItem) => {
        setChecklistItems([...checklistItems, item]);
    };

    const updateChecklistItem = (updatedItem: ChecklistItem) => {
        setChecklistItems(checklistItems.map(item => (item.id === updatedItem.id ? updatedItem : item)));
    };

    return (
        <div className="App">
            <MainPage 
                checklistItems={checklistItems} 
                addChecklistItem={addChecklistItem} 
                updateChecklistItem={updateChecklistItem} 
            />
        </div>
    );
};

export default App;
