package com.careernest.backend.controller;


import com.careernest.backend.model.Application;
import com.careernest.backend.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {
    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // Apply for a job (Job Seeker)
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> applyForJob(
            @RequestParam("jobId") String jobId,
            @RequestHeader("userId") String seekerId,
            @RequestParam("coverLetter") String coverLetter,
            @RequestPart("resume") MultipartFile resumeFile) {
        try {
            Application application = applicationService.applyForJobWithFile(jobId, seekerId, coverLetter, resumeFile);
            return ResponseEntity.ok(application);
        } catch (RuntimeException e) {
            // Returns "You have already applied for this job." to React
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get applications by seeker
    @GetMapping("/seeker/{seekerId}")
    public ResponseEntity<?> getApplicationsBySeeker(@PathVariable String seekerId) {
        try {
            List<Application> applications = applicationService.getApplicationsBySeekerId(seekerId);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get applications for a job (Employer)
    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getApplicationsByJob(@PathVariable String jobId) {
        try {
            List<Application> applications = applicationService.getApplicationsByJobId(jobId);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get application by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getApplicationById(@PathVariable String id) {
        try {
            Optional<Application> application = applicationService.getApplicationById(id);
            if (application.isPresent()) {
                return ResponseEntity.ok(application.get());
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Update application status (Employer)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateApplicationStatus(@PathVariable String id, @RequestParam String status) {
        try {
            Application updatedApp = applicationService.updateApplicationStatus(id, status);
            if (updatedApp != null) {
                return ResponseEntity.ok(updatedApp);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Delete application
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteApplication(@PathVariable String id) {
        try {
            applicationService.deleteApplication(id);
            return ResponseEntity.ok("Application deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
