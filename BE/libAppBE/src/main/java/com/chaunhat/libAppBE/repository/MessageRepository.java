package com.chaunhat.libAppBE.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chaunhat.libAppBE.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long>{
    
}
