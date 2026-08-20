package com.careernest.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    private String id;
    private String employerId;
    private String empolyerName;
    private String title;
    private String description;
    private String location;
    private String salary;
    private List<String> skills;
    private LocalDateTime postedDate;
    private LocalDateTime deadline;
    private int applicationsCount;
    private boolean active;
}
