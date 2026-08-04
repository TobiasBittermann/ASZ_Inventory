package de.tobi.asz_inventory_api.bwAccountSnapshot;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class BwAccountSnapshotService {
    private final BwAccountSnapshotCsvRepository repository;
    private final String filePath;
    private static final Logger log = LoggerFactory.getLogger(BwAccountSnapshotService.class);

    public BwAccountSnapshotService(BwAccountSnapshotCsvRepository repository, @Value("CSV/bwsnapshots.csv") String filePath){
        this.repository = repository;
        this.filePath = filePath;
    }

    public List<BwAccountSnapshot> getAllBwAccountSnapshots() throws IOException{
        List<BwAccountSnapshot> snapshots = repository.getAllBwAccountSnapshots(filePath);
        log.debug("BwAccountSnapshotService loaded {} snapshots", snapshots.size());

        return snapshots;
    }

    public void addBwAccountSnapshot(BwAccountSnapshot snapshot) throws IOException{
        List<BwAccountSnapshot> snapshots = repository.getAllBwAccountSnapshots(filePath);

        long nextId = snapshots.stream()
                .mapToLong(BwAccountSnapshot::getId)
                .max()
                .orElse(0) + 1;

        snapshot.setId(nextId);

        repository.addBwAccountSnapshot(snapshots, snapshot);
        repository.saveBwAccountSnapshot(filePath, snapshots);

        log.info("BwAccountSnapshotService added snapshot with id {}", snapshot.getId());
    }

    public void updateBwAccountSnapshot(long id, BwAccountSnapshot snapshot) throws IOException{
        List<BwAccountSnapshot> snapshots = repository.getAllBwAccountSnapshots(filePath);

        snapshot.setId(id);

        repository.updateBwAccountSnapshot(snapshots, snapshot);
        repository.saveBwAccountSnapshot(filePath, snapshots);

        log.info("BwAccountSnapshotService updated snapshot with id {}", id);
    }

    public void deleteBwAccountSnapshot(long id) throws IOException{
        List<BwAccountSnapshot> snapshots = repository.getAllBwAccountSnapshots(filePath);

        BwAccountSnapshot snapshot = snapshots.stream().filter(s -> s.getId() == id).findAny().orElseThrow();

        repository.deleteBwSnapshot(snapshots, id);
        repository.saveBwAccountSnapshot(filePath, snapshots);

        log.info("BwAccountSnapshotService deleted snapshot with id {}", id);
    }
}
