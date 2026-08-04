package de.tobi.asz_inventory_api.inventoryItem;

import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
public class InventoryItemController {

    private final InventoryItemService inventoryService;

    public InventoryItemController(InventoryItemService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping("/inventoryitems")
    public List<InventoryItem> getAllInventoryItems() throws IOException {
        return inventoryService.getAllInventoryItems();
    }

    @PostMapping("/inventoryitems")
    public void addInventoryItem(@RequestBody InventoryItem item) throws IOException {
        inventoryService.addInventoryItem(item);
    }

    @PutMapping("/inventoryitems/{id}")
    public void updateInventoryItem(@PathVariable long id, @RequestBody InventoryItem item) throws IOException {
        inventoryService.updateInventoryItem(id, item);
    }

    @DeleteMapping("/inventoryitems/{id}")
    public void deleteInventory(@PathVariable long id) throws IOException {
        inventoryService.deleteInventoryItem(id);
    }
}
