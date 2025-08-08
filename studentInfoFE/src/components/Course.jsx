import { useState, useEffect } from 'react';
import { useMyContext } from '../context/useMyContext';
import useApi from '../../hooks/infoStudent';
import { useNavigate } from 'react-router';

const CourseManagement = () => {
 const [courseName, setCourseName] = useState('');
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const {course,setCourse}=useMyContext();
 const {sendRequest}=useApi();
 const navigate=useNavigate();
 const {setEdit}=useMyContext();

 
 useEffect(() => {
    console.log(course)
    setCourse(course);
  }, [course,setCourse]);

  useEffect(()=>{
    fetchCourse();
  },[])

  const fetchCourse=async ()=>{
     const data = await sendRequest({ url: "getAllCourse", method: "GET" });
     console.log("these are all the courses:",data);
    if (data) setCourse(data);
  }

  const handleSubmit = async () => {
  if (!courseName.trim()) {
    setError({ name: 'Course name is required' });
    return;
  }

   if (
  course.some(
    c => c.courses && c.courses.toLowerCase() === courseName.toLowerCase()
  )
) {
  setError({ name: 'Course already exists' });
  return;
}


  setLoading(true);
  setError(null);

  try {
    console.log("Course name that is added",courseName);
    const response = await sendRequest({
      url: 'addCourse', 
      method: 'POST',
      body: { name: courseName.trim() },
    });

  
    setCourse(prev => [...prev, response]);
    setCourseName('');
  } catch (err) {
    console.error(err);
    setError({ general: 'Failed to add course' });
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (courseId) => {
    setLoading(true);
    try {
      const response= await sendRequest({
        url:`deleteCourse/${courseId}`,
        method:'POST',
      })
      if(response!=null){
        fetchCourse();
      }
      
      setCourse(prev => prev.filter(course => course.id !== courseId));
    } catch (err) {
      setError({ general: 'Failed to delete course' },err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setEdit(course)
    navigate(`/updateCourse/${course.id}`)
    // You can implement edit functionality here
    console.log('Edit course:', course);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-start p-4 sm:p-8">
      <div className="w-full max-w-6xl bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-10">
       <div className="text-center mb-10">
  <h2 className="text-3xl sm:text-5xl font-bold text-white mb-2">
    Course Management System
  </h2>
  <p className="text-gray-400">Add and manage course information</p>

  {/* ✅ Back to Home Button */}
  <div className="mt-6">
    <button
      onClick={() => navigate('/')}
      className="px-6 py-3 bg-gray-800 text-white font-semibold border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition duration-300 ease-in-out cursor-pointer"
    >
      🏠 Back to Home
    </button>
  </div>
</div>


        {/* Add Course Form */}
        <div className="mb-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter course name"
              className="w-full p-4 rounded-lg bg-black border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 px-6 rounded-md bg-black text-white font-semibold border border-white hover:bg-white hover:text-black transition duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding Course..." : "Add Course"}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-800/10 border border-red-700 rounded-xl">
            {Object.entries(error).map(([field, message]) => (
              <p key={field} className="text-red-400">
                {field.charAt(0).toUpperCase() + field.slice(1)}: {message}
              </p>
            ))}
          </div>
        )}

        {/* Course Table */}
        <div className="bg-black border border-gray-700 rounded-xl p-6 overflow-x-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
            <h3 className="text-xl sm:text-2xl font-semibold text-white">
              Course Directory
            </h3>
            <div className="text-sm text-gray-400">Total Course: {course.length}</div>
          </div>

          <table className="w-full text-left border border-gray-700 rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Course Name</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {course.map((course, index) => (
                <tr
                  key={course.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  } border-b border-gray-700`}
                >
                  <td className="p-3 text-gray-300">{course.id}</td>
                  <td className="p-3 text-white font-medium">{course.name}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="px-4 py-1 bg-white text-black rounded hover:bg-gray-300 transition cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      disabled={loading}
                      className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition cursor-pointer disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {course?.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-6 text-center text-gray-400">
                    <div className="text-3xl mb-2">📚</div>
                    <p className="text-lg">No course available yet</p>
                    <p className="text-sm">Add your first course using the form above</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;