import { AiOutlineFileText, AiOutlinePlus } from "react-icons/ai";
import { BsGripVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import "./styles.css"

export default function Assignments() {
  return (
    <div id="wd-assignments">
      {/* Search and Action Buttons */}
      <div className="d-flex justify-content-between mb-3">
        <div className="input-group w-50">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="wd-search-assignment form-control"
            placeholder="Search..."
          />
        </div>
        <div>
          <button className="wd-add-assignment-group btn btn-outline-secondary me-2">
            <AiOutlinePlus /> Group
          </button>
          <button className="wd-add-assignment btn btn-danger">
            <AiOutlinePlus /> Assignment
          </button>
        </div>
      </div>

      {/* Assignments List */}
      <ul className="wd-assignment-list list-group rounded-0">
        <li className="list-group-item p-3 mb-5 border-gray">
          <div className="d-flex justify-content-between align-items-center bg-secondary p-3">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <span className="fw-bold">ASSIGNMENTS</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge bg-light text-dark rounded-pill mx-2 px-3">
                40% of Total
              </span>
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          {/* Assignment Entry */}
          <ul className="list-group mt-3 rounded-0">
            <li className="wd-assignment-list-item list-group-item p-3 d-flex justify-content-between align-items-center">
              {/* Left Side: Icons, Title, and Details */}
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <AiOutlineFileText className="me-2 text-success fs-3" />
                <div>
                  
                <h5>
                <a href="#/Kanbas/Courses/1234/Assignments/123" className="wd-assignment-link text-decoration-none text-dark">
                  A1
                </a>
                </h5>

                  <div className="text-muted">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-1">|</span>
                    <span className="fw-bold">Not available until</span>
                    <span className="ms-1">May 6 at 12:00am</span>
                    <span className="mx-1">|</span>
                    <br/>
                    <span className="fw-bold">Due</span>
                    <span className="ms-1">May 13 at 11:59pm</span>
                    <span className="mx-1">|</span>
                    <span>100 pts</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Checkmark and Ellipsis */}
              <div className="d-flex align-items-center">
                <FaCheckCircle className="text-success fs-4 me-3" />
                <IoEllipsisVertical className="text-muted fs-4" />
              </div>
            </li>
          </ul>

          {/* Assignment Entry */}
          <ul className="list-group mt-3 rounded-0">
            <li className="wd-assignment-list-item list-group-item p-3 d-flex justify-content-between align-items-center">
              {/* Left Side: Icons, Title, and Details */}
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <AiOutlineFileText className="me-2 text-success fs-3" />
                <div>
                <h5>
                <a href="#/Kanbas/Courses/1234/Assignments/123" className="wd-assignment-link text-decoration-none text-dark">
                  A2
                </a>
                </h5>
                  <div className="text-muted">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-1">|</span>
                    <span className="fw-bold">Not available until</span>
                    <span className="ms-1">May 13 at 12:00am</span>
                    <span className="mx-1">|</span>
                    <br/>
                    <span className="fw-bold">Due</span>
                    <span className="ms-1">May 20 at 11:59pm</span>
                    <span className="mx-1">|</span>
                    <span>100 pts</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Checkmark and Ellipsis */}
              <div className="d-flex align-items-center">
                <FaCheckCircle className="text-success fs-4 me-3" />
                <IoEllipsisVertical className="text-muted fs-4" />
              </div>
            </li>
          </ul>


                    {/* Assignment Entry */}
                    <ul className="list-group mt-3 rounded-0">
            <li className="list-group-item p-3 d-flex justify-content-between align-items-center">
              {/* Left Side: Icons, Title, and Details */}
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <AiOutlineFileText className="me-2 text-success fs-3" />
                <div>
                <h5>
                <a href="#/Kanbas/Courses/1234/Assignments/123" className="wd-assignment-link text-decoration-none text-dark">
                  A3
                </a>
                </h5>
                  <div className="text-muted">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-1">|</span>
                    <span className="fw-bold">Not available until</span>
                    <span className="ms-1">May 20 at 12:00am</span>
                    <span className="mx-1">|</span>
                    <br/>
                    <span className="fw-bold">Due</span>
                    <span className="ms-1">May 27 at 11:59pm</span>
                    <span className="mx-1">|</span>
                    <span>100 pts</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Checkmark and Ellipsis */}
              <div className="d-flex align-items-center">
                <FaCheckCircle className="text-success fs-4 me-3" />
                <IoEllipsisVertical className="text-muted fs-4" />
              </div>
            </li>
          </ul>




        </li>
      </ul>
    </div>
  );
}


      // <div id="wd-assignments">
      //   <input id="wd-search-assignment"
      //          placeholder="Search for Assignments" />
      //   <button id="wd-add-assignment-group">+ Group</button>
      //   <button id="wd-add-assignment">+ Assignment</button>
      //   <h3 id="wd-assignments-title">
      //     ASSIGNMENTS 40% of Total <button>+</button>
      //   </h3>
      //   <ul id="wd-assignment-list">
      //     <li className="wd-assignment-list-item">
      //       <a className="wd-assignment-link"
      //         href="#/Kanbas/Courses/1234/Assignments/123">
      //         A1 - ENV + HTML
      //       </a>
      //       <div>
      //       Multiple Modules | <strong>Not available until </strong> May 6 at 12:00am | 
      //       <strong> Due </strong> May 13 at 11:59pm | 100 pts
      //       </div>
      //     </li>
          
      //     <li className="wd-assignment-list-item">
      //     <a className="wd-assignment-link"
      //         href="#/Kanbas/Courses/1234/Assignments/123">
      //         A2 - CSS + BOOTSTRAP
      //       </a>
      //       <div>
      //       Multiple Modules | <strong>Not available until </strong> May 13 at 12:00am | 
      //       <strong> Due </strong> May 20 at 11:59pm | 100 pts
      //       </div>
      //     </li>

      //     <li className="wd-assignment-list-item">
      //     <a className="wd-assignment-link"
      //         href="#/Kanbas/Courses/1234/Assignments/123">
      //         A3 - JAVASCRIPT + REACT
      //       </a>
      //       <div>
      //       Multiple Modules | <strong>Not available until </strong> May 20 at 12:00am | 
      //       <strong> Due </strong> May 27 at 11:59pm | 100 pts
      //       </div>
      //     </li>

      //   </ul>
      // </div>
  
  