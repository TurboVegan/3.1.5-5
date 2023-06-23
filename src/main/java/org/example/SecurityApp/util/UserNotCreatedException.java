package org.example.SecurityApp.util;

public class UserNotCreatedException extends RuntimeException{
    public UserNotCreatedException(String msg) {
        super(msg);
    }
}
