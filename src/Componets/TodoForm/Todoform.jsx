// src/components/TodoForm.js
import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('low');
    const [checklist, setChecklist] = useState(['']);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        addTodo({
            title,
            priority,
            checklist: checklist.filter(item => item.trim() !== '')
        });
        setTitle('');
        setPriority('low');
        setChecklist(['']);
    };

    const handleChecklistChange = (index, event) => {
        const newChecklist = [...checklist];
        newChecklist[index] = event.target.value;
        setChecklist(newChecklist);
    };

    const addChecklistItem = () => {
        setChecklist([...checklist, '']);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
            </label>
            <br/>
            <label>
                Priority:
                <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)} 
                    required
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </label>
            <br/>
            <label>
                Checklist:
                {checklist.map((item, index) => (
                    <div key={index}>
                        <input 
                            type="text" 
                            value={item} 
                            onChange={(e) => handleChecklistChange(index, e)} 
                        />
                    </div>
                ))}
                <button type="button" onClick={addChecklistItem}>Add Checklist Item</button>
            </label>
            <br/>
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
