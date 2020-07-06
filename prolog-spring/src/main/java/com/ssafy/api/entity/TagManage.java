package com.ssafy.api.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Data
@IdClass(TagManageId.class)
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
public class TagManage {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_code")
    @OnDelete(action  = OnDeleteAction.CASCADE)
    private Post post;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tId")
    @OnDelete(action  = OnDeleteAction.CASCADE)
    private Tag tag;

    public TagManage(Post post , Tag tag){
        this.post = post;
        this.tag = tag;
    }
}
