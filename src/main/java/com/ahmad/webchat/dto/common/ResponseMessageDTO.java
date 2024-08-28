package com.ahmad.webchat.dto.common;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResponseMessageDTO {
    private String code;
    private String message;
}
