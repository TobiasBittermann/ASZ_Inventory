package de.tobi.asz_inventory_api.controller;

import de.tobi.asz_inventory_api.model.Drink;
import de.tobi.asz_inventory_api.repository.DrinkCsvRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
public class DrinkController {
    private final DrinkCsvRepository repository = new DrinkCsvRepository();
    @Value("CSV/drinks.csv")
    private String filePath;

    @GetMapping("/drinks")
    public List<Drink> getAllDrinks() throws IOException {
        return repository.getAllDrinks(filePath);
    }

    @PostMapping("/drinks")
    public void addDrink(@RequestBody Drink drink) throws IOException {
        List<Drink> drinks = repository.getAllDrinks(filePath);

        long nextId = drinks.stream()
                .mapToLong(Drink::getId)
                .max()
                .orElse(0) + 1;

        drink.setId(nextId);

        repository.addDrink(drinks, drink);
        repository.saveDrinks(filePath, drinks);
    }

    @PutMapping("/drinks/{id}")
    public void updateDrink(@PathVariable long id, @RequestBody Drink drink) throws IOException {
        List<Drink> drinks = repository.getAllDrinks(filePath);

        drink.setId(id);

        repository.updateDrink(drinks, drink);
        repository.saveDrinks(filePath, drinks);
    }

    @DeleteMapping("/drinks/{id}")
    public void deleteDrink(@PathVariable long id) throws IOException {
        List<Drink> drinks = repository.getAllDrinks(filePath);

        repository.deleteDrink(drinks ,id);
        repository.saveDrinks(filePath, drinks);
    }
}
