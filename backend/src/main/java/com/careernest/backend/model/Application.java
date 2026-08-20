package com.careernest.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "applications")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Application {
    private String id;
    private String jobId;
    private String jobTitle;
    private String seekerId;
    private String seekerName;
    private String seekerEmail;
    private String status;
    private String resume;
    private String coverLetter;
    private LocalDateTime appliedDate;

    private String resumePath;

    public String getResumePath() {
        return resumePath;
    }

    public void setResumePath(String resumePath) {
        this.resumePath = resumePath;
    }
}
