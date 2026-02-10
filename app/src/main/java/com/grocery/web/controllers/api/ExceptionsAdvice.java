package com.grocery.web.controllers.api;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * A controller advice that handles errors by returning a RFC 9457 response to callers
 */
@ControllerAdvice("com.grocery.web.controllers.api")
public class ExceptionsAdvice extends ResponseEntityExceptionHandler {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public ResponseEntity<Object> handleMethodArgumentNotValid(
			MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {

        ProblemDetail body = ex.getBody();
        body.setType(URI.create("invalid-arguments"));

        List<Map<String, String>> localizedErrors = ex.getFieldErrors()
            .stream()
            .map(error -> Map.of(
                "field", error.getField(),
                // Manual translation for the 'reason' using the key from the error
                "reason", this.getMessageSource().getMessage(error, request.getLocale()) // getMessage is from ResponseEntityExceptionHandler
            ))
            .toList();

        body.setProperty("errors", localizedErrors);

        return super.handleExceptionInternal(ex, null, headers, status, request);
    }

    /* A catch-all handler that returns a 500 status code */
    @ExceptionHandler
    public final ProblemDetail handleAnyException(Exception ex, WebRequest request) throws Exception {
        logger.error("Exception occured in API call: {}: {}", ex.getClass(), ex.getMessage());
        ProblemDetail pd = ProblemDetail.forStatus(500);
        pd.setType(URI.create("generic-error"));
        
        return pd;
    }

}


