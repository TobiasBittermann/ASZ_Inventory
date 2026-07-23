# ASZ Inventory Cheat Sheet

## Ziel des Projekts

- **Backend:** Java + Spring Boot
- **Frontend:** React + Vite
- **Datenquelle:** `CSV\members.csv`
- **Funktionalität:** Members anzeigen, hinzufügen, bearbeiten, löschen

---

## Architektur

### Backend

- `model\Member.java`  
  Datenmodell

- `repository\MemberCsvRepository.java`  
  Liest und schreibt die CSV

- `controller\MemberController.java`  
  Stellt die HTTP-Endpunkte für React bereit

### Frontend

- `pages\HomePage.jsx`  
  Startseite

- `pages\MembersPage.jsx`  
  Members-Tabelle + Button-Logik

- `components\member\MemberAddEdit.jsx`  
  Gemeinsames Modal für Add und Edit

---

## Wichtige Grundideen

### Java

- `String` kann `null` sein
- `List<Member>` ist nur der Typ, echte Liste mit `new ArrayList<>()`
- Exceptions:
  - `catch` = hier behandeln
  - `throws` = nach oben weitergeben

### Repository

Repository ist **kein Java-Feature**, sondern ein Pattern.

Es kapselt den Datenzugriff:

- laden
- speichern
- add
- update
- delete

### CSV-Ansatz

CSV wird nicht sauber "in place" bearbeitet. Normaler Weg:

1. alles laden
2. Liste im Speicher ändern
3. komplette Datei neu speichern

---

## Projektstruktur

```text
ASZ_Inventory
├─ CSV
│  └─ members.csv
├─ frontend
│  ├─ package.json
│  └─ src
│     ├─ components
│     │  └─ member
│     │     └─ MemberAddEdit.jsx
│     ├─ pages
│     │  ├─ HomePage.jsx
│     │  └─ MembersPage.jsx
│     ├─ App.jsx
│     └─ main.jsx
├─ pom.xml
└─ src
   └─ main
      ├─ java
      │  └─ de\tobi\asz_inventory_api
      │     ├─ AszInventoryApiApplication.java
      │     ├─ controller
      │     │  └─ MemberController.java
      │     ├─ model
      │     │  └─ Member.java
      │     └─ repository
      │        └─ MemberCsvRepository.java
      └─ resources
         └─ application.properties
```

---

## Neues Projekt Schritt für Schritt

## 1. Spring Boot Backend anlegen

Mit `start.spring.io`:

- Project: **Maven**
- Language: **Java**
- Dependency: **Spring Web**
- Java: **17+**

Wichtig:

- `src\main\java` muss **Source Root** sein
- Package-Namen ohne `main.java...`

Beispiel:

```java
package de.tobi.asz_inventory_api;
```

---

## 2. Model anlegen

Beispiel:

```java
public class Member {
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private double balance;
}
```

Dazu Getter und Setter.

---

## 3. CSV-Repository bauen

Aufgaben:

- Datei anlegen, falls sie fehlt
- Header schreiben
- Members aus CSV lesen
- Liste wieder in CSV speichern

Wichtige Methoden:

```java
public List<Member> getAllMembers(String filePath) throws IOException
public void addMember(List<Member> members, Member member)
public void updateMember(List<Member> members, Member updatedMember)
public void deleteMember(List<Member> members, long id)
public void saveMembers(String filePath, List<Member> members) throws IOException
```

---

## 4. Spring Controller bauen

Der Controller ist die HTTP-Schnittstelle für React.

Typische Endpunkte:

```java
@GetMapping("/members")
@PostMapping("/members")
@PutMapping("/members/{id}")
@DeleteMapping("/members/{id}")
```

Wichtig für React:

```java
@CrossOrigin(origins = "http://localhost:5173")
```

Wenn CORS zickt: **Backend neu starten**.

---

## 5. React Frontend anlegen

Node.js installieren, dann:

```powershell
npm create vite@latest frontend
cd frontend
npm install
npm run dev
```

Zusätzlich:

```powershell
npm install react-router-dom
```

---

## 6. Routing einrichten

`App.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MembersPage from "./pages/MembersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/members" element={<MembersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

`HomePage.jsx`:

```jsx
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <p>Hello friend!</p>
      <Link to="/members">
        <button type="button">Members</button>
      </Link>
    </div>
  );
}

export default HomePage;
```

---

## 7. Members laden

`MembersPage.jsx`:

```jsx
const [members, setMembers] = useState([]);

function loadMembers() {
  fetch("http://localhost:8080/members")
    .then((response) => response.json())
    .then((data) => setMembers(data));
}

useEffect(() => {
  loadMembers();
}, []);
```

---

## 8. Tabelle anzeigen

```jsx
<table>
  <thead>
    <tr>
      <th>Id</th>
      <th>Vorname</th>
      <th>Nachname</th>
      <th>E-Mail</th>
      <th>Kontostand</th>
    </tr>
  </thead>
  <tbody>
    {members.map((member) => (
      <tr key={member.id}>
        <td>{member.id}</td>
        <td>{member.firstName}</td>
        <td>{member.lastName}</td>
        <td>{member.email}</td>
        <td>{member.balance}</td>
      </tr>
    ))}
  </tbody>
