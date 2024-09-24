import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/class1.png" width={200} />
            <div>
              <h5>
                 CS1234 React JS
              </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/2345/Home">
            <img src="/images/class2.png" width={200} />
            <div>
              <h5>CS2345 Node.js</h5>
              <p className="wd-dashboard-course-title">Backend Development</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/3456/Home">
            <img src="/images/class3.png" width={200} />
            <div>
              <h5>CS3456 Python</h5>
              <p className="wd-dashboard-course-title">Data Science with Python</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/4567/Home">
            <img src="/images/class4.png" width={200} />
            <div>
              <h5>CS4567 AWS Cloud</h5>
              <p className="wd-dashboard-course-title">Cloud Architecture</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/5678/Home">
            <img src="/images/class5.png" width={200} />
            <div>
              <h5>CS5678 Java</h5>
              <p className="wd-dashboard-course-title">Enterprise Software Development</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/6789/Home">
            <img src="/images/class6.png" width={200} />
            <div>
              <h5>CS6789 Machine Learning</h5>
              <p className="wd-dashboard-course-title">AI and ML with TensorFlow</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/7890/Home">
            <img src="/images/class7.png" width={200} />
            <div>
              <h5>CS7890 DevOps</h5>
              <p className="wd-dashboard-course-title">Continuous Integration & Delivery</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/8900/Home">
            <img src="/images/class8.png" width={200} />
            <div>
              <h5>CS8900 Chemistry</h5>
              <p className="wd-dashboard-course-title">Chemistry</p>
              <button>Go</button>
            </div>
          </Link>
        </div>




      </div>
    </div>
  );
}

