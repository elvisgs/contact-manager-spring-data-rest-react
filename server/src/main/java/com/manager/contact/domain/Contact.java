package com.manager.contact.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Contact {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    @NotNull
    @Valid
    private Name name;

    @Email(message = "Não é um email válido")
    @NotBlank
    private String email;

    @Pattern(regexp = "^\\+(?:[0-9] ?){6,14}[0-9]$", message = "Não é um telefone válido")
    @NotBlank
    private String phone;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;

    @Version
    @JsonIgnore
    private long version;

    public Contact(Name name, String email, String phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}