</table>
```

---

## 9. Modal für Add/Edit

Ein Modal ist in React einfach:

- eigener Component
- `isModalOpen` State
- bedingtes Rendern

Beispiel:

```jsx
{isModalOpen && (
  <MemberAddEdit
    member={selectedMember}
    onClose={() => setIsModalOpen(false)}
    onSave={handleSaveMember}
  />
)}
```

---

## 10. Add und Edit mit einem Modal

State in `MembersPage.jsx`:

```jsx
const [selectedMember, setSelectedMember] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
```

### Add

```jsx
function handleAddClick() {
  setSelectedMember(null);
  setIsModalOpen(true);
}
```

### Edit

```jsx
function handleEditClick(member) {
  setSelectedMember(member);
  setIsModalOpen(true);
}
```

### Modal unterscheiden

Im Modal:

```jsx
<h2>{member ? "Edit Member" : "Add Member"}</h2>
```

Felder vorbelegen:

```jsx
useEffect(() => {
  if (member) {
    setFirstName(member.firstName);
    setLastName(member.lastName);
    setEmail(member.email);
    setBalance(member.balance);
  } else {
    setFirstName("");
    setLastName("");
    setEmail("");
    setBalance("");
  }
}, [member]);
```

---

## 11. Save-Logik für Add + Edit

```jsx
async function handleSaveMember(member) {
  const isEditMode = member.id && member.id > 0;

  const url = isEditMode
    ? `http://localhost:8080/members/${member.id}`
    : "http://localhost:8080/members";

  const method = isEditMode ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(member)
  });

  if (!response.ok) {
    throw new Error("Member could not be saved!");
  }

  await loadMembers();
}
```

---

## 12. Delete

Frontend:

```jsx
async function handleDeleteMember(id) {
  const response = await fetch(`http://localhost:8080/members/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Member could not be deleted!");
  }

  await loadMembers();
}
```

Backend:

```java
@DeleteMapping("/members/{id}")
public void deleteMember(@PathVariable long id) throws IOException {
    List<Member> members = repository.getAllMembers(filePath);

    repository.deleteMember(members, id);
    repository.saveMembers(filePath, members);
}
```

Wichtig: Bei `DELETE` **kein** `@RequestBody Member member`, wenn keiner gesendet wird.

---

## Unterschiede, die wichtig waren

## C# vs Java

- `typeof(Member)` in Java:

```java
Member.class
```

- Klassenname als String:

```java
Member.class.getSimpleName()
```

- `async/await` gibt es nicht direkt wie in C#
- Für Async in Java eher `CompletableFuture`

## Python vs Java Datei-Zugriff

Python:

```python
with open(...)
```

Java:

```java
try (BufferedReader reader = ...) {
}
```

---

## React Basics, die wichtig waren

- `App.jsx` bleibt der technische Einstieg
- Seiten liegen unter `src\pages`
- wiederverwendbare UI unter `src\components`
- `Link` braucht immer:

```jsx
import { Link } from "react-router-dom";
```

- Komponente exportieren:

```jsx
export default HomePage;
```

- Props weitergeben:

```jsx
<MemberAddEdit member={selectedMember} onSave={handleSaveMember} />
```

- Funktionen **übergeben**, nicht direkt aufrufen:

Richtig:

```jsx
onSave={handleSaveMember}
```

Falsch:

```jsx
onSave={handleSaveMember()}
```

---

## Typische Fehler aus dem Projekt

- `react-router-dom` im falschen Ordner installiert
- `Link` nicht importiert
- `export default` vergessen
- Route `/member` und Link `/members` verwechselt
- Save-Button außerhalb des `<form>`
- `onSave={handleSaveMember()}` statt `onSave={handleSaveMember}`
- CORS-Fehler nach Backend-Änderung -> **Spring neu starten**
- `DELETE` mit unnötigem `@RequestBody`
- `main.java...` versehentlich im Package-Namen

---

## Starten des Projekts

### Backend

Spring Boot Startklasse ausführen:

```java
AszInventoryApiApplication
```

Backend läuft auf:

```text
http://localhost:8080
```

### Frontend

Im `frontend`-Ordner:

```powershell
npm run dev
```

Frontend läuft auf:

```text
http://localhost:5173
```

Beide müssen parallel laufen.

---

## Wenn ich das Projekt neu bauen würde

1. Spring Boot Projekt anlegen
2. `Member` Modell anlegen
3. CSV-Repository bauen
4. `GET /members` testen
5. React mit Vite anlegen
6. Router einbauen
7. `HomePage` und `MembersPage` anlegen
8. Members per `fetch` laden
9. Tabelle anzeigen
10. Add-Modal bauen
11. `POST /members`
12. Edit mit gleichem Modal
13. `PUT /members/{id}`
14. Delete Button
15. `DELETE /members/{id}`

---

## Späterer Ausbau

- PostgreSQL statt CSV
- Repository austauschen
- evtl. `Service`-Schicht einziehen
- Validierung
- schöneres Modal / Styling
- echtes DataGrid
- Fehleranzeigen im UI

