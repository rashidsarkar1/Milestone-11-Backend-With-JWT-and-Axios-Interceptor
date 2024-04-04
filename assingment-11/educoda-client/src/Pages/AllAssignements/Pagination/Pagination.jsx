function Pagination({ page, totalPage, setPage, allAssignments }) {
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between lg:flex-row">
        <div className="flex flex-col items-center space-x-2 text-xs lg:flex-row">
          <button className="inline-flex items-center px-4 py-2 font-medium text-gray-600 bg-white rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">
            10 items
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <p className="mt-4 text-gray-500 lg:mt-0">
            Showing {(page - 1) * 10 + 1} to{" "}
            {Math.min(page * 10, allAssignments.count)} of{" "}
            {allAssignments.count} entries
          </p>
        </div>
        <nav
          aria-label="Pagination"
          className="flex items-center justify-center mt-8 text-gray-600 lg:mt-0"
        >
          <button
            onClick={handlePrevious}
            className="p-2 mr-4 rounded hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {Array.from({ length: totalPage }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setPage(idx + 1)}
              className={`${
                idx + 1 === page
                  ? "px-4 py-2 rounded bg-gray-200 text-gray-900 font-medium hover:bg-gray-100"
                  : "px-4 py-2 rounded hover:bg-gray-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            className="p-2 ml-4 rounded hover-bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;
