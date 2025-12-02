import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { FaPlus } from "react-icons/fa";

const AddCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { addCategory } = useTaskContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim()) {
      // Cores pré-definidas para categorias
      const colors = ["#667eea", "#764ba2", "#f56565", "#48bb78", "#ed8936"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      addCategory(categoryName.trim(), randomColor);
      setCategoryName("");
      setIsExpanded(false);
    }
  };

  if (!isExpanded) {
    return (
      <button className="add-category-btn" onClick={() => setIsExpanded(true)}>
        <FaPlus /> Nova Categoria
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="add-category-form">
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Category name..."
        autoFocus
      />
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          Salvar
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => setIsExpanded(false)}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default AddCategory;
