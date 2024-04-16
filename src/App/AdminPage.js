import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function AdminPage() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    availability: {
      Monday: '',
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      Friday: '',
      Saturday: '',
      Sunday: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in newItem.availability) {
      setNewItem({
        ...newItem,
        availability: {
          ...newItem.availability,
          [name]: value
        }
      });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const addItem = () => {
    const itemToSubmit = {
      name: newItem.name.trim(),
      description: newItem.description.trim(),
      price: parseFloat(newItem.price),
      availability: {
        Monday: parseInt(newItem.availability.Monday, 10),
        Tuesday: parseInt(newItem.availability.Tuesday, 10),
        Wednesday: parseInt(newItem.availability.Wednesday, 10),
        Thursday: parseInt(newItem.availability.Thursday, 10),
        Friday: parseInt(newItem.availability.Friday, 10),
        Saturday: parseInt(newItem.availability.Saturday, 10),
        Sunday: parseInt(newItem.availability.Sunday, 10)
      }
    };
  
    fetch('/api/createItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemToSubmit)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        // Log or alert the status code and response text for debugging
        response.text().then(text => {
          throw new Error(`Failed to create item: Status ${response.status}, ${text}`);
        });
      }
    })
    .then(data => {
      setMenuItems(prevItems => [...prevItems, data]);
      setNewItem({
        name: '',
        description: '',
        price: '',
        availability: {
          Monday: '',
          Tuesday: '',
          Wednesday: '',
          Thursday: '',
          Friday: '',
          Saturday: '',
          Sunday: ''
        }
      });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error adding item: ' + error.message);
    });
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
        {Object.keys(newItem.availability).map(day => (
          <input 
            key={day}
            type="text" 
            name={day}
            value={newItem.availability[day]} 
            onChange={handleChange} 
            placeholder={`Availability for ${day}`} 
          />
        ))}
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.description} - ${item.price} - Availabilities: {JSON.stringify(item.availability)}
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={navigateBack}>Back to Days of the Week</button>
    </div>
  );
}

export default AdminPage;
