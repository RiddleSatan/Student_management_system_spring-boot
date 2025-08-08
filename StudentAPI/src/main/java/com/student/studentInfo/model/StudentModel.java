package com.student.studentInfo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;


@Entity
@Table(
        name = "student",
        uniqueConstraints = @UniqueConstraint(
                name = "email",
                columnNames = "email"
        )
)
public class StudentModel {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(
            name = "student_generator",
            allocationSize = 1,
            sequenceName = "student_sequence_name"
    )
    private Long id;

    @NotNull(message = "Name cannot be Null")
    @Size(min = 2, message = "Name must be at least 2 characters")
    private String name;

    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 60, message = "Age must be less than or equal to 60")
    private int age;

    @Column(name = "CourseId")
    private Long courseId;

    //        @Column(unique = true)
    @Email
    private String email;

    @Column(name = "account_number")
    private int accountNo;

    @CreationTimestamp
    private LocalDateTime dateCreated;

    @UpdateTimestamp
    private LocalDateTime lastUpdated;

    public StudentModel() {
    }

    public StudentModel(String name, int age, Long courseId, String email, int accountNo) {
        this.name = name;
        this.age = age;
        this.courseId = courseId;
        this.email = email;
        this.accountNo = accountNo;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setCourse(Long id) {
        this.courseId = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAccountNo(int accountNo) {
        this.accountNo = accountNo;
    }

    public String getName() {
        return this.name;
    }

    public int getAge() {
        return this.age;
    }

    public Long getCourseId() {
        return this.courseId;
    }

    public Long getId() {
        return this.id;
    }

    public String getEmail() {
        return this.email;
    }

    public int getAccountNo() {
        return this.accountNo;
    }

}
