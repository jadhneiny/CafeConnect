import React, { useState, useEffect } from 'react';
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
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = () => {
    fetch('/api/getMenuItems')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu items:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in newItem.availability) {
      setNewItem(prevState => ({
        ...prevState,
        availability: {
          ...prevState.availability,
          [name]: value
        }
      }));
    } else {
      setNewItem(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const addItem = () => {
    const itemToSubmit = {
      name: newItem.name.trim(),
      description: newItem.description.trim(),
      price: parseFloat(newItem.price),
      availability: Object.fromEntries(
        Object.entries(newItem.availability).map(([day, value]) => [day, parseInt(value, 10) || ''])
      )
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

  const deleteItem = (itemId) => {
    fetch(`/api/menuItems/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to delete item');
      }
    })
    .then(() => {
      setMenuItems(prevItems => prevItems.filter(item => item._id !== itemId));
    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
  };

  const navigateBack = () => {
    navigate('/weekdays');
  };

  const startEdit = (item) => {
    setNewItem(item);
    setEditing(true);
    setEditingId(item._id);
  };

  const cancelEdit = () => {
    setEditing(false);
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
  };

  const submitEdit = () => {
    const itemToUpdate = {
      ...newItem,
      price: parseFloat(newItem.price),
      availability: Object.fromEntries(
        Object.entries(newItem.availability).map(([day, value]) => [day, parseInt(value, 10) || ''])
      )
    };

    fetch(`/api/menuItems/${editingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemToUpdate)
    })
    .then(response => response.json())
    .then(updatedItem => {
      setMenuItems(prevItems => prevItems.map(item => item._id === editingId ? updatedItem : item));
      cancelEdit();
    })
    .catch(error => {
      console.error('Error updating item:', error);
    });
  };

  return (
    <div className="AdminPage">
      <header className="sticky-header">
        <h2>Admin Page</h2>
      </header>
      <div className="form-container scrollable-form">
        <div className="form-group">
          <input type="text" name="name" value={newItem.name} onChange={handleChange} placeholder="Item Name" />
          <textarea name="description" value={newItem.description} onChange={handleChange} placeholder="Description" />
          <input type="text" name="price" value={newItem.price} onChange={handleChange} placeholder="Price" />
          {Object.keys(newItem.availability).map(day => (
            <div className="availability-entry">
              <label>{day}:</label>
              <input key={day} type="text" name={day} value={newItem.availability[day]} onChange={handleChange} placeholder={`Quantity`} />
            </div>
          ))}
          <button className="btn-primary" onClick={editing ? submitEdit : addItem}>{editing ? 'Save Changes' : 'Add Item'}</button>
          {editing && <button className="btn-secondary" onClick={cancelEdit}>Cancel</button>}
        </div>
      </div>
      <div className="items-container">
        <ul className="item-list">
          {menuItems.map(item => (
            <li key={item._id} className="item">
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-description">{item.description}</span>
                <span className="item-price">${item.price}</span>
                <div className="item-availability">
                  {Object.entries(item.availability).map(([day, hours]) => 
                    <span key={day}>{day}: {hours ? `${hours} ` : 'Unavailable'}</span>
                  )}
                </div>
              </div>
              <div className="item-actions">
                <button className="btn-edit" onClick={() => startEdit(item)}>Edit</button>
                <button className="btn-delete" onClick={() => deleteItem(item._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn-secondary" onClick={navigateBack}>Back to Days of the Week</button>
    </div>
  );
}

export default AdminPage;
