package com.student.studentInfo.repository;


import com.student.studentInfo.model.StudentModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<StudentModel,Long> {
}

