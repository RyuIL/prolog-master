package com.ssafy.api.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class FileUploadResponse {
    private String url;
    private boolean uploaded;
}

