package de.tobi.asz_inventory_api.bwDeposit;

import de.tobi.asz_inventory_api.member.Member;
import de.tobi.asz_inventory_api.member.MemberCsvRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class BwDepositService {
    private final BwDepositCsvRepository repository;
    private final MemberCsvRepository memberRepository;
    private final String filePath;
    private final String memberFilePath;
    private static final Logger log = LoggerFactory.getLogger(BwDepositService.class);

    public BwDepositService(BwDepositCsvRepository repository, MemberCsvRepository memberCsvRepository, @Value("${app.deposits.csv-path}") String filePath, @Value("${app.members.csv-path}") String memberFilePath) {
        this.repository = repository;
        this.memberRepository = memberCsvRepository;
        this.filePath = filePath;
        this.memberFilePath = memberFilePath;
    }

    public List<BwDeposit> getAllBwDeposits() throws IOException {
        List<BwDeposit> deposits = repository.getAllBwDeposits(filePath);
        log.debug("BwDepositsService loaded {} deposits.", deposits.size());

        return deposits;
    }

    public void addBwDeposit(BwDeposit deposit) throws IOException {
        List<BwDeposit> deposits = repository.getAllBwDeposits(filePath);

        long nextId = deposits.stream()
                .mapToLong(BwDeposit::getId)
                .max()
                .orElse(0) + 1;

        deposit.setId(nextId);

        repository.addBwDeposit(deposits, deposit);
        repository.saveBwDeposit(filePath, deposits);

        changeBalance(deposit.getMemberId(), deposit.getDeposit());

        log.info("BwDepositService added deposit with id {}", deposit.getId());
    }

    public void updateBwDeposit(long id, BwDeposit deposit) throws IOException {
        List<BwDeposit> deposits = repository.getAllBwDeposits(filePath);

        deposit.setId(id);

        // Get old deposit to cerrect the number
        BwDeposit oldDeposit = deposits.stream().filter(od -> od.getId() == id).findAny().orElseThrow();

        double depositToCorrect = oldDeposit.getDeposit();

        repository.updateBwDeposit(deposits, deposit);
        repository.saveBwDeposit(filePath, deposits);

        // Calculate new deposit
        double newDeposit = deposit.getDeposit() - depositToCorrect;

        changeBalance(deposit.getMemberId(), newDeposit);

        log.info("BwDepositService updated deposit with id {}", deposit.getId());
    }

    public void deleteBwDeposit(long id) throws IOException {
        List<BwDeposit> deposits = repository.getAllBwDeposits(filePath);

        BwDeposit deposit = deposits.stream().filter(d -> d.getId() == id).findAny(). orElseThrow();

        repository.deleteBwDeposit(deposits, id);
        repository.saveBwDeposit(filePath, deposits);

        changeBalance(deposit.getMemberId(), -deposit.getDeposit());

        log.info("BwDepositService deleted deposit with id {}", deposit.getId());
    }

    public void changeBalance(long memberId, double amountDeposit) throws IOException {
        List<Member> members = memberRepository.getAllMembers(memberFilePath);

        Member member = members.stream()
                .filter(m -> m.getId() == memberId)
                .findAny()
                .orElseThrow();

        Double oldBalance = member.getBalance();

        member.setBalance(member.getBalance() + amountDeposit);

        memberRepository.updateMember(members, member);
        memberRepository.saveMembers(memberFilePath, members);

        log.info("BwDepositService updated balance from member {} {} with id {} from {} to {}",
                member.getFirstName(),
                member.getLastName(),
                member.getId(),
                oldBalance,
                member.getBalance());
    }

}
