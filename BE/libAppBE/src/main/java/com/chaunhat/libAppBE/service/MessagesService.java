package com.chaunhat.libAppBE.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chaunhat.libAppBE.entity.Message;
import com.chaunhat.libAppBE.repository.MessageRepository;

@Service
@Transactional
public class MessagesService {
    private MessageRepository repository;

    @Autowired
    public MessagesService(MessageRepository repository) {
        this.repository = repository;
    }

    public void postMessage(Message messageRequest, String userEmail) {
        Message message = new Message(messageRequest.getTitle(), messageRequest.getQuestion());
        message.setUserEmail(userEmail);
        repository.save(message);
    }
}
