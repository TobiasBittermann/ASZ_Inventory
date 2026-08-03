package de.tobi.asz_inventory_api.drink;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class DrinkService {

    private final DrinkCsvRepository repository;
    private final String filePath;
    private static final Logger log = LoggerFactory.getLogger(DrinkService.class);

    public DrinkService(DrinkCsvRepository repository, @Value("${app.drinks.csv-path}") String filePath){
        this.repository = repository;
        this.filePath = filePath;
    }

    public List<Drink> getAllDrinks() throws IOException{
        List<Drink> drinks = repository.getAllDrinks(filePath);
        log.debug("DrinkService loaded {} drinks.", drinks.size());

        return drinks;
    }

    public void addDrink(Drink drink) throws IOException{
        List<Drink> drinks = repository.getAllDrinks(filePath);

        long nextId = drinks.stream()
                .mapToLong(Drink::getId)
                .max()
                .orElse(0) + 1;

        drink.setId(nextId);

        calculateSellingPrice(drink);
        calculateTotalValue(drink);

        repository.addDrink(drinks, drink);
        repository.saveDrinks(filePath, drinks);

        log.info("DrinkService added drink {} with id {}.", drink.getName(), drink.getId());
    }

    public void updateDrink(long id, Drink drink) throws IOException {
        List<Drink> drinks = repository.getAllDrinks(filePath);

        drink.setId(id);

        calculateSellingPrice(drink);
        calculateTotalValue(drink);

        repository.updateDrink(drinks, drink);
        repository.saveDrinks(filePath, drinks);

        log.info("DrinkService updated drink {} with id {}.", drink.getName(), drink.getId());
    }

    public void deleteDrink(long id) throws IOException {
        List<Drink> drinks = repository.getAllDrinks(filePath);

        Drink drink = drinks.stream().filter(d -> d.getId() == id).findAny().orElseThrow();

        repository.deleteDrink(drinks ,id);
        repository.saveDrinks(filePath, drinks);

        log.info("DrinkService deleted drink {} with id {}.", drink.getName(), drink.getId());
    }

    private void calculateSellingPrice(Drink drink){
        drink.setSellingPrice(drink.getPurchasePrice() * drink.getFactor());
    }

    private void calculateTotalValue(Drink drink){
        drink.setTotalValue(drink.getPurchasePrice() * drink.getAmount());
    }
}
