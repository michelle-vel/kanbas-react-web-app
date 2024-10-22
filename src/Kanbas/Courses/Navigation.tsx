import { Link, useLocation, useParams } from "react-router-dom";
import { courses } from "../Database";
export default function CoursesNavigation() {
  const { pathname } = useLocation();
  const { cid } = useParams();

  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link to={`/Kanbas/Courses/${cid}/${link}`} key={link}
          className={`list-group-item ${pathname.endsWith(link) ? "active" : "text-danger"} border border-0`}>
          {link}
        </Link>
      ))}

    {/* <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link to="/Kanbas/Courses/1234/Home" id="wd-course-home-link"
        className="list-group-item active border border-0"> Home </Link>
      <Link to="/Kanbas/Courses/1234/Modules" id="wd-course-modules-link"
        className="list-group-item text-danger border border-0"> Modules </Link>
      <Link to="/Kanbas/Courses/1234/Piazza" id="wd-course-piazza-link"
        className="list-group-item text-danger border border-0"> Piazza </Link>
      <Link to="/Kanbas/Courses/1234/Zoom" id="wd-course-zoom-link"
        className="list-group-item text-danger border border-0"> Zoom </Link>
      <Link to="/Kanbas/Courses/1234/Assignments" id="wd-course-quizzes-link"
        className="list-group-item text-danger border border-0"> Assignments </Link>
      <Link to="/Kanbas/Courses/1234/Quizzes" id="wd-course-assignments-link"
        className="list-group-item text-danger border border-0"> Quizzes </Link>
      <Link to="/Kanbas/Courses/1234/People" id="wd-course-people-link"
        className="list-group-item text-danger border border-0" > People </Link> */}
    </div>
);}

