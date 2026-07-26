package de.tobi.asz_inventory_api.member;

import java.io.IOException;
import java.util.List;

import de.tobi.asz_inventory_api.drink.DrinkService;
import org.springframework.web.bind.annotation.*;

@RestController
public class MemberController {

    private final MemberService memberService;
    private final DrinkService drinkService;

    public MemberController(MemberService memberService, DrinkService drinkService) {
        this.memberService = memberService;
        this.drinkService = drinkService;
    }

    @GetMapping("/members")
    public List<Member> getAllMembers() throws IOException {
        return memberService.getAllMembers();
    }

    @PostMapping("/members")
    public void addMember(@RequestBody Member member) throws IOException {
        memberService.addMember(member);
    }

    @PutMapping("/members/{id}")
    public void updateMember(@PathVariable long id, @RequestBody Member member) throws IOException {
        memberService.updateMember(id, member);
    }

    @DeleteMapping("/members/{id}")
    public void deleteMember(@PathVariable long id) throws IOException {
        memberService.deleteMember(id);
    }
}
