import React from "react";
import { FaCode, FaServer } from "react-icons/fa";
import { useTaskContext } from "../context/TaskContext";

interface ProjectCardProps {
  type: "frontend" | "backend";
}

const ProjectCard: React.FC<ProjectCardProps> = ({ type }) => {
  const { getTasksByCategory } = useTaskContext();

  const projectData = {
    frontend: {
      title: "Front-End Development",
      icon: <FaCode size={24} />,
      categoryId: 1,
      date: "October 4, 2024",
      color: "#667eea",
    },
    backend: {
      title: "Back-End Development",
      icon: <FaServer size={24} />,
      categoryId: 2,
      date: "October 4, 2024",
      color: "#764ba2",
    },
  };

  const data = projectData[type];
  const tasks = getTasksByCategory(data.categoryId);

  return (
    <div className="project-card" style={{ borderTopColor: data.color }}>
      <div className="project-header">
        <div className="project-icon" style={{ backgroundColor: data.color }}>
          {data.icon}
        </div>
        <div>
          <h4>Project {type === "frontend" ? "1" : "2"}</h4>
          <h3>{data.title}</h3>
        </div>
      </div>

      <p className="project-date">{data.date}</p>

      <div className="project-tasks">
        {tasks.slice(0, 3).map((task) => (
          <div key={task.id} className="task-item-small">
            <input type="checkbox" checked={task.completed} readOnly />
            <span className={task.completed ? "completed" : ""}>
              {task.text}
            </span>
          </div>
        ))}
      </div>

      <div className="project-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${
                (tasks.filter((t) => t.completed).length / tasks.length) *
                  100 || 0
              }%`,
              backgroundColor: data.color,
            }}
          />
        </div>
        <span className="progress-text">
          {tasks.filter((t) => t.completed).length} of {tasks.length} tasks
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
