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
    <div className="flex flex-row space-x-2 justify-end">
      {/* Left Arrow */}
      <button className="px-4 py-2 bg-gray-300 rounded-xl" onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
        {"<"}
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button key={page} className={`px-4 py-2 rounded-xl ${currentPage === page ? "bg-sky-500 text-white" : "bg-white"}`} onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}

      {/* Right Arrow */}
      <button className="px-4 py-2 bg-gray-300 rounded-xl" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
