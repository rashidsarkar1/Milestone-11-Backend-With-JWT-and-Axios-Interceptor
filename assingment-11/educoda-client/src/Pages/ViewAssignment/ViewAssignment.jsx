import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import axiosInstance from "../../AxiosAPI/axiosInstance";
import CustomLoading from "../../Components/CustomLoading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "aos/dist/aos.css";
import AOS from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import TakeAssignmentModal from "./TakeAssignmentModal";
import useAxiosInstance from "../../AxiosAPI/useAxiosInstance";
import useAuthProvider from "../../FireBase/useAuthProvider";
import Swal from "sweetalert2";

import { Tooltip as ReactTooltip } from "react-tooltip";

function ViewAssignment() {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();
  const { user } = useAuthProvider();
  const navigate = useNavigate();

  const { idx } = useParams();

  const getData = async () => {
    const myData = await axiosInstance.get(`/api/view-assignments/${idx}`);
    return myData.data;
  };

  const {
    data: viewAssignment,
    isLoading,
    error,
  } = useQuery({
    queryFn: getData,
    queryKey: ["all-assignments"],
  });

  useEffect(() => {
    AOS.init();
  }, []);

  const {
    title,
    difficulty,
    marks,
    thumbnail,
    description,
    dueDate,
    email,
    _id,
  } = viewAssignment || {};
  const isCurrentUser = email === user?.email;

  const deleteButtonStyle = {
    backgroundColor: isCurrentUser ? "red" : "gray",
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
        navigate("/assignments");
        mutateAsync(itemId);
      }
    });
  };
  let tooltipContent = "You didn't create this.";
  if (isCurrentUser) {
    tooltipContent = null; // No content if the user is the creator
  }

  if (error) {
    return error.message;
  }

  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }

  return (
    <div className="min-h-screen pt-[150px] bg-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div
            data-aos="zoom-in"
            className="w-full md:flex md:justify-center md:items-center md:w-1/2"
          >
            <img src={thumbnail} alt={title} className="w-full rounded-lg" />
          </div>
          <div data-aos="zoom-in" className="w-full p-8 md:w-1/2">
            <h2 className="text-3xl font-semibold">{title}</h2>
            <p className="text-xl font-bold text-green-600">Marks: {marks}</p>
            <p className="text-xl font-bold text-green-600">
              Difficulty: {difficulty}
            </p>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold">Assignments Details</h3>
              <p className="mt-4 text-gray-700">{description}</p>
              <p className="mt-4 text-gray-700">DueDate : {dueDate}</p>
            </div>
            <div className="flex flex-wrap mt-8 space-y-3 lg:space-x-2 lg:block">
              <Link
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
                className="bg-blue-500 border-none outline-none btn btn-primary hover:bg-blue-600"
              >
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="w-5 h-5 mr-2"
                />
                Take assignment
              </Link>
              <Link className="tooltip" data-tip={tooltipContent}>
                <button
                  onClick={() => handleDelete(_id)}
                  disabled={!isCurrentUser}
                  style={deleteButtonStyle}
                  className="btn btn-error"
                >
                  <FontAwesomeIcon icon={faTrash} className="w-5 h-5 mr-2" />
                  Delete Assignment
                </button>
              </Link>
              {/* Open the modal using document.getElementById('ID').showModal() method */}

              <TakeAssignmentModal
                viewAssignment={viewAssignment}
              ></TakeAssignmentModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAssignment;
