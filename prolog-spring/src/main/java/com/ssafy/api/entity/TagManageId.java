package com.ssafy.api.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode
public class TagManageId implements Serializable {
    private int post;
    private Long tag;
}
