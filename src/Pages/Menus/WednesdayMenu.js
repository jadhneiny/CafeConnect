import React, { useState, useEffect } from 'react';
import './Menus.css'; 

const WednesdayMenu = () => {
  const [MenuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/getMenuItems'); 
        const data = await response.json();
        setMenuItems(data);
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

  return (
    <div className="menu-container">
      <h1 className="main-title">CafeConnect</h1>
      <h2 className="sub-title">Wednesday's Menu</h2>
      <div className="menu-grid">
        {MenuItems.map(item => (
          <div key={item.id} className="menu-item">
            <span className="item-name">{item.name}</span>
            <span className="item-price">${item.price}</span>
            <span className={`stock-status ${getStockStatus(item.availability.Wednesday).toLowerCase()}`}>
              {getStockStatus(item.availability.Wednesday)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WednesdayMenu;
