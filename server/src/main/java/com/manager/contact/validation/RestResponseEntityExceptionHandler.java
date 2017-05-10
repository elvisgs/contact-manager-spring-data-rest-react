package com.manager.contact.validation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolationException;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ValidationErrors> handleValidationException(ConstraintViolationException ex) {
    ValidationErrors errors = new ValidationErrors();
    ex.getConstraintViolations().stream()
      .forEach(error -> errors.addError(error.getPropertyPath().toString(), error.getMessage()));

    return ResponseEntity.badRequest().body(errors);
  }
}
