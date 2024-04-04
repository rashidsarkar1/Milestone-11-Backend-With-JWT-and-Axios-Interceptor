import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip as ReactTooltip } from "react-tooltip";

import {
  faCheckCircle,
  faEdit,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import useAuthProvider from "../../FireBase/useAuthProvider";
import Swal from "sweetalert2";
// import axiosInstance from "../../AxiosAPI/axiosInstance";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosInstance from "../../AxiosAPI/useAxiosInstance";
import "./ALLAssingment.css";

function AssignmentCard({ assignment }) {
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();

  const queryClient = useQueryClient();
  const { user } = useAuthProvider();
  const {
    title,
    difficulty,
    marks,
    thumbnail,
    description,
    dueDate,
    email,
    _id,
  } = assignment;

  const isCurrentUser = email === user?.email;

  const updateButtonStyle = {
    backgroundColor: isCurrentUser ? "#3ABFF8" : "gray",
  };
  const UpdateButtonClass = isCurrentUser
    ? "btn btn-active  "
    : "btn btn-disabled";

  const deleteButtonStyle = {
    flex: "1",
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    color: "white",
    transition: "background 0.3s",
    backgroundColor: isCurrentUser ? "red" : "gray",
    borderRadius: "4px",
  };
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(
        `/api/delete-my-assignments/${id}`
      );
      return res.data;
    },
    // mutationKey: ["bookingData"],

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Assignment has been deleted successfully.",
      });
      // QueryClient.invalidateQueries(["create-assignments"]);
      queryClient.invalidateQueries("create-assignments");
    },
  });

  const handleDelete = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Trigger the mutation to delete the assignment
        mutateAsync(itemId);
      }
    });
  };
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".carda"), {
      glare: true,
      reverse: true,
      "max-glare": 0.5,
    });
  }, []);
  const updateBTN = () => {
    console.log("click ok");
    navigate(`/updateassignment/${_id}`);
  };
  const viewBTN = () => {
    console.log("click ok");
    navigate(`/assignmentDetails/${_id}`);
  };

  let tooltipContent = "You didn't create this.";
  if (isCurrentUser) {
    tooltipContent = null; // No content if the user is the creator
  }
  let cardStyle = {
    backgroundImage: `url(${thumbnail})`,
  };

  return (
    <div className="mx-4 md:mx-0 cards-container">
      <div className="m-2 mx-auto carda lg:m-7 md:m-3 md:pb-0 pb-5">
        <div style={cardStyle} className="card-image quiz-image"></div>
        <div className="card-text">
          <span className="date uppercase">{difficulty}</span>
          <h2>{title}</h2>
          <p>Mark:{marks}</p>
        </div>

        <div className="">
          {/* <div className="space-x-2 lg:mb-3 flex flex-wrap justify-center"> */}
          <div className="join join-vertical md:join-horizontal md:space-x-1 lg:join-horizontal lg:space-x-2">
            <Link
              className="tooltip "
              data-tip={tooltipContent}
              // to={`/updateassignment/${_id}`}
            >
              <button
                onClick={updateBTN}
                style={updateButtonStyle}
                disabled={!isCurrentUser}
                className={UpdateButtonClass}
              >
                Update Assignment
              </button>
            </Link>

            <button onClick={viewBTN} className="btn btn-active btn-success">
              View Assignment
            </button>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default AssignmentCard;
