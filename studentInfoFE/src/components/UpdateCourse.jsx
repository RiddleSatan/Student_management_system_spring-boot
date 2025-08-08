import React, { useRef, useState } from 'react';
import { Edit3, Lock } from 'lucide-react';
import { useMyContext } from '../context/useMyContext';
import useApi from '../../hooks/infoStudent';
import { useNavigate, useParams } from 'react-router';
import { Bounce, toast } from 'react-toastify';

const UpdateCourse = () => {
  const { setEdit, edit } = useMyContext(); // Assuming you'll add these to your context
  const { sendRequest } = useApi();
  const { id } = useParams();
  console.log("Course ID:", id);
  const navigate = useNavigate();
  const initialName=useRef(edit?.name);
  const [editableFields, setEditableFields] = useState({
    name: false
  });

  const handleChange = (e) => {
    setEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleEdit = (fieldName) => {
    setEditableFields({
      ...editableFields,
      [fieldName]: !editableFields[fieldName]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!edit.name?.trim()) {
      toast.error('Course name is required!', {
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
      return;
    }
    
    try {
      console.log("the edited data:",edit)
      const response = await sendRequest({
        url: `updateCourse`, // Adjust URL based on your API
        method: "PUT",
        body: edit
      });
      
      console.log(response);
      toast.success('Course Updated Successfully! 🎉', {
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
      
      console.log('Updated Course:', edit);
      navigate('/courses'); // Navigate back to course management
    } catch (error) {
      console.error("Server Error: ", error);
      toast.error('Failed to update course!', {
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
    }

    // Disable field after update
    setEditableFields({
      name: false
    });
  };

  const handleCancel = () => {
    navigate('/courses');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Update Course</h1>
          <p className="text-gray-400">Modify course information below</p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-300">Course Name</label>
            <div className="flex items-center space-x-3">
            <input
  type="text"
  name="name" // ✅ THIS is the actual key in your state
  placeholder="Enter course name"
  value={edit?.name ?? ''}
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

          <div className="pt-6 space-y-4">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!editableFields.name || !edit?.name?.trim()}
              className="w-full py-4 px-6 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-200 shadow-lg"
            >
              Update Course Information
            </button>
            
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-3 px-6 rounded-lg bg-gray-600 hover:bg-gray-500 text-white font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-700 rounded-lg border border-gray-600">
          <h3 className="font-semibold text-gray-300 mb-2">Current Name:{initialName.current}</h3>
          <div className="text-sm text-gray-400 space-y-1">
            <p><span className="font-medium text-gray-300">Course ID:</span> {edit?.id}</p>
            <p><span className="font-medium text-gray-300">Updated Name:</span> {edit?.name}</p>
            <p className="text-xs text-gray-500 mt-2">
              Click the edit icon to modify the course name
            </p>
          </div>
        </div>

        <div className="mt-6 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
          <div className="flex items-start space-x-2">
            <div className="text-blue-400 mt-0.5">ℹ️</div>
            <div className="text-sm text-blue-300">
              <p className="font-medium">How to edit:</p>
              <p className="text-blue-400">1. Click the edit icon next to the field</p>
              <p className="text-blue-400">2. Make your changes</p>
              <p className="text-blue-400">3. Click "Update Course Information"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;