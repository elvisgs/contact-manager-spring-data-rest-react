package com.manager.contact.validation;

import lombok.AllArgsConstructor;
import lombok.Value;

@Value
@AllArgsConstructor
public class FieldError {

  private String field, message;
}
