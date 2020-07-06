package com.ssafy.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "tags")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long tId; // tag Numbering

    @Column(nullable = false, unique = true)
    @OnDelete(action  = OnDeleteAction.CASCADE)
    private String tag; // tag name
    public Tag(String tag) {
        this.tag = tag;
    }
}
