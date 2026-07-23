package de.tobi.asz_inventory_api.repository;

import de.tobi.asz_inventory_api.model.Member;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class MemberCsvRepository {

    public List<Member> getAllMembers(String filePath) throws IOException {

        if (filePath == null || filePath.isBlank()) {
            throw new IllegalArgumentException("CSV file path must not be blank");
        }

        List<Member> members = new ArrayList<>();
        Path path = Path.of(filePath);

        if (Files.notExists(path)) {
            Path parent = path.getParent();
            if (parent != null) {
                Files.createDirectories(parent);
            }
            Files.createFile(path);
        }

        if (Files.size(path) == 0) {
            Files.writeString(path, getMemberHeader() + System.lineSeparator());
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

                Member member = new Member();
                member.setId(Long.parseLong(values[0]));
                member.setFirstName(values[1]);
                member.setLastName(values[2]);
                member.setEmail(values[3]);
                member.setBalance(Double.parseDouble(values[4]));

                members.add(member);
            }
        }

        return members;
    }

    public void addMember(List<Member> members, Member member) {
        members.add(member);
    }

    public void updateMember(List<Member> members, Member updatedMember) {
        for (Member member : members) {
            if (member.getId() == updatedMember.getId()) {
                member.updateFrom(updatedMember);
                return;
            }
        }
    }

    public void deleteMember(List<Member> members, long id) {
        members.removeIf(member -> member.getId() == id);
    }

    private String getMemberHeader() {
        Field[] fields = Member.class.getDeclaredFields();
        StringBuilder header = new StringBuilder();

        for (int i = 0; i < fields.length; i++) {
            header.append(fields[i].getName());

            if (i < fields.length - 1) {
                header.append(",");
            }
        }
        return header.toString();
    }

    public void saveMembers(String filePath, List<Member> members) throws IOException {
        if (filePath == null || filePath.isBlank()) {
            throw new IllegalArgumentException("CSV file path must not be blank");
        }

        Path path = Path.of(filePath);
        Path parent = path.getParent();
        if (parent != null) {
            Files.createDirectories((parent));
        }

        StringBuilder content = new StringBuilder();
        content.append(getMemberHeader()).append(System.lineSeparator());

        for (Member member : members) {
            content.append(member.getId()).append(",")
                    .append(member.getFirstName()).append(",")
                    .append(member.getLastName()).append(",")
                    .append(member.getEmail()).append(",")
                    .append(member.getBalance())
                    .append(System.lineSeparator());
        }

        Files.writeString(path, content.toString());
    }
}

