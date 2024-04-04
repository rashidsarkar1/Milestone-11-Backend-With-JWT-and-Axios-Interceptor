import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import MarkAssignmentModal from "./MarkAssignmentModal";
import Swal from "sweetalert2";
// import axiosInstance from "../../AxiosAPI/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "../../AxiosAPI/useAxiosInstance";

function SubmittedAssignmentsCard({ submittedAssignments }) {
  const axiosInstance = useAxiosInstance();

  const { title, marks, thumbnail, status, nameExaminne, examineeName, _id } =
    submittedAssignments;
  console.log(submittedAssignments);
  const queryClient = useQueryClient();
  const modalRef = useRef(null);

  const { mutateAsync } = useMutation({
    mutationFn: async (postData) => {
      const result = await axiosInstance.put(
        `/api/user/marked-assignments/${_id}`,
        postData
      );
      console.log(result.data);
      if (result.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Assignment has been Marked successfully.",
        });
        // navigate("/assignments");
      }
      return result.data;
    },
    mutationKey: ["Submitted-assignments"],
    onSuccess: queryClient.invalidateQueries("Submitted-assignments"),
  });
  const handleGiveMark = async (assignmentInfo) => {
    // console.log(assignmentInfo);
    try {
      await mutateAsync(assignmentInfo);
    } catch (err) {
      console.log(err);
    }
    modalRef.current.close();
    // console.log("Assignment marked:", assignmentInfo);
  };
  // Handle giving a mark here
  // Make sure to handle the mutation and marking the assignment here

  // console.log(_id);
  return (
    <div className="bg-gray-200 rounded-lg shadow-lg lg:w-96">
      <figure>
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-40 rounded"
        />
      </figure>
      <div className="p-4">
        <h2 className="text-3xl italic font-bold text-gray-600">{title}</h2>
        <div className="text-lg text-gray-600 lg:flex lg:justify-between">
          <p>
            <span className="font-semibold">Marks:</span> {marks}
          </p>
        </div>
        <p className="text-lg">Examinee: {nameExaminne}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() =>
              document.getElementById(`my_modal_${_id}`).showModal()
            }
            className="text-white bg-blue-500 border-none outline-none btn btn-secondary hover:bg-blue-600"
          >
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            Give Mark
          </button>
          <MarkAssignmentModal
            handleGiveMark={handleGiveMark}
            viewAssignment={submittedAssignments}
          ></MarkAssignmentModal>
        </div>
      </div>
    </div>
  );
}

export default SubmittedAssignmentsCard;
