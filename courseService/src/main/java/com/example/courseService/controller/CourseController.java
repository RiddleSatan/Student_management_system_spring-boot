package com.example.courseService.controller;



import com.example.courseService.courseService.CourseService;
import com.example.courseService.model.CourseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
    @RequestMapping("/course")

@CrossOrigin

public class CourseController {

    @Autowired
    private CourseService courseService;


        @GetMapping(path = "getAllCourse")
    public List<CourseModel> getAllCourse() {
        return courseService.getAllCourses();
    }

    @DeleteMapping(path = "deleteCourse/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        return courseService.deleteCourse(id);
    }

    @GetMapping(path = "getCourse/{id}")
    public CourseModel getCourseWithId(@PathVariable Long id){
      return  courseService.getCourseById(id);
    }

    @PostMapping(path = "addCourse")
    public CourseModel addCourse(@RequestBody CourseModel courseModel) {
        return courseService.addCourse(courseModel);
    }

    @PutMapping(path = "updateCourse")
    public CourseModel updateCourse(@RequestBody CourseModel course) {
        return courseService.updateCourse(course);
    }
    @Value("${server.port}")
    private String port;

    @GetMapping(path = "/ping")
    public String ping(){
            return "Server is running on port : " + port;
    }



}
