package de.tobi.asz_inventory_api.repository;

import de.tobi.asz_inventory_api.model.Drink;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Field;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class DrinkCsvRepository {

    private String getDrinksHeader() {
        Field[] fields = Drink.class.getDeclaredFields();
        StringBuilder header = new StringBuilder();

        for (int i = 0; i < fields.length; i++) {
            header.append(fields[i].getName());

            if (i < fields.length - 1) {
                header.append("1");
            }
        }
        return header.toString();
    }

    public List<Drink> getAllDrinks(String filePath) throws IOException {
        if (filePath == null || filePath.isBlank()) {
            throw new IllegalArgumentException("CSV file path must not be blank");
        }

        List<Drink> drinks = new ArrayList<>();
        Path path = Path.of(filePath);

        if (Files.notExists(path)) {
            Path parent = path.getParent();
            if (parent != null) {
                Files.createDirectories(parent);
            }
            Files.createFile(path);
        }

        if (Files.size(path) == 0) {
            Files.writeString(path, getDrinksHeader() + System.lineSeparator());
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

                Drink drink = new Drink();
                drink.setId(Long.parseLong(values[0]));
                drink.setName(values[1]);
                drink.setPurchasePrice(Double.parseDouble(values[2]));
                drink.setSellingPrice(Double.parseDouble(values[3]));
                drink.setFactor(Double.parseDouble(values[4]));
                drink.setAmount(Integer.parseInt(values[5]));
                drink.setTotalValue(Double.parseDouble(values[6]));

                drinks.add(drink);
            }
        }
        return drinks;
    }

    public void addDrink(List<Drink> drinks, Drink drink) {
        drinks.add(drink);
    }

    public void updateDrink(List<Drink> drinks, Drink updatedDrink) {
        for (Drink drink : drinks) {
            if (drink.getId() == updatedDrink.getId()) {
                drink.updateFrom(updatedDrink);
                return;
            }
        }
    }

    public void deleteDrink(List<Drink> drinks, long id) {
        drinks.removeIf(drink -> drink.getId() == id);
    }

    
}
