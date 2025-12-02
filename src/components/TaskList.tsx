import React from "react";
import { FaCheck, FaClock } from "react-icons/fa";
import { useTaskContext } from "../context/TaskContext";

interface TaskListProps {
  categoryId: number;
}

const TaskList: React.FC<TaskListProps> = ({ categoryId }) => {
  const { getTasksByCategory, toggleTask } = useTaskContext();
  
  // Isso retorna Task[] - verifique se está funcionando
  const categoryTasks = getTasksByCategory(categoryId);

  // Debug: verifique o que está retornando
  console.log('categoryTasks:', categoryTasks);

  return (
    <div className="task-list">
      {categoryTasks && categoryTasks.length === 0 ? (
        <p className="no-tasks">Nenhuma tarefa nesta categoria.</p>
      ) : (
        <ul className="tasks">
          {categoryTasks?.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  // CORREÇÃO AQUI: apenas task.id, não categoryId
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-text">{task.text}</span>
              </label>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;