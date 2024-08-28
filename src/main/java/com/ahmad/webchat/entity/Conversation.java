package com.ahmad.webchat.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@Table(name = "conversation")
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated
    @Column(name = "type", nullable = false)
    private ConversationType type;

    @ManyToMany
    @JoinTable(name = "user_conversation", joinColumns = @JoinColumn(name = "conversation_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> users;

    @Column(name = "created_at", nullable = false)
    private Long createdAt;

    @OneToMany(mappedBy = "conversation"/* , cascade = { CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH } */)
    private Set<Chat> chats;

}
