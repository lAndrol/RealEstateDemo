package com.task.task.customer;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginCreds {
    private String email;
    private String password;

    public LoginCreds() {
    }

    public LoginCreds(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
