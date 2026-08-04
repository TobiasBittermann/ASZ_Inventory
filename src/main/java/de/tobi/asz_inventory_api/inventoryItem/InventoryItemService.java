package de.tobi.asz_inventory_api.inventoryItem;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class InventoryItemService {

    private final InventoryItemCsvRepository repository;
    private final String filePath;
    private static final Logger log = LoggerFactory.getLogger(InventoryItemService.class);

    public InventoryItemService(InventoryItemCsvRepository repository, @Value("CSV/inventoryitems.csv") String filePath) {
        this.repository = repository;
        this.filePath = filePath;
    }

    public List<InventoryItem> getAllInventoryItems() throws IOException {
        List<InventoryItem> inventoryItems = repository.getAllInventories(filePath);
        log.debug("InventoryService loaded {} items.", inventoryItems.size());

        return inventoryItems;
    }

    public void addInventoryItem(InventoryItem item) throws IOException {
        List<InventoryItem> inventoryItems = repository.getAllInventories(filePath);

        long nextId = inventoryItems.stream()
                .mapToLong(InventoryItem::getId)
                .max()
                .orElse(0) + 1;

        item.setId(nextId);

        repository.addInventory(inventoryItems, item);
        repository.saveInventories(filePath, inventoryItems);

        log.info("InventoryService added item {} with id {}.", item.getName(), item.getId());
    }

    public void updateInventoryItem(long id, InventoryItem item) throws IOException {
        List<InventoryItem> inventoryItems = repository.getAllInventories(filePath);

        item.setId(id);

        repository.updateInventory(inventoryItems, item);
        repository.saveInventories(filePath, inventoryItems);

        log.info("InventoryService updated item {} with id {}.", item.getName(), item.getId());
    }

    public void deleteInventoryItem(long id) throws IOException {
        List<InventoryItem> inventoryItems = repository.getAllInventories(filePath);

        InventoryItem item = inventoryItems.stream().filter(i -> i.getId() == id).findAny().orElseThrow();

        repository.deleteInventory(inventoryItems, id);
        repository.saveInventories(filePath, inventoryItems);

        log.info("InventoryService deleted item {} with id {}.", item.getName(), item.getId());
    }
}
