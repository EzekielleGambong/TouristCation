import React from "react";

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageNumbersToShow = 5; // Number of page buttons to display

  // Calculate the range of pages to display
  const getPageNumbers = () => {
    let startPage, endPage;

    if (totalPages <= maxPageNumbersToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const middlePage = Math.ceil(maxPageNumbersToShow / 2);
      if (currentPage <= middlePage) {
        startPage = 1;
        endPage = maxPageNumbersToShow;
      } else if (currentPage + middlePage - 1 >= totalPages) {
        startPage = totalPages - maxPageNumbersToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - middlePage + 1;
        endPage = currentPage + middlePage - 1;
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="flex space-x-2 items-center">
      {/* Left Arrow */}
      <button
        className="p-2 bg-gray-300 rounded"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`p-2 ${currentPage === page ? "bg-green-500 text-white" : "bg-yellow-300"}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Right Arrow */}
      <button
        className="p-2 bg-gray-300 rounded"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
