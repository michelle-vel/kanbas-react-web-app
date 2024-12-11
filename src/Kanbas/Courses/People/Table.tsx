import { FaUserCircle } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import PeopleDetails from "./Details";
import { Link, useParams } from "react-router-dom";
import { findUsersForCourse } from "../client";

// import { useParams } from "react-router-dom";
// import * as db from "../../Database";

export default function PeopleTable({ users = [] }: { users?: any[] }) {
  const { cid } = useParams<{ cid: string | undefined }>(); // Get the course ID from the route
  const [fetchedUsers, setFetchedUsers] = useState<any[]>(users); // State to store users fetched based on course

  useEffect(() => {
    const fetchUsers = async () => {
      if (cid) {
        try {
          const enrolledUsers = await findUsersForCourse(cid); // Fetch users for the specific course
          setFetchedUsers(enrolledUsers); // Set the fetched users to state
        } catch (error) {
          console.error("Failed to fetch users:", error); // Handle any errors
        }
      }
    };

    if (!users.length && cid) {
      fetchUsers(); // Fetch users only if not already passed as props
    }
  }, [cid, users]); // Fetch users when cid changes

  return (
    <div id="wd-people-table">
      <PeopleDetails />
      <table className="table table-striped">
        <thead>
          <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
        </thead>
        <tbody>
  {fetchedUsers
    .map((user: any) => (
      <tr key={user._id}>
        <td className="wd-full-name text-nowrap">
        <Link to={`/Kanbas/Account/Users/${user._id}`} className="text-decoration-none">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">{user.firstName}</span>
          <span className="wd-last-name">{user.lastName}</span>
          </Link>
        </td>
        <td className="wd-login-id">{user.loginId}</td>
        <td className="wd-section">{user.section}</td>
        <td className="wd-role">{user.role}</td>
        <td className="wd-last-activity">{user.lastActivity}</td>
        <td className="wd-total-activity">{user.totalActivity}</td>
      </tr>
    ))}
</tbody>

      </table>
    </div> );}

