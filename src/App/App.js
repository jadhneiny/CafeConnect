import React from "react";
import VerificationPage from "../Pages/Verification/VerificationPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import AdminPage from "../App/AdminPage";
import WeekDaysPage from "../Pages/WeekDays/WeekDaysPage";
import MondayMenu from '../Pages/Menus/MondayMenu';
import TuesdayMenu from '../Pages/Menus/TuesdayMenu';
import WednesdayMenu from '../Pages/Menus/WednesdayMenu';
import ThursdayMenu from '../Pages/Menus/ThursdayMenu';
import FridayMenu from '../Pages/Menus/FridayMenu';
import SaturdayMenu from '../Pages/Menus/SaturdayMenu';
import SundayMenu from '../Pages/Menus/SundayMenu';
import Home from "../Pages/Home/Home";

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weekdays" element={<WeekDaysPage />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/MondayMenu" element={<MondayMenu />} />
        <Route path="/TuesdayMenu" element={<TuesdayMenu />} />
        <Route path="/WednesdayMenu" element={<WednesdayMenu />} />
        <Route path="/ThursdayMenu" element={<ThursdayMenu />} />
        <Route path="/FridayMenu" element={<FridayMenu />} />
        <Route path="/SaturdayMenu" element={<SaturdayMenu />} />
        <Route path="/SundayMenu" element={<SundayMenu />} />
        <Route path="/AdminPage" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
