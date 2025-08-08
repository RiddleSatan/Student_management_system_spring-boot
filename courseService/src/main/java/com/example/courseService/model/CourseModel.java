    package com.example.courseService.model;


    import jakarta.persistence.*;

    @Entity
    @Table(
            name = "course"
    )
    public class CourseModel {
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE)
        @SequenceGenerator(name = "course_generator", sequenceName = "course_sequence_name", allocationSize = 1)
        private Long id;

        private String name;

        public CourseModel() {
        }

        public CourseModel(String name) {
            this.name = name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Long getId() {
            return id;
        }

        public String getName() {
            return this.name;
        }

    }
