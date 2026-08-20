package com.careernest.backend.controller;


import com.careernest.backend.model.Job;
import com.careernest.backend.service.JobService;
import com.twilio.http.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService){
        this.jobService=jobService;
    }

    @PostMapping
    public ResponseEntity<?> createJob(@RequestBody Job job, @RequestHeader String userId, @RequestHeader String userName){
        try {
            Job createdJob=jobService.createJob(job,userId,userName);
            return ResponseEntity.ok(createdJob);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllJobs(){
        try{
            List<Job> jobs=jobService.getAllJobs();
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable String id){
        try{
            Optional<Job> job= jobService.getJobById(id);
            if (job.isPresent()){
                return ResponseEntity.ok(job.get());
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/search")

    public ResponseEntity<?> searchJobs(@RequestParam(required = false) String title, @RequestParam(required = false) String location){
        try{
            List<Job> jobs= jobService.searchJobs(title,location);
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/employer/{employerId}")

    public ResponseEntity<?> getJobsByEmployer(@PathVariable String employerId){
        try{
            List<Job> jobs=jobService.getJobsByEmployer(employerId);
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(@PathVariable String id, @RequestBody Job jobDetails) {
        try {
            Job updatedJob = jobService.updateJob(id, jobDetails);
            if (updatedJob != null) {
                return ResponseEntity.ok(updatedJob);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Delete job
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable String id) {
        try {
            jobService.deleteJob(id);
            return ResponseEntity.ok("Job deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
