package com.example.courseService.courseService;


import com.example.courseService.courseRepository.CourseRepository;
import com.example.courseService.model.CourseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public CourseModel addCourse(CourseModel course) {
        return courseRepository.save(course);
    }

    public List<CourseModel> getAllCourses() {
        return courseRepository.findAll();
    }

    public CourseModel getCourseById(Long id){
       return  courseRepository.findById(id)
               .orElseThrow(()-> new RuntimeException("Course with ID: "+id+"NOT_FOUND"));
    }

    public ResponseEntity<String> deleteCourse(Long id) {
        Optional<CourseModel> course = courseRepository.findById(id);

        if (course.isPresent()) {
            courseRepository.deleteById(id);
            return ResponseEntity.ok("The Course with" + id + "was Removed Successfully !");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course with id : " + id + "NOT_FOUND !");
        }
    }

    public CourseModel updateCourse(CourseModel courseModel) {
        CourseModel exisitingCourse = courseRepository.findById(courseModel.getId()).orElseThrow(() -> new RuntimeException("Course with id:" + courseModel.getId() + "Not found"));
        exisitingCourse.setName(courseModel.getName());
        return courseRepository.save(exisitingCourse);
    }
}

