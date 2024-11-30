import React, { useEffect, useState } from "react";

function DataPanel({ economicData }) {
  const records = economicData.frequent;
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const totalPages = Math.ceil(records.length / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [economicData]);

  const generatePageNumbers = () => {
    const pages = [];
    const siblingCount = 4;
    const totalVisiblePages = siblingCount * 2 + 3;

    if (totalPages <= totalVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
      let rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages - 1
      );

      if (leftSiblingIndex > 2) {
        pages.push("...");
      }

      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i);
      }

      if (rightSiblingIndex < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const renderPagination = () => {
    return (
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 mx-1 border rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-100"
          }`}
        >
          Prev
        </button>

        {generatePageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-3 py-1">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 mx-1 border rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 mx-1 border rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 ">
      <div className="ml-5">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th>New Release</th>
              <th>Frequency</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody className="">
            {currentRecords.map((record, index) => (
              <tr
                key={index}
                className={`border-8 border-solid border-white rounded-md ${
                  index % 2 === 0 ? "bg-slate-100" : "bg-slate-200"
                }`}
              >
                <td>
                  <div>{record.title}</div>
                  <span className="bg-blue-100 text-blue-500 text-[10px] p-1">{`${record.cat} / ${record.subCat}`}</span>
                </td>
                <td>{record.freq}</td>
                <td>{record.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </div>
  );
}

export default DataPanel;
