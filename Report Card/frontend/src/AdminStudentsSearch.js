
import React, { useEffect, useState } from 'react';

const StudentDetails = ({ student }) => {
   


     // Parse the subjects JSON array
  const subjectsArray = (student.subjects);
// Clean up the subjects array
const cleanedSubjects = subjectsArray.map(subject => subject.trim());
const dateStr = student.dob;
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString();

    return (
      <div>
        <h2 style={{"fontFamily":"cursive"}}>Student Details</h2>
        <table className="table table-bordered table-sm table-hover table-striped table-responsive table-secondary  col-sm-12">
          <tbody>

          <tr>
              <td>Student Staus</td>
              <td>{student.studentstatus}</td>
            </tr>

            <tr>
              <td>User ID</td>
              <td>{student.userId}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{student.name}</td>
            </tr>
            <tr>
              <td>Password</td>
              <td>{student.password}</td>
            </tr>
            <tr>
              <td>Enrollment No.</td>
              <td>{student.enrollmentNumber}</td>
            </tr>
            <tr>
              <td>Mobile No.</td>
              <td>{student.mobileNumber}</td>
            </tr>
            <tr>
              <td>Date of Birth</td>
              <td>{formattedDate}</td>
            </tr>
            <tr>
              <td>Parents Mob</td>
              <td>{student.parentsMobile}</td>
            </tr>
            <tr>
              <td>Father's Name</td>
              <td>{student.fatherName}</td>
            </tr>
            <tr>
              <td>Mother's Name</td>
              <td>{student.motherName}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{student.gender}</td>
            </tr>
            <tr>
              <td>Course</td>
              <td>{student.course}</td>
            </tr>
            <tr>
              <td>Branch</td>
              <td>{student.branch}</td>
            </tr>
            <tr>
              <td>Subjects</td>
              <td>{cleanedSubjects.join(", ")}</td>
            </tr>
            <tr>
              <td>Year</td>
              <td>{student.year}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>
                {student.address.city}, {student.address.state}, {student.address.pincode}
              </td>
            </tr>
            <tr>
              <td>Document File Path</td>
              <td>{student.documentFilePath}</td>
            </tr>
            <tr>
              <td>Photo File Path</td>
              <td>{student.photoFilePath}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  
  
  

const AdminStudentsSearch = () => {
  const [students, setStudents] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
 
  // // Fetching data from the database
  const fetchData = async (search) => {
    try {
      const response = await fetch(`http://localhost:5000/student/studentsearch/${search}`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.log('Error fetching student data:', error);
    }
  };
  
  
  
  


  useEffect(() => {
    fetchData(searchValue);
  }, [searchValue]);












  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12">
          <div className="text-center">
            <h1 className="text-black" style={{"fontFamily":"cursive"}}>Search Students</h1>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by User ID"
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="col-sm-12">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover table-responsive">
              <thead>
                <tr>
                  <th scope="col">Student Name</th>
                  <th scope="col">User ID</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} onClick={() => handleStudentClick(student)}>
                    <td>{student.name}</td>
                    <td>{student.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {selectedStudent && <StudentDetails student={selectedStudent} />}
      </div>
    </div>
  );
};

export default AdminStudentsSearch;




