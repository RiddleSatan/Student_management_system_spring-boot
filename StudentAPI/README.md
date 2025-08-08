# 📘 Student Information REST API

A simple Spring Boot-based REST API for managing student records using in-memory storage (no database). This project is
built for learning purposes and demonstrates basic REST operations and integration with a React frontend.

---

## 🧱 Project Structure

```
com.student.studentInfo
├── StudentController.java  # Handles HTTP requests
└── StudentModel.java       # Represents student entity
```

---

## 📝 StudentModel.java

### Description

Represents a student with the following properties:

| Field       | Type          | Description                       |
|-------------|---------------|-----------------------------------|
| id          | Long          | Auto-generated primary key        |
| name        | String        | Student's name                    |
| age         | int           | Student's age                     |
| course      | String        | Enrolled course                   |
| email       | String        | Must be unique                    |
| dateCreated | LocalDateTime | Auto-generated creation timestamp |
| lastUpdated | LocalDateTime | Auto-updated on change            |

### Constructor

```java
public StudentModel(String name, String age, String course);
```

# 📘 Why is a Non-Parameterized Constructor Needed in `StudentModel.java`?

In your `StudentModel` class, the **non-parameterized (default) constructor** is important for several key reasons:

---

## 🧱 1. Frameworks like Spring and Jackson Need It

When using `@RequestBody` in Spring Boot:

```java

@PostMapping("/add")
public String addStudent(@RequestBody StudentModel student) {
    ...
}
```

- Jackson (the library used to convert JSON into Java objects) uses **reflection** to create the object.
- It **requires a no-arg constructor** to create the object before setting its properties.

If the no-arg constructor is missing, you’ll get errors like:

> `"Cannot construct instance of StudentModel: no suitable constructor found"`

---

## 🔁 2. Your Parameterized Constructor Uses `this()`

```java
public StudentModel(String name, String age, String course) {
    this(); // Calls the no-arg constructor to initialize `id`
    ...
}
```

- This chaining means your parameterized constructor **depends on the existence** of the no-arg constructor.
- Without the no-arg constructor, `this()` would cause a compile-time error.

---

## 🧪 3. Useful for Manual Object Creation

Having a no-arg constructor allows object creation like this:

```java
StudentModel student = new StudentModel();

student.

setName("Riddle");

student.

setAge(21);

student.

setCourse("CS");
```

This is useful during testing or when working in simple setups without constructors.

---

## ✅ Summary

| Reason               | Explanation                                                              |
|----------------------|--------------------------------------------------------------------------|
| Jackson / Spring     | Uses reflection to instantiate objects and requires a no-arg constructor |
| Constructor chaining | Your own constructor calls the default one via `this()`                  |
| Manual creation      | Useful for creating and modifying object fields step-by-step             |

> 🔑 **Always include a no-arg constructor** in Java POJOs when working with Spring Boot, Jackson, or similar frameworks.

- Automatically assigns a unique UUID to `id`.

### Getters and Setters

- `getId()`: Returns the UUID
- `getName()`, `setName(String)`
- `getAge()`, `setAge(int)`
- `getCourse()`, `setCourse(String)`

> **Note**: `email` is currently not stored in the backend model.

---

# Service Layer Documentation: `StudentService.java`

---

## 🎯 Class Overview

**`@Service`**  
Marks this class as a Spring-managed service bean.  
**Responsibility:**

- Coordinate CRUD operations on `StudentModel` entities
- Apply business rules (e.g. existence checks)
- Prepare/transform data for downstream layers

---

## 🔍 Methods

### 1. `public List<StudentModel> getAllStudents()`

- **Description:**  
  Retrieves the full list of students from the database.

- **Returns:**  
  `List<StudentModel>` – a list of all student entities.

- **Exceptions:**  
  None (returns an empty list if no students exist).

---

### 2. `public StudentModel getStudent(Long id)`

- **Description:**  
  Fetches a single student by their unique ID.

- **Parameters:**
    - `id` (`Long`) – the primary key of the student to retrieve.

- **Returns:**  
  `StudentModel` – the student entity corresponding to the given ID.

- **Throws:**  
  `RuntimeException` with message  
  `"Student with ID: <id> not found"`  
  if no matching record exists.

---

### 3. `public StudentModel addStudent(StudentModel student)`

- **Description:**  
  Persists a new student record.

- **Parameters:**
    - `student` (`StudentModel`) – the student entity to create.  
      Must include `name`, `age`, `course`, and `email`.

- **Returns:**  
  `StudentModel` – the newly saved entity (including generated `id`, `dateCreated`, `lastUpdated`).

- **Exceptions:**  
  None (delegates any JPA/DB exceptions upward).

---

