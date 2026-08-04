package de.tobi.asz_inventory_api.vendor;

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
public class VendorCsvRepository {

    private String getVendorsHeader() {
        Field[] fields = Vendor.class.getDeclaredFields();
        StringBuilder header = new StringBuilder();

        for (int i = 0; i < fields.length; i++) {
            header.append(fields[i].getName());

            if (i < fields.length - 1) {
                header.append(",");
            }
        }
        return header.toString();
    }

    public List<Vendor> getAllVendors(String filePath) throws IOException {
        if (filePath == null || filePath.isBlank()) {
            throw new IllegalArgumentException("CSV file path must not be blank.");
        }

        List<Vendor> vendors = new ArrayList<>();
        Path path = Path.of(filePath);

        if (Files.notExists(path)) {
            Path parent = path.getParent();
            if (parent != null) {
                Files.createDirectories(parent);
            }
            Files.createFile(path);
        }

        if (Files.size(path) == 0) {
            Files.writeString(path, getVendorsHeader() + System.lineSeparator());
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

                Vendor vendor = new Vendor();
                vendor.setId(Long.parseLong(values[0]));
                vendor.setName(values[1]);
                vendor.setContactPerson(values[2]);
                vendor.setAddress(values[3]);
                vendor.setIban(values[4]);

                vendors.add(vendor);
            }
            return vendors;
        }
    }

    public void addVendor(List<Vendor> vendors, Vendor vendor) {
        vendors.add(vendor);
    }

    public void updateVendor(List<Vendor> vendors, Vendor updatedVendor) {
        for (Vendor vendor : vendors) {
            if (vendor.getId() == updatedVendor.getId()) {
                vendor.updateFrom(updatedVendor);
                return;
            }
        }
    }

    public void deleteVendor(List<Vendor> vendors, long id) {
        vendors.removeIf(vendor -> vendor.getId() == id);
    }

    public void saveVendor(String filePath, List<Vendor> vendors) throws IOException {
        if (filePath == null || filePath.isBlank()) {
            throw new IllegalArgumentException("CSV path must not be blank");
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
        content.append(getVendorsHeader()).append(System.lineSeparator());

        for (Vendor vendor : vendors) {
            content.append(vendor.getId()).append(",")
                    .append(vendor.getName()).append(",")
                    .append(vendor.getContactPerson()).append(",")
                    .append(vendor.getAddress()).append(",")
                    .append(vendor.getIban())
                    .append(System.lineSeparator());
        }

        Files.writeString(path, content.toString());
    }
}
