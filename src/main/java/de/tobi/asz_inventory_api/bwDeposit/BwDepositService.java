package de.tobi.asz_inventory_api.bwDeposit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class BwDepositService {
    private final BwDepositCsvRepository repository;
    private final String filePath;

    public BwDepositService(BwDepositCsvRepository repository, @Value("CSV/deposits.csv") String filePath) {
        this.repository = repository;
        this.filePath = filePath;
    }

    public List<BwDeposit> getAllBwDeposits() throws IOException {
        return repository.getAllBwDeposits(filePath);
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
    }

    public void updateBwDeposit(long id, BwDeposit deposit) throws IOException {
        List<BwDeposit> deposits = repository.getAllBwDeposits(filePath);

        deposit.setId(id);

        repository.updateBwDeposit(deposits, deposit);
        repository.saveBwDeposit(filePath,deposits);
    }

    public void deleteBwDeposit(long id) throws IOException{
        List<BwDeposit> deposits = repository.getAllBwDeposits(filePath);

        repository.deleteBwDeposit(deposits, id);
        repository.saveBwDeposit(filePath, deposits);
    }

}
