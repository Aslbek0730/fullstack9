import { NavLink } from 'react-router-dom';
import { 
  BsHouseDoor,
  BsBook,
  BsCollection,
  BsRobot,
  BsChatDots,
  BsClipboardCheck,
  BsPerson,
  BsBoxArrowRight
} from 'react-icons/bs';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <NavLink to="/dashboard" className="sidebar-item">
          <BsHouseDoor /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/my-courses" className="sidebar-item">
          <BsBook /> <span>Mening Kurslarim</span>
        </NavLink>
        <NavLink to="/library" className="sidebar-item">
          <BsCollection /> <span>Kutubxona</span>
        </NavLink>
        <NavLink to="/ai-assistant" className="sidebar-item">
          <BsRobot /> <span>Sun'iy Intellekt</span>
        </NavLink>
        <NavLink to="/forum" className="sidebar-item">
          <BsChatDots /> <span>Forum</span>
        </NavLink>
        <NavLink to="/tests" className="sidebar-item">
          <BsClipboardCheck /> <span>Testlar</span>
        </NavLink>
        <NavLink to="/profile" className="sidebar-item">
          <BsPerson /> <span>Profil</span>
        </NavLink>
        <NavLink to="/login" className="sidebar-item logout">
          <BsBoxArrowRight /> <span>Chiqish</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;