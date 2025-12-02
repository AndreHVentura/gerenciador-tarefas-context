import React, { useState, useMemo } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { useTaskContext } from "../context/TaskContext";

const Calendario: React.FC = () => {
  const { selectedDate, setSelectedDate, getTasksByDate, addTask } = useTaskContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickTaskText, setQuickTaskText] = useState("");

  // Formatar mês/ano em português
  const monthYearFormat = useMemo(() => {
    return currentMonth.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
  }, [currentMonth]);


  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  // Dias do mês
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      i
    );
    const dateString = date.toISOString().split("T")[0];
    const tasksForDay = getTasksByDate(dateString);

    days.push({
      date: dateString,
      day: i,
      hasTasks: tasksForDay.length > 0,
      isSelected: dateString === selectedDate,
      isToday: dateString === new Date().toISOString().split("T")[0],
      isWeekend: date.getDay() === 0 || date.getDay() === 6, 
    });
  }

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleDayClick = (dateString: string | null) => {
    if (dateString) {
      setSelectedDate(dateString);
    }
  };

  const handleQuickAddTask = () => {
    if (quickTaskText.trim() === "") return;
    
    addTask({
      text: quickTaskText.trim(),
      completed: false,
      categoryId: 1, 
      date: selectedDate,
      priority: "medium"
    });
    
    setQuickTaskText("");
    setShowQuickAdd(false);
  };

  return (
    <div className="calendar-section">
      <div className="calendar-header">
        <h3 style={{ textTransform: "capitalize" }}>{monthYearFormat}</h3>
        <div className="calendar-nav">
          <button onClick={prevMonth} aria-label="Mês anterior">
            <FaChevronLeft />
          </button>
          <button onClick={nextMonth} aria-label="Próximo mês">
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="week-days">
        {weekDays.map((day) => (
          <div key={day} className="week-day">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${!day ? "empty" : ""} ${
              day?.isSelected ? "selected" : ""
            } ${day?.isToday ? "today" : ""} ${
              day?.isWeekend ? "weekend" : ""
            }`}
            onClick={() => handleDayClick(day?.date || null)}
            title={day?.date ? `Tarefas para ${day.date}` : ""}
          >
            {day && (
              <>
                <span className="day-number">{day.day}</span>
                {day.hasTasks && <div className="task-dot" />}
                {day.isToday && <div className="today-indicator" />}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="quick-add-section">
        <button 
          className="add-task-btn"
          onClick={() => setShowQuickAdd(!showQuickAdd)}
        >
          <FaPlus /> {showQuickAdd ? "Cancelar" : "Adicionar Tarefa Rápida"}
        </button>
        
        {showQuickAdd && (
          <div className="quick-add-form">
            <input
              type="text"
              value={quickTaskText}
              onChange={(e) => setQuickTaskText(e.target.value)}
              placeholder={`Tarefa para ${selectedDate}...`}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleQuickAddTask();
                }
              }}
              autoFocus
            />
            <button 
              onClick={handleQuickAddTask}
              disabled={quickTaskText.trim() === ""}
              className="btn-add-quick"
            >
              <FaPlus /> Adicionar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendario;