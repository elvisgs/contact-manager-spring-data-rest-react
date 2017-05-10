package com.manager.contact;

import com.manager.contact.domain.Contact;
import com.manager.contact.domain.ContactRepository;
import com.manager.contact.domain.Name;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DbInitializer implements CommandLineRunner {

    private final ContactRepository contactRepository;

    @Override
    public void run(String... strings) throws Exception {
        Contact mike = new Contact(new Name("Mike", "Scofield"), "m.scofield@mail.com", "+551122223333");
        Contact linc = new Contact(new Name("Linc", "Burrows"), "l.burrows@mail.com", "+551122224444");

        contactRepository.save(mike);
        contactRepository.save(linc);
    }
}
