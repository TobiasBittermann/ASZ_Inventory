package de.tobi.asz_inventory_api.inventory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class InventoryService {
    private final InventoryCsvRepository repository;
    private final String filePath;
    private static final Logger log = LoggerFactory.getLogger(InventoryService.class);

    public InventoryService(InventoryCsvRepository repository, @Value("${app.inventories.csv-path}") String filePath) {
        this.repository = repository;
        this.filePath = filePath;
    }

    public List<Inventory> getAllInventories() throws IOException {
        List<Inventory> inventories = repository.getAlLInventories(filePath);
        log.debug("InventoryService loaded {} inventories", inventories.size());

        return inventories;
    }

    public void addInventory(Inventory inventory) throws IOException {
        List<Inventory> inventories = repository.getAlLInventories(filePath);

        long nextId = inventories.stream()
                .mapToLong(Inventory::getId)
                .max()
                .orElse(0) + 1;

        inventory.setId(nextId);

        repository.addInventory(inventories, inventory);
        repository.saveInventory(filePath, inventories);

        log.info("InventoryService added inventory with id {}", inventory.getId());
    }

    public void updateInventory(long id, Inventory inventory) throws IOException {
        List<Inventory> inventories = repository.getAlLInventories(filePath);

        inventory.setId(id);

        repository.updateInventory(inventories, inventory);
        repository.saveInventory(filePath, inventories);

        log.info("InventoryService updated inventory with id {}", inventory.getId());
    }

    public void deleteInventory(long id) throws IOException {
        List<Inventory> inventories = repository.getAlLInventories(filePath);

        repository.deleteInventory(inventories, id);
        repository.saveInventory(filePath, inventories);
    }
}
