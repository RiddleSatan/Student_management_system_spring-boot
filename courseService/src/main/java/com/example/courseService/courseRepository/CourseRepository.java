package com.example.courseService.courseRepository;

import com.example.courseService.model.CourseModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<CourseModel,Long> {
}
