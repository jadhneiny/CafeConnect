import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menus.css';

const ThursdayMenu = () => {
  const navigate = useNavigate();
  const [MenuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/getMenuItems');
        const data = await response.json();
        setMenuItems(data.filter(item => item.availability.Thursday !== ''));
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return "Out of stock";
    } else if (stock <= 3) {
      return "Low in stock";
    } else {
      return "In stock";
    }
  };

  const handleBack = () => {
    navigate('/weekdays');
  };

  return (
    <div className="menu-container">
      <div className="main-title">CafeConnect</div>
      <h2 className="sub-title">Thursday's Menu</h2>
      <div className="menu-grid">
        {MenuItems.map(item => (
          <div key={item.id} className="menu-item">
            <span className="item-name">{item.name}</span>
            <span className="item-description">{item.description}</span>
            <span className="item-price">${item.price}</span>
            <span className={`stock-status ${getStockStatus(item.availability.Thursday).toLowerCase()}`}>
              {getStockStatus(item.availability.Thursday)}
            </span>
          </div>
        ))}
      </div>
      <button onClick={handleBack} className="back-button">Back to Weekdays Page</button>
    </div>
  );
};

export default ThursdayMenu;
