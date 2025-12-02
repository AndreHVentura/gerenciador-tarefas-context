import { useState } from "react";
import { TaskProvider } from "./context/TaskContext";
import AddCategory from "./components/AddCategory";
import CategoryList from "./components/CategoryList";
import AddTask from "./components/AddTask";
import MenuLateral from "./components/Menulateral";
import Calendario from "./components/Calendario";
import DailyTasks from "./components/DailyTasks";
import ProjectCard from "./components/ProjectCard";
import "./styles/App.css";

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  return (
    <TaskProvider>
      <div className="app-container">
        <div className="sidebar">
          <MenuLateral />
          <div className="prova-sidebar-section">
            <div className="section-title">
              <h3>📁 Categorias</h3>
            </div>
            <AddCategory />
            <div className="compact-categories">
              <CategoryList onCategorySelect={setSelectedCategoryId} />
            </div>
            {selectedCategoryId && (
              <div className="add-task-sidebar">
                <h4>➕ Adicionar Tarefa</h4>
                <AddTask categoryId={selectedCategoryId} />
              </div>
            )}
          </div>
        </div>
        <main className="main-content">
          <header className="dashboard-header">
            <h1>📊 Gerenciador de Tarefas</h1>
          </header>
          <div className="content-grid">
            <div className="left-column">
              <div className="projects-section">
                <ProjectCard type="frontend" />
                <ProjectCard type="backend" />
              </div>
              <div className="progress-section">
                <h3>📈 Progresso</h3>
                <div className="progress-cards">
                  <div className="progress-card">
                    <h4>ABP-Sprint 3</h4>
                    <p className="progress-date">2 dias atrás</p>
                    <div className="progress-bar-small">
                      <div className="progress-fill" style={{ width: "75%" }} />
                    </div>
                  </div>
                  <div className="progress-card">
                    <h4>Prova Banco de Dados</h4>
                    <p className="progress-date">Amanhã</p>
                    <div className="progress-bar-small">
                      <div className="progress-fill" style={{ width: "50%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-column">
              <div className="calendar-section">
                <div className="section-header">
                  <h3>🗓️ Calendário</h3>
                  <button className="add-task-btn">+ Adicionar Task</button>
                </div>
                <Calendario />
              </div>
              <div className="daily-tasks-section">
                <DailyTasks />
              </div>
            </div>
          </div>
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;
