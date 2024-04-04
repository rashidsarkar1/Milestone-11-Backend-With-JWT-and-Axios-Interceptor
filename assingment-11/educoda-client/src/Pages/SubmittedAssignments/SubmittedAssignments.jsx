import { useQuery } from "@tanstack/react-query";

import SubmittedAssignmentsCard from "./SubmittedAssignmentsCard";
import useAuthProvider from "../../FireBase/useAuthProvider";
import CustomLoading from "../../Components/CustomLoading";
import useAxiosInstance from "../../AxiosAPI/useAxiosInstance";
// import axiosInstance from "../../AxiosAPI/axiosInstance";

function SubmittedAssignments() {
  const axiosInstance = useAxiosInstance();

  // const axiosInstance = useAxiosInstance();
  const { user } = useAuthProvider();
  // console.log(user.email);
  const getData = async () => {
    const myData = await axiosInstance.get(
      `/api/user/all-submitted-assignments`
    );
    return myData.data;
  };

  const {
    data: submittedAssignments,
    isLoading,
    error,
    refetch, // Get the refetch function
  } = useQuery({
    queryFn: getData,
    queryKey: ["Submitted-assignments"],
  }); // Corrected the queryKey placement

  if (isLoading) {
    return <CustomLoading></CustomLoading>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="min-h-screen ">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/thmYcnf/anete-lusina-zws-Hjak-E-i-I-unsplash.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content  pt-[150px]">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">
              Assignment Variety Awaits
            </h1>
            <p className="mb-5 font-semibold lg:text-xl">
              Find interesting and challenging assignments that will expand your
              knowledge and skills. Discover opportunities for growth and
              learning. Get started on your educational journey today.
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
            <button className="nav-link active">Submitted Assignments</button>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {submittedAssignments.map((item) => (
          <SubmittedAssignmentsCard
            submittedAssignments={item}
            key={item._id}
          ></SubmittedAssignmentsCard>
        ))}
      </div>
    </div>
  );
}

export default SubmittedAssignments;
