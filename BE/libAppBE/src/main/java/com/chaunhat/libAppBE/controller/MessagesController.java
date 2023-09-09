package com.chaunhat.libAppBE.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chaunhat.libAppBE.entity.Message;
import com.chaunhat.libAppBE.service.MessagesService;
import com.chaunhat.libAppBE.utils.ExtractJWT;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessagesController {
    private MessagesService service;

    @Autowired
    public MessagesController(MessagesService service) {
        this.service = service;
    }

    @PostMapping("secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token,
            @RequestBody Message messageRequest) {
                String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
                service.postMessage(messageRequest, userEmail);
    }
}
