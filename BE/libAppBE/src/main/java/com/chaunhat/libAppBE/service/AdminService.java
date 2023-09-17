package com.chaunhat.libAppBE.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chaunhat.libAppBE.entity.Book;
import com.chaunhat.libAppBE.repository.BookRepository;
import com.chaunhat.libAppBE.requestmodels.AddBookRequest;

@Service
@Transactional
public class AdminService {
    private BookRepository bookRepository;

    @Autowired
    public AdminService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void postBook(AddBookRequest request) {
        Book book = new Book();
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setCategory(request.getCategory());
        book.setDescription(request.getDescription());
        book.setCopies(request.getCopies());
        book.setCopiesAvailable(request.getCopies());
        book.setImg(request.getImg());
        
        bookRepository.save(book);
    }
}
