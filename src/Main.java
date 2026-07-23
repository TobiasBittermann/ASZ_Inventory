import Bierwart.ViewModel.BierWartViewModel;

import java.io.IOException;

public class Main{
    public static void main(String[] args){
        try {
            BierWartViewModel viewModel = new BierWartViewModel();
            viewModel.initializeViewModel();
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }
}
