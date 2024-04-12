import React, { useState } from 'react';
import './Menus.css'; 

const WednesdayMenu = () => {
  // State to store the menu items
  const [menuItems] = useState([
    { id: 1, name: 'Coffee', price: 2.5, stock: 10 },
    { id: 2, name: 'Tea', price: 2, stock: 5 },
    { id: 3, name: 'Sandwich', price: 5, stock: 0 },
    { id: 4, name: 'Salad', price: 6, stock: 3 },
    { id: 5, name: 'Soup', price: 4, stock: 8 },

  ]);

  // Function to determine the stock status for each item
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
        {menuItems.map(item => (
          <div key={item.id} className="menu-item">
            <span className="item-name">{item.name}</span>
            <span className="item-price">${item.price}</span>
            <span className={`stock-status ${getStockStatus(item.stock).toLowerCase()}`}>
              {getStockStatus(item.stock)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WednesdayMenu;
