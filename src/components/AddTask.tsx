import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { FaCalendarAlt } from "react-icons/fa";

interface AddTaskProps {
  categoryId: number;
}

const AddTask: React.FC<AddTaskProps> = ({ categoryId }) => {
  const [taskText, setTaskText] = useState("");
  const { addTask, selectedDate } = useTaskContext();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask({
        text: taskText.trim(),
        completed: false,
        categoryId,
        date: selectedDate,
        priority: "medium",
      });
      setTaskText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form-integrated">
      <div className="form-header">
        <FaCalendarAlt />
        <span>Adicionar para {selectedDate}</span>
      </div>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Task description..."
        required
      />
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default AddTask;
