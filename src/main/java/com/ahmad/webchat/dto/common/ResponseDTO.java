package com.ahmad.webchat.dto.common;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResponseDTO<R> {
    @Builder.Default
    private ResponseMessageDTO message = new ResponseMessageDTO("", "");
    private R data;
}
