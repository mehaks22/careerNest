package com.careernest.backend.service;

import com.careernest.backend.model.Application;
import com.careernest.backend.model.Job;
import com.careernest.backend.model.User;
import com.careernest.backend.repository.ApplicationRepository;
import com.careernest.backend.repository.JobRepository;
import com.careernest.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final JobService jobService;

    private final String UPLOAD_DIR = "uploads/resumes/";

    public ApplicationService(ApplicationRepository applicationRepository, JobRepository jobRepository,
                              UserRepository userRepository, JobService jobService) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.jobService = jobService;
    }

    // Apply for a job with File Upload + Duplicate Check
    public Application applyForJobWithFile(String jobId, String seekerId, String coverLetter, MultipartFile resumeFile) {
        // 1. Check if the user has already applied
        List<Application> existing = applicationRepository.findByJobId(jobId);
        boolean alreadyApplied = existing.stream()
                .anyMatch(app -> seekerId.equals(app.getSeekerId()));

        if (alreadyApplied) {
            throw new RuntimeException("You have already applied for this job.");
        }

        // 2. Retrieve Job and Seeker entity
        Optional<Job> job = jobRepository.findById(jobId);
        Optional<User> seeker = userRepository.findById(seekerId);

        if (job.isPresent() && seeker.isPresent()) {
            try {
                // 3. Create upload directory if missing
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                // 4. Save file to disk
                String originalFileName = resumeFile != null ? resumeFile.getOriginalFilename() : "resume.pdf";
                String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFileName;
                Path filePath = Paths.get(UPLOAD_DIR + uniqueFileName);

                if (resumeFile != null && !resumeFile.isEmpty()) {
                    Files.copy(resumeFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                }

                // 5. Construct Application object
                Application application = new Application();
                application.setJobId(jobId);
                application.setJobTitle(job.get().getTitle());
                application.setSeekerId(seekerId);
                application.setSeekerName(seeker.get().getFirstName() + " " + seeker.get().getLastName());
                application.setSeekerEmail(seeker.get().getEmail());
                application.setCoverLetter(coverLetter);
                application.setResumePath(filePath.toString());
                application.setAppliedDate(LocalDateTime.now());
                application.setStatus("APPLIED");

                // 6. Increment count & save
                jobService.incrementApplicationCount(jobId);
                return applicationRepository.save(application);

            } catch (IOException e) {
                throw new RuntimeException("Failed to save uploaded resume: " + e.getMessage());
            }
        }
        throw new RuntimeException("Job or User not found.");
    }

    // Existing methods
    public List<Application> getApplicationsByJobId(String jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public List<Application> getApplicationsBySeekerId(String seekerId) {
        return applicationRepository.findBySeekerId(seekerId);
    }

    public Optional<Application> getApplicationById(String id) {
        return applicationRepository.findById(id);
    }

    public Application updateApplicationStatus(String id, String status) {
        Optional<Application> application = applicationRepository.findById(id);
        if (application.isPresent()) {
            Application existingApp = application.get();
            existingApp.setStatus(status);
            return applicationRepository.save(existingApp);
        }
        return null;
    }

    public void deleteApplication(String id) {
        applicationRepository.deleteById(id);
    }
}