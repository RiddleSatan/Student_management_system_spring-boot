package com.student.studentInfo.dto;

public class StudentWithCourseDto {

    private Long id;
    private String name;

    private int age;
    private String email;
    private CourseDto course;

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCourse(CourseDto course) {
        this.course = course;
    }

    public String getName() {
        return this.name;
    }

    public int getAge() {
        return this.age;
    }

    public String getEmail() {
        return this.email;
    }

    public CourseDto getCourse() {
        return this.course;
    }

    public Long getId() {
        return this.id;
    }


}
