package com.careernest.backend.repository;

import com.careernest.backend.model.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends MongoRepository<Job,String> {
    List<Job> findByEmployerId(String employerId);
    List<Job> findByTitle(String title,String location);
    List<Job> findByTitleContainingIgnoreCaseAndLocationContainingIgnoreCase(String title, String location);
    List<Job> findByActiveTrue();
    List<Job> findByTitleContainingIgnoreCase(String title);
    List<Job> findByLocationContainingIgnoreCase(String location);

}
