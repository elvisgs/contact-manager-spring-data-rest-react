package com.manager.contact;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;

import static org.springframework.web.cors.CorsConfiguration.ALL;

@Component
public class SpringDataRestCustomization extends RepositoryRestConfigurerAdapter {

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    config.getCorsRegistry()
      .addMapping("/**/*")
      .allowedOrigins(ALL)
      .allowedMethods(ALL)
      .allowedHeaders(ALL)
      .allowCredentials(true)
      .maxAge(3600);
  }
}
