package com.student.studentInfo;

import com.student.studentInfo.model.StudentModel;
import com.student.studentInfo.repository.StudentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class StudentInfoApplicationTests {

    @Autowired
    private StudentRepository studentRepository;

    @Test
    void saveMethod() {
        StudentModel studentModel = new StudentModel();
        studentModel.setName("riddle");
        studentModel.setAge(26);
        studentModel.setEmail("riddle@tom.com");
        studentModel.setCourse(3);

        StudentModel savedObject = studentRepository.save(studentModel);
        System.out.println("This is the id : " + savedObject.getId());
    }

    @Test
    void updateExisting() {
        Long id = 52L;

        // `findById(id)` returns an Optional<StudentModel>, so we call `.get()` to extract the actual StudentModel.
// Be careful: `.get()` will throw NoSuchElementException if the student with the given ID is not found.
        StudentModel studentModel = studentRepository.findById(id).get();


        studentModel.setCourse(3);
        studentModel.setAge(69);

        studentRepository.save(studentModel);
        System.out.println("the student info has been updated");
    }


}
