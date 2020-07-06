package com.ssafy.api.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {

    //@Size(min=2, max=100)
    @ApiModelProperty(value = "제목", required = true)
    private String title;
    @ApiModelProperty(value = "내용")
    private String body;

    @ApiModelProperty(value = "표지색상")
    private String coverColor;

    @ApiModelProperty(value = "표지이미지")
    private String coverImage;

    @ApiModelProperty(value = "태그 리스트")
    private String[] tagList; // tag table에 넣을것.

//    @ApiModelProperty(value="공개여부")
//    private boolean privateStatus;

//    @ApiModelProperty(value = "포스트핀")
//    private boolean pinPost;
//    @ApiModelProperty(value = "프로젝트핀")
//    private boolean pinProject;
}