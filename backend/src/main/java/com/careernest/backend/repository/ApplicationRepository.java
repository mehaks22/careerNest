package com.careernest.backend.repository;

import com.careernest.backend.model.Application;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends MongoRepository<Application,String> {
    List<Application> findByJobId(String jobId);
    List<Application> findBySeekerId(String seekerId);

}
