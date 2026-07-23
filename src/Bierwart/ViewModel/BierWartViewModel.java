package Bierwart.ViewModel;
import Bierwart.Model.Member;
import Bierwart.Repositories.MemberCsvRepository;
import Bierwart.ViewModel.Interfaces.BierWartViewModelContract;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class BierWartViewModel implements BierWartViewModelContract {
    //Properties
    private List<Member> members = new ArrayList<>();
    private boolean initialized = false;
    MemberCsvRepository repository = new MemberCsvRepository();

    //Constructor
    public BierWartViewModel() {
    }

    //Getter/Setter
    public List<Member> getMembers() {
        return members;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }

    public boolean isInitialized() {
        return initialized;
    }

    public void setInitialized(boolean initialized) {
        this.initialized = initialized;
    }

    //Methods
    public void initializeViewModel() throws IOException {
        //Update data
        updateData(null);

        //Set initialized flag
        initialized = true;
    }

    public void updateData(String entityClass) throws IOException {

        //TODO: load data
        if(entityClass == null || entityClass.equals(Member.class.getSimpleName())){

            members = repository.getAllMembers("CSV/members.csv");
        }
    }
}
