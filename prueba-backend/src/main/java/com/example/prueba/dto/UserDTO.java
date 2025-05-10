package com.example.prueba.dto;

import lombok.Getter;

public class UserDTO {

    @Getter
    public static class LoginRequest{
        private String email;
        private String password;

    }

    @Getter
    public static  class RegisterRequest{
        private String email;
        private String password;
        private String role;
    }





}
