import React, { useState, useEffect, useContext } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import Context from '../Context'
import ReactMarkdown from 'react-markdown';

export default function CourseDetail() {
    let history = useHistory();
    const context= useContext(Context);
    const {authenticateUser} = context;
    const [course, setCourse] = useState({});
    const [user, setUser] = useState({firstName: '', lastName: ''});
    const { id } = useParams();
    //is error variable needed here?

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
    
const deleteCourse = (props) =>{
    const emailAddress = authenticateUser.emailAddress;
    const password = authenticateUser.clientPassword;
    context.data.deleteCourse(id, emailAddress, password)
    .then (
        console.log('Course has been deleted.'),
        history.push('')
    )
}
//Reminder to edit class->className
const actionButtons = (
    <div className="actions--bar">
      <div className="wrap">
        {authenticateUser && course.userId === authenticateUser.id ? (
          <React.Fragment>
            <NavLink to={`/courses/${id}/update`} className="button">
              Update Course
            </NavLink>
            <NavLink
              to={`/courses/${course.course.id}/delete`}
              className="button"
              onClick={deleteCourse}
            >
              Delete Course
            </NavLink>
            <NavLink to="/" className="button button-secondary">
              Return to List
            </NavLink>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavLink className="button button-secondary" to="/">
              Return to List
            </NavLink>
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
            <h4 className="course--name">{course.title}</h4>
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


// authenticateUser or authenticatedUser?