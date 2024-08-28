package com.ahmad.webchat.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ahmad.webchat.dto.common.ResponseDTO;
import com.ahmad.webchat.dto.common.ResponseMessageDTO;

@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(UserNotFoundException.class)
        public ResponseEntity<ResponseDTO<String>> handleUserNotFoundException(UserNotFoundException ex) {
                ResponseDTO<String> responseDTO = ResponseDTO.<String>builder()
                                .message(ResponseMessageDTO.builder()
                                                .code(HttpStatus.NOT_FOUND.toString())
                                                .message(ex.getMessage())
                                                .build())
                                .build();

                return new ResponseEntity<>(responseDTO, HttpStatus.NOT_FOUND);
        }

        @ExceptionHandler(UsernameAlreadyExistException.class)
        public ResponseEntity<ResponseDTO<String>> handleUsernameAlreadyExistException(
                        UsernameAlreadyExistException ex) {
                ResponseDTO<String> responseDTO = ResponseDTO.<String>builder()
                                .message(ResponseMessageDTO.builder()
                                                .code(HttpStatus.CONFLICT.toString())
                                                .message(ex.getMessage())
                                                .build())
                                .build();
                return new ResponseEntity<>(responseDTO, HttpStatus.CONFLICT);
        }

}