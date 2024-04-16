import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

// Mock data for initial menu items
const initialMenuItems = [
  { id: 1, name: 'Item 1', description: 'Description 1', price: '10' },
  { id: 2, name: 'Item 2', description: 'Description 2', price: '15' },
  { id: 3, name: 'Item 3', description: 'Description 3', price: '20' },
];

function AdminPage() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '' });
  const [editItemId, setEditItemId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const addItem = () => {
    const newItemWithId = { ...newItem, id: Date.now() };
    setMenuItems([...menuItems, newItemWithId]);
    setNewItem({ name: '', description: '', price: '' });
  };

  const startEditItem = (id) => {
    setEditItemId(id);
    const item = menuItems.find(item => item.id === id);
    setNewItem({ name: item.name, description: item.description, price: item.price });
  };

  const saveItem = () => {
    const updatedItems = menuItems.map(item => 
      item.id === editItemId ? { ...item, ...newItem } : item
    );
    setMenuItems(updatedItems);
    setEditItemId(null);
    setNewItem({ name: '', description: '', price: '' });
  };

  const deleteItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const navigateBack = () => {
    navigate('/weekdays');
  };

  return (
    <div className="AdminPage">
      <h2>Admin Page</h2>
      <div className="AddItemForm">
        <input 
          type="text" 
          name="name"
          value={newItem.name} 
          onChange={handleChange} 
          placeholder="Item Name" 
        />
        <textarea
          name="description"
          value={newItem.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input 
          type="text" 
          name="price"
          value={newItem.price} 
          onChange={handleChange} 
          placeholder="Price" 
        />
        {editItemId ? (
          <button onClick={saveItem}>Save Item</button>
        ) : (
          <button onClick={addItem}>Add Item</button>
        )}
      </div>
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.description} - ${item.price}
            <button onClick={() => startEditItem(item.id)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={navigateBack}>Back to Days of the Week</button>
    </div>
  );
}

export default AdminPage;
