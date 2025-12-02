import React from "react";
import { FaHome, FaCalendarAlt, FaTasks, FaChartBar, FaUser } from "react-icons/fa";
import { useTaskContext } from "../context/TaskContext";

const MenuLateral: React.FC = () => {
  const { getTaskStats } = useTaskContext();
  const stats = getTaskStats();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-avatar">
          <FaUser size={36} />
        </div>
        <div className="user-info">
          <h2>Bem-Vindo!</h2>
          <p className="greeting">Tenha um ótimo dia.</p>
        </div>
      </div>

      <div className="stats-container">
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Minhas Tarefas</h4>
            <span className="stat-value">{stats.totalTasks}</span>
          </div>
          <div className="stat-card">
            <h4>Em Andamento</h4>
            <span className="stat-value">{stats.pendingTasks}</span>
          </div>
          <div className="stat-card">
            <h4>Concluídas</h4>
            <span className="stat-value">{stats.completedTasks}</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className="active">
            <FaHome />
            <span>Dashboard</span>
          </li>
          <li>
            <FaCalendarAlt />
            <span>Calendário</span>
          </li>
          <li>
            <FaTasks />
            <span>Minhas Tarefas</span>
          </li>
          <li>
            <FaChartBar />
            <span>Progresso</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuLateral;