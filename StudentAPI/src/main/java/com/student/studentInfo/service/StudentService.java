package com.student.studentInfo.service;

import com.student.studentInfo.dto.CourseDto;
import com.student.studentInfo.dto.StudentWithCourseDto;
import com.student.studentInfo.model.StudentModel;
import com.student.studentInfo.repository.StudentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private RestTemplate restTemplate;

    public List<StudentModel> getAllStudents() {
        return studentRepository.findAll();
    }

    public StudentWithCourseDto getStudentWithCourse(Long id) {
        StudentModel student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student with ID:" + id + "not found"));

        CourseDto course = restTemplate.getForObject("http://course-service/course/getCourse/" + student.getCourseId(), CourseDto.class);
        StudentWithCourseDto studentWithCourseDto = convertEntityToDto(student);
        studentWithCourseDto.setCourse(course);
        return studentWithCourseDto;
    }

    public StudentModel addStudent(StudentModel student) {
        System.out.println("this is the account number of student: " + student.getAccountNo());

        StudentModel newStudent = studentRepository.save(student);
        return newStudent;
    }

    public StudentWithCourseDto updateStudent(Long id, StudentModel updatedStudent) {
        StudentModel existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student with id: " + id + "not found"));

        existingStudent.setName(updatedStudent.getName());
        existingStudent.setAge(updatedStudent.getAge());
        existingStudent.setEmail(updatedStudent.getEmail());
        existingStudent.setCourse(updatedStudent.getCourseId());
        studentRepository.save(existingStudent);

        return convertEntityToDto(existingStudent);
    }


    public ResponseEntity<String> deleteStudent(Long id) {

        Optional<StudentModel> student = studentRepository.findById(id);
        if (student.isPresent()) {
            studentRepository.deleteById(id);
            return ResponseEntity.ok("student with ID " + id + "has been deleted");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Student with id= " + id + "not found");
    }

    public String deleteAll() {
        try {
            studentRepository.deleteAll();
            return "Deleted all Records Successfully";
        } catch (Exception e) {
            return "Something Went Wrong" + e;
        }
    }

    public List<CourseDto> getAllCourse() {
        ResponseEntity<List<CourseDto>> response = restTemplate.exchange("http://course-service/course/getAllCourse", HttpMethod.GET, null, new ParameterizedTypeReference<List<CourseDto>>() {
        });
        return response.getBody();
    }

    public ResponseEntity<String> deleteCourse(Long id) {
        ResponseEntity<String> response = restTemplate.exchange("http://course-service/course/deleteCourse/" + id, HttpMethod.DELETE, null, new ParameterizedTypeReference<String>() {
                }
        );
        return response;
    }

    public CourseDto getCourseById(Long id) {
        System.out.println("this is the ID of the course : " + id);
        CourseDto response = restTemplate.getForObject("http://course-service/course/getCourse/" + id, CourseDto.class);
        return response;
    }

    public CourseDto addCourse(CourseDto courseDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<CourseDto> request = new HttpEntity<>(courseDto, headers);

        ResponseEntity<CourseDto> response = restTemplate.exchange("http://course-service/course/addCourse", HttpMethod.POST, request, new ParameterizedTypeReference<CourseDto>() {
        });
        return response.getBody();
    }

    public CourseDto updateCourse(CourseDto courseDto) {
        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<CourseDto> request = new HttpEntity<>(courseDto, headers);

        ResponseEntity<CourseDto> response = restTemplate.exchange("http://course-service/course/updateCourse", HttpMethod.PUT, request, new ParameterizedTypeReference<CourseDto>() {
        });
        return response.getBody();
    }

    private StudentWithCourseDto convertEntityToDto(StudentModel studentModel) {
        StudentWithCourseDto studentDto = new StudentWithCourseDto();
        studentDto = modelMapper.map(studentModel, StudentWithCourseDto.class);
        return studentDto;
    }

//    private CourseDto covertToCourseDto(CourseDto courseDto) {
//
//    }


}
