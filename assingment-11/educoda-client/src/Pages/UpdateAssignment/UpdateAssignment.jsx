import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ButtonCustom from "../../Components/ButtonCustom";

import useAuthProvider from "../../FireBase/useAuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
// import axiosInstance from "../../AxiosAPI/axiosInstance";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { updateCurrentUser } from "firebase/auth";
import CustomLoading from "../../Components/CustomLoading";
import useAxiosInstance from "../../AxiosAPI/useAxiosInstance";

function UpdateAssignment() {
  const axiosInstance = useAxiosInstance();

  const { user } = useAuthProvider();
  const { idx } = useParams();
  const navigate = useNavigate();
  // console.log(idx);
  // let email = user.email;

  const {
    data: UpdatedAssignment,
    isLoading,
    error,
    refetch, // Get the refetch function
  } = useQuery({
    queryKey: ["create-assignments", idx],
    queryFn: () => axiosInstance.get(`api/updated-assignments/${idx}`),
  });

  // Assuming UpdatedAssignment contains assignment data
  const assignmentData = UpdatedAssignment?.data || {};

  const [dueDate, setDueDate] = useState(null);
  const handleDateChange = (date) => {
    setDueDate(date); // Update dueDate when the date changes
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (postData) => {
      const result = await axiosInstance.put(
        `/api/updated-my-assignments/${idx}`,
        postData
      );
      console.log(result.data);
      if (result.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Assignment has been updated successfully.",
        });
        navigate("/assignments");
      }
      return result.data;
    },
    mutationKey: ["create-assignments"],
    onSuccess: () => {},
  });

  const handleUpdatedAssignment = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get("title");
    const difficulty = form.get("difficulty");
    const marks = form.get("marks");
    const thumbnail = form.get("thumbnail");
    const description = form.get("description");
    const assignmentInfo = {
      title,
      difficulty,
      marks,
      thumbnail,
      description,
      dueDate,
    };
    try {
      await mutateAsync(assignmentInfo);
    } catch (err) {
      console.log(err);
    }
  };
  if (error) {
    return error.message;
  }

  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }
  let date = UpdatedAssignment?.data.dueDate;
  return (
    <div className="">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/3Y6m6fQ/corinne-kutz-JQL8if-Cl-N-E-unsplash-1.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content  pt-[150px]">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">Explore Assignments</h1>
            <p className="mb-5 font-semibold lg:text-xl">
              Explore a wide range of assignments on our platform, suitable for
              both students seeking learning opportunities and instructors
              creating assignments. Begin your educational journey with us
              today.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div className="assignment-nav-wrap">
        <ul className="nav nav-pills" id="pills-tab-1" role="tablist">
          <li className="nav-item">
            <button
              className="nav-link active"
              id="pills-five-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-five"
              role="tab"
              aria-controls="pills-five"
              aria-selected="true"
            >
              Update Assignment
            </button>
          </li>
        </ul>
      </div>
      <div className="p-8 bg-gray-200 assignment-form-wrap">
        <form onSubmit={handleUpdatedAssignment}>
          <div className="grid-cols-1 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            <div className="mb-4">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                required
                name="title"
                className="block w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Title"
                defaultValue={assignmentData.title || ""}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="difficulty">Difficulty Level:</label>
              <select
                id="difficulty"
                name="difficulty"
                className="block w-full p-2 mt-1 border border-gray-300 rounded"
                defaultValue={assignmentData.difficulty || "Easy"}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="marks">Marks:</label>
              <input
                type="text"
                id="marks"
                name="marks"
                required
                className="block w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Marks"
                defaultValue={assignmentData.marks || ""}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="thumbnail">Thumbnail Image URL:</label>
              <input
                id="thumbnail"
                name="thumbnail"
                required
                className="block w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Thumbnail Image URL"
                defaultValue={assignmentData.thumbnail || ""}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                required
                name="description"
                className="block w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Description"
                defaultValue={assignmentData.description || ""}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="datepicker" className="block">
                Due Date:
              </label>
              <DatePicker
                id="datepicker"
                name="dueDate"
                onChange={handleDateChange}
                required
                selected={dueDate}
                className="block p-2 mt-1 border w-[-webkit-fill-available] border-gray-300 rounded lg:w-full"
                placeholderText={` ${dueDate || date}`}
                dateFormat="yyyy/MM/dd"
              />
            </div>
            <div className="flex items-center justify-start col-span-2">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateAssignment;
