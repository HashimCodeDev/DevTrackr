package com.hashim.devtrackr.DevTrackr.dto;

import com.hashim.devtrackr.DevTrackr.entity.ProjectStatus;
import lombok.Data;

@Data
public class StatusUpdateRequest {
    private ProjectStatus status;
}