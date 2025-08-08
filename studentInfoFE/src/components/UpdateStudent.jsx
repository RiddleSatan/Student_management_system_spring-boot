import React, { useState } from 'react';
import {  Edit3, Lock } from 'lucide-react';
import { useMyContext } from '../context/useMyContext';
import useApi from '../../hooks/infoStudent';
import { useNavigate, useParams } from 'react-router';
import { Bounce, toast } from 'react-toastify';

const UpdateStudent = () => {
  const {setEdit,edit}=useMyContext();
  const {sendRequest}=useApi();
 const {id}= useParams();
 console.log("this is id",id)
 const navigate=useNavigate()   

  const [editableFields, setEditableFields] = useState({
    name: false,
    age: false,
    email: false,
    course: false
  });

  const { course } = useMyContext();


  const handleChange = (e) => {
    setEdit((prev)=>({...prev ,[e.target.name]: e.target.value }));
  };

  const toggleEdit = (fieldName) => {
    setEditableFields({
      ...editableFields,
      [fieldName]: !editableFields[fieldName]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
     const response=await sendRequest({
        url:`update/${edit.id}`,
        method:"PUT",
        body:edit});
     console.log(response); 
     toast.success('Update Successful!🥂', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
transition: Bounce,
});
     navigate('/');
   } catch (error) {
    console.error("Server Error: ",error)
   }
    
    console.log('Updated Student:', edit);
    // Disable all fields after update
    setEditableFields({
      name: false,
      age: false,
      email: false,
      course: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Update Student</h1>
          <p className="text-gray-400">Modify student information below</p>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">Full Name</label>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={edit?.name??''}
                  onChange={handleChange}
                  disabled={!editableFields.name}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 text-white bg-gray-700 transition-all duration-200 ${
                    editableFields.name 
                      ? 'border-blue-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200' 
                      : 'border-gray-600 cursor-not-allowed opacity-75'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleEdit('name')}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    editableFields.name 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                  }`}
                >
                  {editableFields.name ? <Lock size={18} /> : <Edit3 size={18} />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">Age</label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  value={edit?.age??""}
                  onChange={handleChange}
                  disabled={!editableFields.age}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 text-white bg-gray-700 transition-all duration-200 ${
                    editableFields.age 
                      ? 'border-blue-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200' 
                      : 'border-gray-600 cursor-not-allowed opacity-75'
                  }`}
                  required
                  min="1"
                  max="120"
                />
                <button
                  type="button"
                  onClick={() => toggleEdit('age')}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    editableFields.age 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                  }`}
                >
                  {editableFields.age ? <Lock size={18} /> : <Edit3 size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300">Email Address</label>
            <div className="flex items-center space-x-3">
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={edit?.email??''}
                onChange={handleChange}
                disabled={!editableFields.email}
                className={`flex-1 px-4 py-3 rounded-lg border-2 text-white bg-gray-700 transition-all duration-200 ${
                  editableFields.email 
                    ? 'border-blue-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-600 cursor-not-allowed opacity-75'
                }`}
                required
              />
              <button
                type="button"
                onClick={() => toggleEdit('email')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  editableFields.email 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                }`}
              >
                {editableFields.email ? <Lock size={18} /> : <Edit3 size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300">Course</label>
            <div className="flex items-center space-x-3">
             <select
  name="course"
  value={edit?.course ?? ''}
  onChange={handleChange}
  disabled={!editableFields.course}
  className={`flex-1 px-4 py-3 rounded-lg border-2 text-white bg-gray-700 transition-all duration-200 ${
    editableFields.course 
      ? 'border-blue-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200' 
      : 'border-gray-600 cursor-not-allowed opacity-75'
  }`}
  required
>
  <option value="" className="bg-gray-700 text-white">Select a course</option>
  {course?.map((option) => (
    <option 
      key={option.id} 
      value={option.courses}
      className="bg-gray-700 text-white"
    >
      {option.courses}
    </option>
  ))}
</select>

              <button
                type="button"
                onClick={() => toggleEdit('course')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  editableFields.course 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                }`}
              >
                {editableFields.course ? <Lock size={18} /> : <Edit3 size={18} />}
              </button>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-4 px-6 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-200 shadow-lg"
            >
              Update Student Information
            </button>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-700 rounded-lg border border-gray-600">
          <h3 className="font-semibold text-gray-300 mb-2">Current Values:</h3>
          <div className="text-sm text-gray-400 space-y-1">
            <p><span className="font-medium text-gray-300">Name:</span> {edit.name}</p>
            <p><span className="font-medium text-gray-300">Age:</span> {edit.age}</p>
            <p><span className="font-medium text-gray-300">Email:</span> {edit.email}</p>
            <p><span className="font-medium text-gray-300">Course:</span> {edit.course}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudent;