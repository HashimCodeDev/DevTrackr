package com.hashim.devtrackr.DevTrackr.repository;

import com.hashim.devtrackr.DevTrackr.entity.Project;
import com.hashim.devtrackr.DevTrackr.entity.ProjectStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Page<Project> findByStatus(ProjectStatus status, Pageable pageable);
}