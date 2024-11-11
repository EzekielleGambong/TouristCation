import React, { useState } from "react";

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex space-x-2">
      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page}
          className={`p-2 ${currentPage === page + 1 ? "bg-green-500 text-white" : "bg-yellow-300"}`}
          onClick={() => onPageChange(page + 1)}
        >
          {page + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
