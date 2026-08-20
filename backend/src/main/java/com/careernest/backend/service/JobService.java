package com.careernest.backend.service;

import com.careernest.backend.model.Job;
import com.careernest.backend.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // Create a new job
    public Job createJob(Job job, String employerId, String employerName) {
        job.setEmployerId(employerId);
        job.setEmpolyerName(employerName);
        job.setPostedDate(LocalDateTime.now());
        job.setActive(true);
        job.setApplicationsCount(0);
        return jobRepository.save(job);
    }

    // Get all active jobs
    public List<Job> getAllJobs() {
        return jobRepository.findByActiveTrue();
    }

    // Get job by ID
    public Optional<Job> getJobById(String id) {
        return jobRepository.findById(id);
    }

    // Get jobs posted by employer
    public List<Job> getJobsByEmployer(String employerId) {
        return jobRepository.findByEmployerId(employerId);
    }

    // Search jobs by title and location
    public List<Job> searchJobs(String title, String location) {
        if (title != null && !title.isEmpty() && location != null && !location.isEmpty()) {
            return jobRepository.findByTitleContainingIgnoreCaseAndLocationContainingIgnoreCase(title, location);
        } else if (title != null && !title.isEmpty()) {
            return jobRepository.findByTitleContainingIgnoreCase(title);
        } else if (location != null && !location.isEmpty()) {
            return jobRepository.findByLocationContainingIgnoreCase(location);
        }
        return getAllJobs();
    }

    // Update job
    public Job updateJob(String id, Job jobDetails) {
        Optional<Job> job = jobRepository.findById(id);
        if (job.isPresent()) {
            Job existingJob = job.get();
            existingJob.setTitle(jobDetails.getTitle());
            existingJob.setDescription(jobDetails.getDescription());
            existingJob.setLocation(jobDetails.getLocation());
            existingJob.setSalary(jobDetails.getSalary());
            existingJob.setSkills(jobDetails.getSkills());
            existingJob.setDeadline(jobDetails.getDeadline());
            return jobRepository.save(existingJob);
        }
        return null;
    }

    // Delete job
    public void deleteJob(String id) {
        jobRepository.deleteById(id);
    }

    // Increment applications count
    public void incrementApplicationCount(String jobId) {
        Optional<Job> job = jobRepository.findById(jobId);
        if (job.isPresent()) {
            Job existingJob = job.get();
            existingJob.setApplicationsCount(existingJob.getApplicationsCount() + 1);
            jobRepository.save(existingJob);
        }
    }
}
