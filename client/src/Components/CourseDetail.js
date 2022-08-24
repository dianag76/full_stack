import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

export default function CourseDetail({context}) {
    let history = useHistory();
    const {authenticateUser} = context; 
    const [course, setCourse] = useState({});
    const [user, setUser] = useState({firstName: '', lastName: ''});
    const { id } = useParams();

//FetchCourse method fetches a single course per id
    useEffect(() => {
        context.data
        .fetchCourse(id)
        .then((res)=>{
            setCourse(res)
            setUser(res.User);
        })
        .catch((err)=>{
            console.log(err);
        });
    }, [context.data, id]);
    
const deleteCourse = async() =>{
    const emailAddress =  authenticateUser.emailAddress;
    const password =  authenticateUser.password;
    await context.data.deleteCourse(id, emailAddress, password);
        history.push('/')
}
//Reminder to edit class->className
const actionButtons = (
  <div className="actions--bar">
    <div className="wrap">
      {authenticateUser && course.userId === authenticateUser.id ? (
        <React.Fragment>
          <Link className="button" to={`/courses/${id}/update`}>
            Update Course
          </Link>
          <button className="button" onClick={deleteCourse}>
            Delete Course
          </button>
          <Link to="/" className="button button-secondary">
            Return to List
          </Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </React.Fragment>
      )}
    </div>
  </div>
);

const courseDetail=(
    <div className="wrap">
      <h2>Course Detail</h2>
      <form>
        <div className="main--flex">
          <div>
            <h3 className="course--detail--title">Course</h3>
            <h4 className="course--name">{course?.title}</h4>
            <p>{`${user.firstName} ${user.lastName}`}</p>
            <ReactMarkdown>
              {`${course.description}`}
            </ReactMarkdown>
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{course.estimatedTime}</p>

            <h3 className="course--detail--title">Materials Needed</h3>
            <ul className="course--detail--title">
              <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
            </ul>
          </div>
        </div>
      </form>
    </div>
);
return (
    <main>
        {actionButtons}
        {courseDetail}
    </main>
);
};