### 4. `public StudentModel updateStudent(Long id, StudentModel updatedStudent)`

- **Description:**  
  Updates an existing student’s details.

- **Parameters:**
    - `id` (`Long`) – the ID of the student to update.
    - `updatedStudent` (`StudentModel`) – an object containing new values for `name`, `age`, `course`, and `email`.

- **Returns:**  
  `StudentModel` – the saved entity reflecting updated values and refreshed timestamps.

- **Throws:**  
  `RuntimeException` with message  
  `"Student with ID: <id> not found"`  
  if the target student does not exist.

---

### 5. `public ResponseEntity<String> deleteStudent(Long id)`

- **Description:**  
  Deletes a student record if present; otherwise returns an HTTP 404 response.

- **Parameters:**
    - `id` (`Long`) – the ID of the student to delete.

- **Returns:**
    - `ResponseEntity.ok("Student with ID <id> has been deleted")`  
      if deletion succeeds.
    - `ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Student with ID = <id> not found")`  
      if no such student exists.

---

### 6. `public String deleteAll()`

- **Description:**  
  Removes **all** student records from the database.

- **Returns:**
    - `"Deleted all records successfully"` on success.
    - `"Something went wrong: <error message>"` on failure.

- **Exceptions:**  
  Catches generic `Exception` internally to return a user-friendly message.

---

## ⚙️ Design Notes

- **Exception Handling:**  
  Currently uses unchecked `RuntimeException`.  
  For production, consider creating custom exceptions (e.g. `StudentNotFoundException`) and a global
  `@ControllerAdvice`.

- **Response Wrapping:**  
  `deleteStudent(...)` returns `ResponseEntity` directly.  
  Other methods return domain types — controllers should wrap responses with appropriate HTTP codes.

- **Autowiring:**  
  Uses field injection (`@Autowired`).  
  For better testability, constructor injection can be adopted.

---

## ✅ Usage Example

```java
// Fetch all students
List<StudentModel> all = studentService.getAllStudents();

// Add a new student
StudentModel created = studentService.addStudent(new StudentModel("Alice", 22, "CS"));

// Update a student
StudentModel updated = studentService.updateStudent(5L, updatedStudentData);

// Delete a student
ResponseEntity<String> result = studentService.deleteStudent(5L);

// Delete all students
String msg = studentService.deleteAll();





```

## 🌐StudentController.java

###

Base URL
/students

Maps HTTP requests to service layer methods.

| Method | Endpoint       | Description                    |
|--------|----------------|--------------------------------|
| GET    | `/getAll`      | Returns all students           |
| GET    | `/find/{id}`   | Returns a student by ID        |
| POST   | `/add`         | Adds a new student             |
| PUT    | `/update/{id}` | Updates existing student by ID |
| DELETE | `/delete/{id}` | Deletes student by ID          |
| DELETE | `/deleteAll`   | Deletes all students           |

### 📥 POST `/students`

**Description**: Adds a new student.

**Request Body (JSON)**:

```json
{
  "name": "John",
  "age": "22",
  "course": "Computer Science",
  "email": "john@example.com"
}
```

> ⚠️ Note: `email` is accepted on frontend but not stored in backend yet.

**Response**:

```
student Added: John
```

---

### 📤 GET `/students`

**Description**: Fetches all student records.

**Response**:

```json
[
  {
    "id": "c9a1-f35d-...",
    "name": "John",
    "age": "22",
    "course": "Computer Science"
  }
]
```

---

### ❌ DELETE `/students/{id}`

**Description**: Deletes a student by ID.

**Response on Success**:

```
Student Removed with ID: {id}
```

**Response on Failure**:

```
Error: Student with ID: {id} NOT FOUND!
```

---

## 🔗 Frontend Integration

The React frontend connects to this API at:

```
http://localhost:8080/students
```

Make sure to enable CORS in the backend:

```java
@CrossOrigin("http://localhost:5173")
```

Frontend features:

- Add new student via form
- Display student list in a table
- Delete a student by ID

---

## 🚧 Limitations

- Data is not persistent (in-memory only)
- `email` field is not stored in the backend
- Age stored as string
- No input validation or error handling

---

## 💡 Learning Focus

- Building RESTful API with Spring Boot
- Using annotations: `@RestController`, `@RequestMapping`, etc.
- Handling path variables and request bodies
- Generating UUIDs
- Connecting frontend (React) with Spring Boot backend

---

## 📈 Suggested Next Steps

- Add PUT endpoint for update
- Add `email` field in backend
- Add validation using `@Valid`
- Use in-memory DB (e.g., H2)
- Integrate Swagger UI
- Use Lombok to reduce boilerplate

---

> _Built for educational purposes with ❤️, Spring Boot & React._
