package com.test.app.security;

import org.springframework.security.core.AuthenticationException;

/**
 * Исключение - выдается в случае, если не зарегистрированный пользователь пытается аутентифицироваться.
 */
public class UserNotActivatedException extends AuthenticationException {

    private static final long serialVersionUID = 1L;

    public UserNotActivatedException(String message) {
        super(message);
    }
}
