import React, { useState } from "react";
import { FaPlus, FaCheck, FaClock } from "react-icons/fa";
import { useTaskContext } from "../context/TaskContext";

const DailyTasks: React.FC = () => {
  const { selectedDate, getTasksByDate, toggleTask, addTask, categories } = useTaskContext();
  const tasks = getTasksByDate(selectedDate);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number>(categories[0]?.id || 1);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDaysAgo = (dateString: string) => {
    const taskDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - taskDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Ontem";
    if (diffDays < 7) return `${diffDays} dias atrás`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
    return `${Math.floor(diffDays / 30)} meses atrás`;
  };

  const translatePriority = (priority: string) => {
    const translations: { [key: string]: string } = {
      high: "Alta",
      medium: "Média",
      low: "Baixa"
    };
    return translations[priority] || priority;
  };

  const handleAddTask = () => {
    if (newTaskText.trim() === "") return;
    
    addTask({
      text: newTaskText.trim(),
      completed: false,
      categoryId: selectedCategory,
      date: selectedDate,
      priority: "medium"
    });
    
    setNewTaskText("");
    setShowAddForm(false);
  };

  return (
    <div className="daily-tasks-section">
      <div className="daily-tasks-header">
        <h3>Tarefas para {formatDate(selectedDate)}</h3>
        <button 
          className="add-task-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <FaPlus /> {showAddForm ? "Cancelar" : "Adicionar Tarefa"}
        </button>
      </div>

      {/* FORMULÁRIO PARA ADICIONAR TAREFA */}
      {showAddForm && (
        <div className="add-task-form-container">
          <div className="form-group">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Digite a descrição da tarefa..."
              className="task-input"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            />
            
            <div className="category-select">
              <label>Categoria:</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(Number(e.target.value))}
                className="category-dropdown"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-actions">
              <button 
                onClick={handleAddTask}
                className="btn-primary"
                disabled={newTaskText.trim() === ""}
              >
                <FaPlus /> Adicionar
              </button>
              <button 
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <div className="no-tasks-container">
            <p className="no-tasks">Nenhuma tarefa para este dia</p>
            <small>Clique em "Adicionar Tarefa" para criar uma nova</small>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
              <div className="task-info">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  aria-label={task.completed ? "Marcar como pendente" : "Marcar como concluída"}
                />
                <div className="task-details">
                  <h4 className={task.completed ? "completed" : ""}>
                    {task.text}
                  </h4>
                  <div className="task-metadata">
                    <span className="task-date">
                      {getDaysAgo(task.date)}
                    </span>
                    <span className="task-status">
                      {task.completed ? (
                        <>
                          <FaCheck /> Concluída
                        </>
                      ) : (
                        <>
                          <FaClock /> Pendente
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className={`priority-badge priority-${task.priority}`}>
                {translatePriority(task.priority)}
              </div>
            </div>
          ))
        )}
      </div>

      {tasks.length > 0 && (
        <div className="tasks-summary">
          <span className="summary-text">
            {tasks.filter(t => t.completed).length} de {tasks.length} tarefas concluídas
          </span>
          <div className="progress-bar-summary">
            <div 
              className="progress-fill-summary" 
              style={{ 
                width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyTasks;