package de.tobi.asz_inventory_api.controller;

import java.io.IOException;
import java.util.List;

import de.tobi.asz_inventory_api.model.Member;
import de.tobi.asz_inventory_api.repository.MemberCsvRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberController {
    private final MemberCsvRepository repository = new MemberCsvRepository();

    @GetMapping("/members")
    public List<Member> getAllMembers() throws IOException {
        return repository.getAllMembers("CSV/members.csv");
    }
}
