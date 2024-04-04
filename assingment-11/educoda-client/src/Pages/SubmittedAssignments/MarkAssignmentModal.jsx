import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Document, Page, pdfjs } from "react-pdf";
import Swal from "sweetalert2";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MarkAssignmentModal = ({ viewAssignment, handleGiveMark }) => {
  const modalRef = useRef(null);

  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const { notes, pdf, _id } = viewAssignment || {};

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleMarkAssignment = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const getMarks = form.get("marks");
    const feedback = form.get("feedback");

    const assignmentInfo = {
      obtainmarks: +getMarks,
      feedback,
      status: "completed",
    };

    // Call the handleGiveMark function passed as a prop
    handleGiveMark(assignmentInfo);

    modalRef.current.close();
  };

  return (
    <div>
      <dialog
        ref={modalRef}
        id={`my_modal_${_id}`}
        className="modal modal-center"
      >
        <div className="p-6 bg-white border rounded-lg modal-box">
          <h3 className="text-lg font-bold">Mark Assignment</h3>
          <div className="py-4">
            <iframe
              src={pdf}
              frameBorder="0"
              width="100%"
              height="200"
              title="PDF Viewer"
            ></iframe>
            <a
              href={pdf}
              className="text-orange-500 cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here to view PDF
            </a>

            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div>
          <p>{notes}</p>
          <form onSubmit={handleMarkAssignment}>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Marks:</label>
              <input
                type="number"
                id="marks"
                name="marks"
                required
                className="w-full max-w-sm input input-bordered"
                placeholder="Marks"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-bold">Feedback:</label>
              <textarea
                name="feedback"
                required
                placeholder="Enter feedback"
                className="w-full max-w-sm textarea textarea-bordered textarea-sm"
              ></textarea>
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          <form method="dialog">
            <button className="btn btn-secondary bg-[#E5E6E6] outline-none border-none hover:bg-[#D4D5D5] text-black">
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Close
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MarkAssignmentModal;
