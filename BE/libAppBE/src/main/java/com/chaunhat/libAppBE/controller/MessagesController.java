package com.chaunhat.libAppBE.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import com.chaunhat.libAppBE.entity.Message;
import com.chaunhat.libAppBE.requestmodels.AdminQuestionRequest;
import com.chaunhat.libAppBE.service.MessagesService;
import com.chaunhat.libAppBE.utils.ExtractJWT;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessagesController {
    private final MessagesService service;

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

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value="Authorization") String token,
                           @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only.");
        }
        service.putMessage(adminQuestionRequest, userEmail);
    }
}
