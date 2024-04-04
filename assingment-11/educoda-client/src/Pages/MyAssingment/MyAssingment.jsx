import { useQuery, useQueryClient } from "@tanstack/react-query";
// import axiosInstance from "../../AxiosAPI/axiosInstance";
import useAuthProvider from "../../FireBase/useAuthProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheckCircle,
  faEdit,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import MyAssingmentCard from "./MyAssingmentCard";
import CustomLoading from "../../Components/CustomLoading";
import useAxiosInstance from "../../AxiosAPI/useAxiosInstance";
function MyAssingment() {
  const axiosInstance = useAxiosInstance();

  const queryClient = useQueryClient();
  const { user } = useAuthProvider();
  // console.log(user.email);
  const getData = async () => {
    const myData = await axiosInstance.get(
      // `/api/user/my-submitted-assignments?email=${user.email}`
      `/api/user/my-submitted-assignments?examineeEmail=${user.email}`
    );
    return myData.data;
  };

  const {
    data: myAssignments,
    isLoading,
    error,
    refetch, // Get the refetch function
  } = useQuery({
    queryFn: getData,

    onSuccess: queryClient.invalidateQueries("Submitted-assignments"),
  }); // Corrected the queryKey placement

  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { title, marks, feedback, obtainmarks, thumbnail } = myAssignments;
  // console.log(myAssignments);
  return (
    <div className="">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/L6F5xMt/screen-post-DHG-4kv1-zc-unsplash.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content  pt-[150px]">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold"> Get in Touch with Us</h1>
            <p className="mb-5 font-semibold lg:text-xl">
              Do you have questions, suggestions, or feedback? We'd love to hear
              from you. Our team is here to assist you. Reach out to us anytime,
              and we'll get back to you as soon as possible.
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
            <button className="nav-link active">My Assignments</button>
          </li>
        </ul>
      </div>
      <div>
        <div className="overflow-x-auto bg-gray-300">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-2xl capitalize">
                <th>title & thumbnail</th>
                <th>assignment marks</th>
                <th>assignment status</th>
                <th>My obtain marks</th>
                <th>feedback</th>
              </tr>
            </thead>
            <tbody className="capitalize">
              {/* ro
            
            
            w 1 */}

              {myAssignments.length > 0 ? (
                myAssignments.map((assignment) => (
                  <MyAssingmentCard
                    assignment={assignment}
                    key={assignment._id}
                  />
                ))
              ) : (
                <p>No assignments available.</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyAssingment;
