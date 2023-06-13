package com.chaunhat.libAppBE.controller;

import com.chaunhat.libAppBE.entity.Book;
import com.chaunhat.libAppBE.service.BookService;
import com.chaunhat.libAppBE.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {
    private static final String userEmail = "root@email.com";

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@RequestHeader(value = "Authorization") String token) {
        String email = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.currentLoansCount(email);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) {
        String email = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.checkoutBookByUser(email, bookId);
    }

    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
        String email = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return bookService.checkoutBook(email, bookId);
    }
}
