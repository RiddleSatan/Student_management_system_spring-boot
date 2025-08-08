import  { useEffect, useState } from "react";
import useApi from "../../hooks/infoStudent.js"; // adjust path if needed
import { useMyContext } from "../context/useMyContext.js";
import { useNavigate } from "react-router";
import StatusPage from "./StatusPage.jsx";

const Home = () => {
  // const [students, setStudents] = useState([]);
  const {setValue,value,setEdit}=useMyContext()
  const [student, setStudent] = useState({
    name: "",
    age: "",
    email: "",
    course: "",
    accountNo:""
  });
  const navigate = useNavigate();

  const { sendRequest, loading, error } = useApi();

  const {course}=useMyContext();
  useEffect(() => {
    fetchValue();
  }, []);

  const fetchValue = async () => {
    const data = await sendRequest({ url: "getAll", method: "GET" });
    if (data) setValue(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]:value });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
        console.log("this is student:",student)
    if (!student.name || !student.email || !student.age || !student.course) {
      return;
    }

    const studentData={
      ...student,
      age:Number(student.age),
      accountNo:Number(student.accountNo)
    }
    
    const created = await sendRequest({
      url: "add",
      method: "POST",
      body: studentData,  
    });
    console.log("This is the error :",error);
    if (created) {
      setValue((prev) => [...prev, created]);
      setStudent({ name: "", age: "", email: "", course: "",accountNo:""});
    }
  };

  const handleDelete = async (id) => {
    const deleted = await sendRequest({
      url: `delete/${id}`,
      method: "DELETE",
    });
    if (deleted !== null) {
      setValue((prev) => prev.filter((s) => s.id !== Number(id)));
    }
  };

  const handleEdit=(s)=>{
      setEdit(s);
      navigate(`/update/:${s.id}`)
  }

  const handleManageCourses = () => {
    navigate('/courses'); // Navigate to course management page
  }
    

  return (


<div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-start p-4 sm:p-8">
  <div className="w-full max-w-7xl bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-10">
    <div className="text-center mb-10">
      <h2 className="text-3xl sm:text-5xl font-bold text-white mb-2">
        Student Management System
      </h2>
      <p className="text-gray-400">Add and manage student information</p>
      <StatusPage/>
      {/* Course Management Button */}
      <div className="mt-6">
        <button
          onClick={handleManageCourses}
          className="px-6 py-3 bg-gray-800 text-white font-semibold border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition duration-300 ease-in-out cursor-pointer"
        >
          📚 Manage Courses
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
      {/* Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Full Name</label>
        <input
          name="name"
          value={student.name}
          onChange={handleChange}
          placeholder="Enter student name"
          required
          className="w-full p-4 rounded-lg bg-black border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-white"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Email Address</label>
        <input
          name="email"
          type="email"
          value={student.email}
          onChange={handleChange}
          placeholder="Enter email address"
          required
          className="w-full p-4 rounded-lg bg-black border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-white"
        />
      </div>

      {/* Age */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Age</label>
        <input
          name="age"
          type="number"
          min="1"
          max="100"
          value={student.age}
          onChange={handleChange}
          placeholder="Enter age"
          required
          className="w-full p-4 rounded-lg bg-black border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-white"
        />
      </div>

       {/* AccountNo. */}   
       <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">AccountNo.</label>
        <input
          name="accountNo"
          type="number"
          min="1"
          max="100"
          value={student.accountNo}
          onChange={handleChange}
          placeholder="Enter Your Account No."
          required
          className="w-full p-4 rounded-lg bg-black border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-white"
        />
      </div>

      {/* Course */}
     <div className="space-y-2">
  <label className="text-sm font-medium text-gray-300">Course</label>
  <select
    name="course"
    value={student.course}
    onChange={handleChange}
    required
    className="w-full p-4 rounded-lg bg-black border border-gray-600 text-white focus:ring-2 focus:ring-white"
  >
    <option value="" disabled hidden>
      Select a course
    </option>
    {course?.map((option) => (
      <option 
        key={option.id} 
        value={option.name}
        className="bg-black text-white"
      >
        {option.name}
      </option>
    ))}
  </select>
</div>


      {/* Submit Button */}
      <div className="sm:col-span-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
         className="w-full py-3 px-6 rounded-md bg-black text-white font-semibold border border-white hover:bg-white hover:text-black transition duration-300 ease-in-out cursor-pointer"


        >
          {loading ? "Adding Student..." : "Add Student"}
        </button>
      </div>
    </div>

    {/* Error */}
  {error && (
  <div className="mb-6 p-4 bg-red-800/10 border border-red-700 rounded-xl">
    {Object.entries(error).map(([field, message]) => (
      <p key={field} className="text-red-400">
        {field.charAt(0).toUpperCase() + field.slice(1)}: {message}
      </p>
    ))}
  </div>
)}


    {/* Table */}
    <div className="bg-black border border-gray-700 rounded-xl p-6 overflow-x-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
        <h3 className="text-xl sm:text-2xl font-semibold text-white">
          Student Directory
        </h3>
        <div className="text-sm text-gray-400">Total Students: {value.length}</div>
      </div>

      <table className="w-full text-left border border-gray-700 rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Age</th>
            <th className="p-3">Course_ID</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {value.map((s, index) => (
            <tr
              key={s.id}
              className={`${
                index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
              } border-b border-gray-700`}
            >
              <td className="p-3 text-gray-300">{s.id}</td>
              <td className="p-3 text-white">{s.name}</td>
              <td className="p-3 text-gray-300">{s.email}</td>
              <td className="p-3 text-gray-300">{s.age}</td>
              <td className="p-3">
                <span className="px-2 py-1 bg-gray-700 text-white rounded">
                  {s.id}
                </span>
              </td>
              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => handleEdit(s)}
                  className="px-4 py-1 bg-white text-black rounded hover:bg-gray-300 transition cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {value?.length === 0 && (
            <tr>
              <td colSpan="6" className="p-6 text-center text-gray-400">
                <div className="text-3xl mb-2">📚</div>
                <p className="text-lg">No Student registered yet</p>
                <p className="text-sm">Add your first student using the form above</p>
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

export default Home;