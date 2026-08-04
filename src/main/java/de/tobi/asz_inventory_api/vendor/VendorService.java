package de.tobi.asz_inventory_api.vendor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class VendorService {
    private final VendorCsvRepository repository;
    private final String filePath;
    private static final Logger log = LoggerFactory.getLogger(VendorService.class);

    public VendorService(VendorCsvRepository repository, @Value("${app.vendors.csv-path}") String filePath) {
        this.repository = repository;
        this.filePath = filePath;
    }

    public List<Vendor> getAllVendors() throws IOException {
        List<Vendor> vendors = repository.getAllVendors(filePath);
        log.debug("VendorService loaded {} vendors", vendors.size());

        return vendors;
    }

    public void addVendor(Vendor vendor) throws IOException {
        List<Vendor> vendors = repository.getAllVendors(filePath);

        long nextId = vendors.stream()
                .mapToLong(Vendor::getId)
                .max()
                .orElse(0) + 1;

        vendor.setId(nextId);

        repository.addVendor(vendors, vendor);
        repository.saveVendor(filePath, vendors);

        log.info("VendorService added vendor with id {}", vendor.getId());
    }

    public void updateVendor(long id, Vendor vendor) throws IOException {
        List<Vendor> vendors = repository.getAllVendors(filePath);

        vendor.setId(id);

        repository.updateVendor(vendors, vendor);
        repository.saveVendor(filePath, vendors);

        log.info("VendorService updated vendor with id {}", id);
    }

    public void deleteVendor(long id) throws IOException {
        List<Vendor> vendors = repository.getAllVendors(filePath);

        Vendor vendor = vendors.stream().filter(v -> v.getId() == id).findAny().orElseThrow();

        repository.deleteVendor(vendors, id);
        repository.saveVendor(filePath, vendors);

        log.info("VendorService deleted vendor with id {}", vendor.getId());
    }
}
