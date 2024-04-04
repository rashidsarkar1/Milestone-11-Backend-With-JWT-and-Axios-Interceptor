import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import CustomLoading from "../../Components/CustomLoading";
import AssignmentCard from "./AssignmentCard";
import Pagination from "./Pagination/Pagination";
import { id } from "date-fns/locale";
import axiosInstance from "../../AxiosAPI/axiosInstance";
import useAxiosInstance from "../../AxiosAPI/useAxiosInstance";
// import useAxiosInstance from "../../AxiosAPI/axiosInstance";

function AllAssignments() {
  const axiosInstance = useAxiosInstance();
  const [selectedDifficulty, setSelectedDifficulty] = useState("All"); // Initialize with "all"
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  // const limit = 5;
  // console.log(page);

  const difficultyOptions = ["All", "Easy", "Medium", "Hard"];
  // http://localhost:5000/api/all-assignments?limit=3&page=2

  const getData = async () => {
    if (selectedDifficulty === "All") {
      const myData = await axiosInstance.get(
        `/api/all-assignments?limit=${limit}&page=${page}`
      );

      return myData.data;
    } else {
      const myData = await axiosInstance.get(
        `/api/all-assignments?difficulty=${selectedDifficulty}&limit=${limit}&page=${page}`
      );
      return myData.data;
    }
  };

  const {
    data: allAssignments,
    isLoading,
    error,
    refetch, // Get the refetch function
  } = useQuery({
    queryFn: getData, // Call the function
    queryKey: ["all-assignments", selectedDifficulty, limit, page], // Include selectedDifficulty in the query key
  });
  // console.log(allAssignments);
  const handleDifficultyChange = (newDifficulty) => {
    setSelectedDifficulty(newDifficulty);
    // Call the refetch function to fetch data with the new difficulty
    setPage(1);
    refetch();
  };
  let totalPage = Math.ceil(allAssignments?.count / limit);
  // console.log(totalPage);
  // http://localhost:5000/api/all-assignments?limit=3&page=2

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
  const valueOnChange = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };
  if (error) {
    return error.message;
  }
  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }
  // console.log(allAssignments);

  return (
    <div className="min-h-screen ">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/L9vvV73/iewek-gnos-hh-Ux08-Pu-Ypc-unsplash.jpg)",
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
        <ul
          className="flex justify-between nav nav-pills"
          id="pills-tab-1"
          role="tablist"
        >
          <li className="nav-item">
            <button className="text-left nav-link active">
              ALL Assignments
            </button>
          </li>
          <li className="flex items-center justify-between">
            <p className="nav-link active">Filter by Difficulty:</p>
            <select
              id="difficultyFilter"
              className="py-1 border rounded-md lg:px-2  lg:w-auto w-[50px]"
              value={selectedDifficulty}
              onChange={(e) => handleDifficultyChange(e.target.value)}
            >
              {difficultyOptions.map((option) => (
                <option className="" key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
        {allAssignments.result.length > 0 ? (
          allAssignments.result.map((assignment) => (
            <AssignmentCard assignment={assignment} key={assignment._id} />
          ))
        ) : (
          <p>No assignments available.</p>
        )}
      </div>
      {totalPage > 0 && (
        <div className="justify-center flex   ">
          <div className="join join-vertical lg:join-horizontal">
            <div className="border-2  rounded-none lg:border-r-0  lg:rounded-tr-[0] lg:rounded-br-[0] join border-primary">
              <button
                onClick={handlePrevious}
                className="btn join-item btn-ghost"
              >
                {"<<"}
              </button>
              {Array(totalPage)
                .fill(0)
                .map((item, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={idx + 1}
                      onClick={() => setPage(pageNum)}
                      className={`${
                        pageNum === page
                          ? "btn join-item btn-primary"
                          : "btn join-item btn-ghost"
                      } `}
                    >
                      {` ${pageNum} `}
                    </button>
                  );
                })}

              <button onClick={handleNext} className="btn join-item btn-ghost">
                {">>"}
              </button>
            </div>
            <div className="border-2 rounded-none rounded-tl-none rounded-bl-none lg:rounded-tl-[0] lg:rounded-bl-[0] join border-primary px-3">
              <li className="flex items-center justify-between">
                <p className="nav-link active">Items per Page:</p>
                <select
                  id="itemsPerPage"
                  className="py-1 border rounded-md lg:px-2 lg:w-auto w-[50px]"
                  onChange={(event) => valueOnChange(event)}
                  value={limit}
                >
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                  {/* Add more options as needed */}
                </select>
              </li>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllAssignments;
