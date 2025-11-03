package com.hashim.devtrackr.DevTrackr.controller;

import com.hashim.devtrackr.DevTrackr.dto.StatusUpdateRequest;
import com.hashim.devtrackr.DevTrackr.entity.Project;
import com.hashim.devtrackr.DevTrackr.entity.ProjectStatus;
import com.hashim.devtrackr.DevTrackr.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Slf4j
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<Page<Project>> getAllProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) ProjectStatus status) {
        long startTime = System.currentTimeMillis();
        try {
            log.info("Fetching projects - page: {}, size: {}, sortBy: {}, sortDir: {}, status: {}", 
                    page, size, sortBy, sortDir, status);
            
            Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
            Pageable pageable = PageRequest.of(page, size, sort);
            
            Page<Project> projects = status != null ? 
                projectService.getProjectsByStatus(status, pageable) :
                projectService.getAllProjects(pageable);
            
            long executionTime = System.currentTimeMillis() - startTime;
            log.info("Successfully fetched {} projects in {}ms", projects.getTotalElements(), executionTime);
            return ResponseEntity.ok(projects);
        } catch (Exception e) {
            long executionTime = System.currentTimeMillis() - startTime;
            log.error("Error fetching projects after {}ms: {}", executionTime, e.getMessage(), e);
            throw e;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        long startTime = System.currentTimeMillis();
        try {
            log.info("Fetching project with id: {}", id);
            Project project = projectService.getProjectById(id);
            long executionTime = System.currentTimeMillis() - startTime;
            log.info("Successfully fetched project: {} in {}ms", project.getName(), executionTime);
            return ResponseEntity.ok(project);
        } catch (Exception e) {
            long executionTime = System.currentTimeMillis() - startTime;
            log.error("Error fetching project with id {} after {}ms: {}", id, executionTime, e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody Project project) {
        long startTime = System.currentTimeMillis();
        try {
            log.info("Creating new project: {}", project.getName());
            Project createdProject = projectService.createProject(project);
            long executionTime = System.currentTimeMillis() - startTime;
            log.info("Successfully created project with id: {} in {}ms", createdProject.getId(), executionTime);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
        } catch (Exception e) {
            long executionTime = System.currentTimeMillis() - startTime;
            log.error("Error creating project {} after {}ms: {}", project.getName(), executionTime, e.getMessage(), e);
            throw e;
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @Valid @RequestBody Project project) {
        long startTime = System.currentTimeMillis();
        try {
            log.info("Updating project with id: {}", id);
            Project updatedProject = projectService.updateProject(id, project);
            long executionTime = System.currentTimeMillis() - startTime;
            log.info("Successfully updated project: {} in {}ms", updatedProject.getName(), executionTime);
            return ResponseEntity.ok(updatedProject);
        } catch (Exception e) {
            long executionTime = System.currentTimeMillis() - startTime;
            log.error("Error updating project with id {} after {}ms: {}", id, executionTime, e.getMessage(), e);
            throw e;
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Project> updateProjectStatus(@PathVariable Long id, @RequestBody StatusUpdateRequest request) {
        long startTime = System.currentTimeMillis();
        try {
            log.info("Updating status for project id: {} to status: {}", id, request.getStatus());
            Project updatedProject = projectService.updateProjectStatus(id, request.getStatus());
            long executionTime = System.currentTimeMillis() - startTime;
            log.info("Successfully updated project status for: {} in {}ms", updatedProject.getName(), executionTime);
            return ResponseEntity.ok(updatedProject);
        } catch (Exception e) {
            long executionTime = System.currentTimeMillis() - startTime;
            log.error("Error updating status for project id {} after {}ms: {}", id, executionTime, e.getMessage(), e);
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        long startTime = System.currentTimeMillis();
        try {
            log.info("Deleting project with id: {}", id);
            projectService.deleteProject(id);
            long executionTime = System.currentTimeMillis() - startTime;
            log.info("Successfully deleted project with id: {} in {}ms", id, executionTime);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            long executionTime = System.currentTimeMillis() - startTime;
            log.error("Error deleting project with id {} after {}ms: {}", id, executionTime, e.getMessage(), e);
            throw e;
        }
    }
}