package com.example.employeemanagement.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.*;
import java.time.LocalDate;

/**
 * This class represents an Employee entity. Each employee has an ID, name, email,
 * department, age, gender, hire date, work mode, and satisfaction score.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

  /** The ID of the employee. It is unique and generated automatically. */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /** The first name of the employee. */
  private String firstName;

  /** The last name of the employee. */
  private String lastName;

  /** The email of the employee. */
  private String email;

  /** The department of the employee. */
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "department_id", nullable = false)
  @JsonBackReference
  private Department department;

  /** The age of the employee. */
  private int age;

  /** The gender identification of the employee. */
  private String gender;

  /** The date the employee was officially deployed/hired. */
  private LocalDate hireDate;

  /** The current work mode configuration (Onsite, Remote, Hybrid). */
  private String workMode;

  /** The operational satisfaction score as reported by the system (1-5). */
  private int satisfactionScore;
}
