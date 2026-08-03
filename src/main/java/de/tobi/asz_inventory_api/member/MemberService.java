package de.tobi.asz_inventory_api.member;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class MemberService {

    private final MemberCsvRepository repository;
    private final String filePath;
    private static final Logger log = LoggerFactory.getLogger(MemberService.class);

    public MemberService(MemberCsvRepository repository, @Value("${app.members.csv-path}") String filePath) {
        this.repository = repository;
        this.filePath = filePath;
    }

    public List<Member> getAllMembers() throws IOException {
        List<Member> members = repository.getAllMembers(filePath);
        log.debug("MemberService loaded {} members.", members.size());

        return members;
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

        log.info("MemberService added member {} {} with id {}.", member.getFirstName(), member.getLastName(), member.getId());

    }

    public void updateMember(long id, Member member) throws IOException {
        List<Member> members = repository.getAllMembers(filePath);

        member.setId(id);

        repository.updateMember(members, member);
        repository.saveMembers(filePath, members);

        log.info("MemberService updated member {} {} with id {}.", member.getFirstName(), member.getLastName(), member.getId());
    }

    public void deleteMember(long id) throws IOException {
        List<Member> members = repository.getAllMembers(filePath);

        //Get member for log message
        Member member = members.stream().filter(m -> m.getId() == id).findAny().orElseThrow();

        repository.deleteMember(members, id);
        repository.saveMembers(filePath, members);

        log.info("MemberService deleted member {} {} with id {}.", member.getFirstName(), member.getLastName(), id);
    }
}
