package de.tobi.asz_inventory_api.member;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class MemberService {

    private final MemberCsvRepository repository;
    private String filePath;

    public MemberService(MemberCsvRepository repository, @Value("CSV/members.csv") String filePath) {
        this.repository = repository;
        this.filePath = filePath;
    }

    public List<Member> getAllMembers() throws IOException {
        return repository.getAllMembers(filePath);
    }

    public void addMember(Member member) throws IOException {
        List<Member> members = repository.getAllMembers(filePath);

        long nextId = members.stream()
                .mapToLong(Member::getId)
                .max()
                .orElse(0) + 1;

        member.setId(nextId);

        repository.addMember(members, member);
        repository.saveMembers(filePath, members);
    }

    public void updateMember (long id, Member member) throws IOException{
        List<Member> members = repository.getAllMembers(filePath);

        member.setId(id);

        repository.updateMember(members, member);
        repository.saveMembers(filePath, members);
    }

    public void deleteMember(long id) throws IOException{
        List<Member> members = repository.getAllMembers(filePath);

        repository.deleteMember(members, id);
        repository.saveMembers(filePath, members);
    }
}
