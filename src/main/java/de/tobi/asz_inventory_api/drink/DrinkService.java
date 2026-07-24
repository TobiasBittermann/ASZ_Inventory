package de.tobi.asz_inventory_api.drink;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class DrinkService {

    private final DrinkCsvRepository repository;
    private String filePath;

    public DrinkService(DrinkCsvRepository repository, @Value("${app.drinks.csv-path}") String filePath){
        this.repository = repository;
        this.filePath = filePath;
    }

    public List<Drink> getAllDrinks() throws IOException{
        return repository.getAllDrinks(filePath);
    }

    public void addDrink(Drink drink) throws IOException{
        List<Drink> drinks = repository.getAllDrinks(filePath);

        long nextId = drinks.stream()
                .mapToLong(Drink::getId)
                .max()
                .orElse(0) + 1;

        drink.setId(nextId);

        repository.addDrink(drinks, drink);
        repository.saveDrinks(filePath, drinks);
    }

    public void updateDrink(long id, Drink drink) throws IOException {
        List<Drink> drinks = repository.getAllDrinks(filePath);

        drink.setId(id);

        repository.updateDrink(drinks, drink);
        repository.saveDrinks(filePath, drinks);
    }

    public void deleteDrink(long id) throws IOException {
        List<Drink> drinks = repository.getAllDrinks(filePath);

        repository.deleteDrink(drinks ,id);
        repository.saveDrinks(filePath, drinks);
    }
}
