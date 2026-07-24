package de.tobi.asz_inventory_api.member;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
public class MemberController {
    private final MemberCsvRepository repository = new MemberCsvRepository();
    @Value("${app.members.csv-path}")
    private String filePath;

    @GetMapping("/members")
    public List<Member> getAllMembers() throws IOException {
        return repository.getAllMembers(filePath);
    }

    @PostMapping("/members")
    public void addMember(@RequestBody Member member) throws IOException {
        List<Member> members = repository.getAllMembers(filePath);

        long nextId = members.stream()
                .mapToLong(Member::getId)
                .max()
                .orElse(0) + 1;

        member.setId(nextId);

        repository.addMember(members, member);
        repository.saveMembers(filePath, members);
    }

    @PutMapping("/members/{id}")
    public void updateMember(@PathVariable long id, @RequestBody Member member) throws IOException{
        List<Member> members = repository.getAllMembers(filePath);

        member.setId(id);

        repository.updateMember(members, member);
        repository.saveMembers(filePath, members);
    }

    @DeleteMapping("/members/{id}")
    public void deleteMember(@PathVariable long id) throws IOException{
        List<Member> members = repository.getAllMembers(filePath);

        repository.deleteMember(members, id);
        repository.saveMembers(filePath, members);
    }
}
