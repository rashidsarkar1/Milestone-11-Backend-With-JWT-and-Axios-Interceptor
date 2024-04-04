import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";

import Login from "../Pages/Account/Login";
import SignUp from "../Pages/Account/SignUp";

import NotFound from "../Pages/NotFound ";
import Home from "../Pages/Home/Home";
import AssignmentCreate from "../Pages/AssignmentCreate/AssignmentCreate";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AllAssignements from "../Pages/AllAssignements/AllAssignements";
import UpdateAssignment from "../Pages/UpdateAssignment/UpdateAssignment";
import ViewAssignment from "../Pages/ViewAssignment/ViewAssignment";
import SubmittedAssignments from "../Pages/SubmittedAssignments/SubmittedAssignments";
import MyAssingment from "../Pages/MyAssingment/MyAssingment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/assignments",
        element: <AllAssignements></AllAssignements>,
      },
      {
        path: "/assignments",
        element: <AllAssignements></AllAssignements>,
      },
      {
        path: "/assignmentCreate",
        element: (
          <PrivateRoute>
            <AssignmentCreate></AssignmentCreate>,
          </PrivateRoute>
        ),
      },
      {
        path: "/updateassignment/:idx",
        element: (
          <PrivateRoute>
            <UpdateAssignment></UpdateAssignment>
          </PrivateRoute>
        ),
      },

      {
        path: "/assignmentDetails/:idx",
        element: (
          <PrivateRoute>
            <ViewAssignment></ViewAssignment>,
          </PrivateRoute>
        ),
      },
      {
        path: "submittedAssignments",
        element: (
          <PrivateRoute>
            <SubmittedAssignments></SubmittedAssignments>
          </PrivateRoute>
        ),
      },
      {
        path: "myAssignments",
        element: (
          <PrivateRoute>
            <MyAssingment></MyAssingment>
          </PrivateRoute>
        ),
      },

      {
        path: "/Login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);
export default router;
