package com.ssafy.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "comments")
public class Comment extends CommonDateEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = "comment_code")
    private int cmtId;
    
    @Column(name = "content", nullable = false)
    private String comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action  = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action  = OnDeleteAction.CASCADE)
    @JoinColumn(name = "post_code")
    private Post post; // postId 사용

}
