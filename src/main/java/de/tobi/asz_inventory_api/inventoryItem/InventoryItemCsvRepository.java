package de.tobi.asz_inventory_api.inventoryItem;

import org.springframework.stereotype.Repository;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Field;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Repository
public class InventoryItemCsvRepository {

    private String getInventoriesHeader() {
        Field[] fields = InventoryItem.class.getDeclaredFields();
        StringBuilder header = new StringBuilder();

        for (int i = 0; i < fields.length; i++) {
            header.append(fields[i].getName());

            if (i < fields.length - 1) {
                header.append(",");
            }
        }
        return header.toString();
    }

    public List<InventoryItem> getAllInventories(String filePath) throws IOException {
        if (filePath == null || filePath.isBlank()) {
            throw new IllegalArgumentException("CSV file path must not be blank");
        }

        List<InventoryItem> inventoryItems = new ArrayList<>();
        Path path = Path.of(filePath);

        if (Files.notExists(path)) {
            Path parent = path.getParent();
            if (parent != null) {
                Files.createDirectories(parent);
            }
            Files.createFile(path);
        }

        if (Files.size(path) == 0) {
            Files.writeString(path, getInventoriesHeader() + System.lineSeparator());
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(path.toFile()))) {
            String line;
            boolean isFirstLine = true;

            while ((line = reader.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                if (line.isBlank()) {
                    continue;
                }

                String[] values = line.split(",");

                InventoryItem item = new InventoryItem();
                item.setId(Long.parseLong(values[0]));
                item.setName(values[1]);
                item.setAmount(Integer.parseInt(values[2]));

                inventoryItems.add(item);
            }
        }
        return inventoryItems;
    }

    public void addInventory(List<InventoryItem> inventoryItems, InventoryItem item) {
        inventoryItems.add(item);
    }

    public void updateInventory(List<InventoryItem> inventoryItems, InventoryItem updatedItem) {
        for (InventoryItem item : inventoryItems) {
            if (item.getId() == updatedItem.getId()) {
                item.updateFrom(updatedItem);
                return;
            }
        }
    }

    public void deleteInventory(List<InventoryItem> inventoryItems, long id) {
        inventoryItems.removeIf(item -> item.getId() == id);
    }

    public void saveInventories(String filePath, List<InventoryItem> inventoryItems) throws IOException {
        if (filePath == null || filePath.isBlank()) {
            throw new IllegalArgumentException("CSV file path must not be blank");
        }

        Path path = Path.of(filePath);
        Path parent = path.getParent();
        if (parent != null) {
            Files.createDirectories(parent);
        }
        if (Files.notExists(path)) {
            Files.createFile(path);
        }

        StringBuilder content = new StringBuilder();
        content.append(getInventoriesHeader()).append(System.lineSeparator());

        for (InventoryItem item : inventoryItems) {
            content.append(item.getId()).append(",")
                    .append(item.getName()).append(",")
                    .append(item.getAmount())
                    .append(System.lineSeparator());
        }

        Files.writeString(path, content.toString());
    }
}
