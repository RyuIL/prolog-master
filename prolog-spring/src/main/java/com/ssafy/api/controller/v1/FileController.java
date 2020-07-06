package com.ssafy.api.controller.v1;

import com.ssafy.api.model.response.FileUploadResponse;
import com.ssafy.api.service.FileUploadDownloadService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Api(tags = {"4. File"})
@RestController
@RequestMapping(value = "/v1")
@RequiredArgsConstructor
@Slf4j
public class FileController {

    private final FileUploadDownloadService service;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @PostMapping("/file")
    public FileUploadResponse uploadFile(@RequestParam("upload") MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String fileName = service.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/v1/downloadFile/")
                .path(fileName)
                .toUriString();

        return new FileUploadResponse(fileDownloadUri, true);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
    })
    @PostMapping("/files")
    public List<FileUploadResponse> uploadMultipleFiles(@RequestParam("uploads") MultipartFile[] files){
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file))
                .collect(Collectors.toList());
    }

    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request){
        // Load file as Resource
        Resource resource = service.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }


//    @ApiOperation(value = "File Upload", notes = "File을 업로드 합니다")
//    @PostMapping(value = "/post/{userId}")
//    @CrossOrigin
//    public String fileUpload(@PathVariable String userId, @RequestParam MultipartFile upload){
//        File convertFile = new File("classpath:resources"+userId+upload.getOriginalFilename());
//        try(
//         FileOutputStream fout=new FileOutputStream(convertFile);
//        ){
//            convertFile.createNewFile();
//            fout.write(upload.getBytes());
//        }catch (IOException e){
//            e.printStackTrace();
//        }
//
//        Gson gson = new Gson();
//
//        return gson.toJson("{url: 'http://awefawef', 'uploaded': true");
//    }
}
