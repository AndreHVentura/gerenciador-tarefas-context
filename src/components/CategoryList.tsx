import React from "react";
import { useTaskContext } from "../context/TaskContext";
import { FaFolder } from "react-icons/fa";

interface CategoryListProps {
  onCategorySelect?: (categoryId: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onCategorySelect }) => {
  const { categories, getTasksByCategory } = useTaskContext();

  if (categories.length === 0) {
    return <p className="no-categories">Sem Categorias ainda</p>;
  }

  return (
    <div className="category-list-integrated">
      {categories.map((category) => {
        const tasks = getTasksByCategory(category.id);
        const completedTasks = tasks.filter((t) => t.completed).length;

        return (
          <div
            key={category.id}
            className="category-item-integrated"
            onClick={() => onCategorySelect?.(category.id)}
            style={{ borderLeftColor: category.color }}
          >
            <div className="category-header">
              <FaFolder color={category.color} />
              <span className="category-name">{category.name}</span>
            </div>
            <div className="category-stats">
              <span className="task-count">{tasks.length} tasks</span>
              <span className="progress-badge">
                {completedTasks}/{tasks.length}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
