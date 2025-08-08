package com.student.studentInfo.studentController;


import com.student.studentInfo.dto.CourseDto;
import com.student.studentInfo.dto.StudentWithCourseDto;
import com.student.studentInfo.model.StudentModel;
import com.student.studentInfo.repository.StudentRepository;
import com.student.studentInfo.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/students")

public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentService studentService;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping(path = "getAll")
    public List<StudentModel> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping(path = "find/{id}")
    public StudentWithCourseDto getStudent(@PathVariable Long id) {
        return studentService.getStudentWithCourse(id);
    }


    @PostMapping(path = "add")
    public StudentModel addStudent(@RequestBody @Valid StudentModel student) {
        return studentService.addStudent(student);
    }

    @PutMapping(path = "update/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable Long id, @RequestBody @Valid StudentModel updatedStudent) {

        StudentWithCourseDto updated = studentService.updateStudent(id, updatedStudent);
        return ResponseEntity.ok("The student with ID:" + updated.getId() + " and Name: " + updated.getName() + " Has been Successfully Updated");
    }


    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        return studentService.deleteStudent(id);
    }

    @DeleteMapping(path = "deleteAll")
    public String deleteAll() {
        return studentService.deleteAll();
    }

    @GetMapping(path = "getAllCourse")
    public List<CourseDto> getAllCourse() {
        return studentService.getAllCourse();
    }

    @PostMapping(path = "deleteCourse/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        return studentService.deleteCourse(id);
    }

    @GetMapping(path = "getCourse/{id}")
    public CourseDto getCourseWithId(@PathVariable Long id) {
        return studentService.getCourseById(id);
    }

    @PostMapping(path = "addCourse")
    public CourseDto addCourse(@RequestBody CourseDto courseDto) {
        return studentService.addCourse(courseDto);
    }

    @PutMapping(path = "updateCourse")
    public CourseDto updateCourse(@RequestBody CourseDto course) {
        return studentService.updateCourse(course);
    }


}



