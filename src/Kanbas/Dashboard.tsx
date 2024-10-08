import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/class1.png" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1234 React JS{" "}
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Full Stack Software Developer{" "} <br />
                    Section 1 Fall 2024 Semester Full Term{" "}
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>


          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                to="/Kanbas/Courses/2345/Home"
              >
                <img src="/images/class2.png" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                  CS2345 Node.js{" "}
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                  Backend Development{" "} <br />
                  Section 1 Fall 2024 Semester Full Term{" "}
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>


          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                to="/Kanbas/Courses/3456/Home"
              >
                <img src="/images/class3.png" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                  CS3456 Python{" "}
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                  Data Science with Python{" "} <br />
                  Section 1 Fall 2024 Semester Full Term{" "}
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>


          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                to="/Kanbas/Courses/4567/Home"
              >
                <img src="/images/class4.png" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                  CS4567 AWS Cloud{" "}
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                  Cloud Architecture{" "} <br />
                  Section 1 Fall 2024 Semester Full Term{" "}
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>


          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                to="/Kanbas/Courses/5678/Home"
              >
                <img src="/images/class5.png" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                  CS5678 Java{" "}
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                  Enterprise Software Development{" "} <br />
                  Section 1 Fall 2024 Semester Full Term{" "}
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>


          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                to="/Kanbas/Courses/6789/Home"
              >
                <img src="/images/class6.png" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                  CS6789 Machine Learning{" "}
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                  AI and ML with TensorFlow{" "} <br />
                  Section 1 Fall 2024 Semester Full Term{" "}
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>


          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                to="/Kanbas/Courses/7890/Home"
              >
                <img src="/images/class7.png" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                  CS7890 DevOps{" "}
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                  Continuous Integration & Delivery{" "} <br />
                  Section 1 Fall 2024 Semester Full Term{" "}
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>


          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                to="/Kanbas/Courses/8900/Home"
              >
                <img src="/images/class8.png" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                  CS8900 Chemistry{" "}
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                  Chemistry{" "} <br />
                  Section 1 Fall 2024 Semester Full Term{" "}
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}


