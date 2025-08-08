# Student Management System

A modern React-based web application for managing student records with full CRUD (Create, Read, Update, Delete) functionality. Built with React 18, React Router, and Axios for API communication.

## 🚀 Features

- **Add Students**: Create new student records with name, age, email, and course selection
- **View Students**: Display all students in a responsive table format
- **Update Students**: Edit existing student information with field-level editing controls
- **Delete Students**: Remove student records with confirmation
- **Course Management**: Predefined course options covering various tech and business fields
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Real-time Updates**: Immediate UI updates after CRUD operations
- **Toast Notifications**: Success/error feedback using React Toastify
- **Loading States**: Visual feedback during API operations

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: React Toastify
- **Backend**: Node.js/Express (assumed based on API endpoints)

## 📁 Project Structure

```
src/
├── components/
│   ├── Home.jsx              # Main dashboard with student list and add form
│   └── UpdateStudent.jsx     # Student edit page with field-level controls
├── context/
│   ├── Context.jsx           # Context provider setup
│   └── useMyContext.js       # Context hook
├── hooks/
│   └── infoStudent.js        # Custom API hook
├── App.jsx                   # Main app component with routing
├── main.jsx                  # App entry point
└── index.css                 # Global styles
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install required packages**
   ```bash
   npm install react react-dom react-router-dom axios lucide-react react-toastify
   npm install -D tailwindcss
   ```

4. **Configure environment**
   - Ensure your backend server is running on `http://localhost:8080`
   - Update `BASE_URL` in `hooks/infoStudent.js` if needed

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 📋 API Endpoints

The application expects the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students/getAll` | Fetch all students |
| POST | `/students/add` | Create a new student |
| PUT | `/students/update/:id` | Update student by ID |
| DELETE | `/students/delete/:id` | Delete student by ID |

### Expected Data Format

**Student Object:**
```json
{
  "id": 1,
  "name": "John Doe",
  "age": 22,
  "email": "john.doe@example.com",
  "course": "Computer Science"
}
```

## 🎯 Component Documentation

### Home Component
- **Purpose**: Main dashboard displaying student list and add form
- **Features**:
  - Student registration form with validation
  - Responsive data table
  - Delete functionality with immediate UI updates
  - Navigation to edit page
  - Loading states and error handling

### UpdateStudent Component
- **Purpose**: Edit existing student information
- **Features**:
  - Field-level editing controls (lock/unlock individual fields)
  - Real-time preview of current values
  - Form validation
  - Success notifications
  - Navigation back to home after update

### Context API
- **MyContext**: Global state management
- **State Variables**:
  - `value`: Array of all students
  - `edit`: Current student being edited
- **Actions**:
  - `setValue`: Update students list
  - `setEdit`: Set student for editing

### Custom Hook (useApi)
- **Purpose**: Handle all API communications
- **Returns**:
  - `data`: Response data
  - `loading`: Loading state
  - `error`: Error messages
  - `sendRequest`: Function to make API calls

## 🎨 Available Courses

The system supports the following course options:
- Computer Science
- Software Engineering
- Data Science
- Information Technology
- Cybersecurity
- Web Development
- Mobile App Development
- Artificial Intelligence
- Machine Learning
- Database Administration
- Network Administration
- Digital Marketing
- Graphic Design
- UI/UX Design
- Business Administration
- Project Management
- Other

## 🎨 UI/UX Features

- **Dark Theme**: Modern dark color scheme
- **Responsive Grid**: Adapts to different screen sizes
- **Interactive Elements**: Hover effects and transitions
- **Visual Feedback**: Loading spinners and success messages
- **Form Validation**: Required field validation
- **Empty State**: Friendly message when no students exist
- **Field Controls**: Lock/unlock editing for individual fields

## 🔄 State Management Flow

1. **Initial Load**: Fetch all students on app startup
2. **Add Student**: Form submission → API call → Update local state
3. **Edit Student**: Select student → Navigate to edit page → Update specific fields
4. **Delete Student**: Confirmation → API call → Filter from local state
5. **Real-time Updates**: All operations immediately reflect in UI

## 🚦 Usage Examples

### Adding a Student
1. Fill out the form fields (name, age, email, course)
2. Click "Add Student" button
3. Student appears in the table immediately

### Editing a Student
1. Click "Edit" button in the student table
2. Navigate to update page
3. Click lock/unlock icons to enable field editing
4. Make changes and click "Update Student Information"
5. Success notification appears and returns to home

### Deleting a Student
1. Click "Delete" button in the student table
2. Student is removed immediately from the list

## 🛡️ Error Handling

- **API Errors**: Displayed in red error boxes
- **Form Validation**: Required fields must be filled
- **Network Issues**: Graceful error messages
- **Loading States**: Visual feedback during operations

## 🔮 Future Enhancements

- Search and filter functionality
- Bulk operations (delete multiple students)
- Export data to CSV/PDF
- Student photo uploads
- Advanced course management
- Pagination for large datasets
- Offline support with local storage
- Unit and integration tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- URL parameter in update route includes colon (`:${s.id}`) - should be just `${s.id}`
- No confirmation dialog for delete operations
- Form doesn't clear on navigation away and back

## 📞 Support

For questions or issues, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using React and modern web technologies**