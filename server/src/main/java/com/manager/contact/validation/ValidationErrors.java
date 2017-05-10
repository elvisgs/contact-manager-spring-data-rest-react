package com.manager.contact.validation;

import lombok.Setter;
import lombok.Value;

import java.util.ArrayList;
import java.util.List;

@Value
public class ValidationErrors {

  private List<FieldError> errors = new ArrayList<>();
  private @Setter String message = "Validation failed";

  public ValidationErrors addError(String path, String message) {
    errors.add(new FieldError(path, message));
    return this;
  }
}
