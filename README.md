# Lernsoftware dynamische Programmierung

Diese Lernsoftware ist ein interaktives Tool zum Vertiefen der dynamischen Programmierung. Entwickelt mit Tauri, React und Typescript, zielt diese App darauf ab, Studierenden und Programmier-Enthusiasten ein tieferes Verständnis der dynamischen Programmierung zu vermitteln. Die Software visualisiert dabei den Aufbau von Rekursionsbäumen (Top-Down, Top-Down mit Memoisierung) und Bottom-Up-Lösungen, um die Konzepte klar und verständlich zu machen.

Die App ist begleitend zum Kurs "Grundlagen der Informatik 2" der Fernuniversität Hagen konzipiert. Es ist jedoch natürlich keine Voraussetzung, Student der Fernuniversität zu sein.
Ein einleitendes Quiz prüft auf einen ausreichenden Wissensstand, um die App sinnvoll nutzen zu können.

## Funktionen

- **Visualisierung von Rekursionsbäumen:** Verstehen Sie, wie Top-Down-Ansätze Rekursionsbäume erstellen.
- **Memoisierung und Bottom-Up-Lösungen:** Lernen Sie die Optimierungstechniken der dynamischen Programmierung.
- **Interaktive Beispiele:** Vertiefen Sie Ihr Verständnis durch Beispiele.
- **Cross-Plattform-Kompatibilität:** Verfügbar im Webbrowser (eingeschränkte Funktionalität) oder als Desktop-Anwendung (Windows, Linux & Mac).

## Installation

### Im Browser starten

Besuchen Sie [Link zur Web-App] (lernsoftware-dp.vercel.app), um die Anwendung ohne Aufwand direkt in Ihrem Webbrowser zu starten.

### Desktop-Anwendung

1. Gehen Sie zum `Releases`-Tab im [GitHub-Repository](https://github.com/jan-may/Lernsoftware-DP/releases) der App.
2. Wählen Sie das Release für Ihr Betriebssystem aus.
3. Laden Sie die entsprechende Installationsdatei herunter und folgen Sie den Installationsanweisungen.

## Nutzung

Nach dem Start der App werden Sie durch eine intuitive Benutzeroberfläche geführt, die es Ihnen ermöglicht, verschiedene Aspekte der dynamischen Programmierung zu erforschen. Wählen Sie ein Konzept oder Beispiel aus dem Menü, um mit der Visualisierung zu beginnen.

### Lokale Nutzung

#### Voraussetzungen

- node.js >= 18.0 [node-Download](https://nodejs.org/en/download/)
- rust >= 1.5 [rust-Download](https://www.rust-lang.org/tools/install)

Repository klonen und in das Repository wechseln.

```bash
git clone https://github.com/jan-may/Lernsoftware-DP.git
cd Lernsoftware-DP
```

Node Dependencies installieren.

```bash
npm install
```

Tauri starten. Beim ersten Ausführen werden die Rust Dependencies kompiliert, was etwas dauern kann. Dies gilt jedoch nur für das erste Ausführen.

```bash
npm run tauri dev
```

_Herzlichen Glückwunsch!_ Die native App sollte nun in einem separaten Fenster starten.

---

Für eine lokale Entwicklung ausschließlich im Browser genügt das starten des vite Dev-Servers.

```bash
npm run dev
```

---

Projekt bauen und die plattformspezifische Installationsdatei erhalten.

```bash
npm run tauri build
```

## Beitrag

Ihre Beiträge zur Verbesserung der App sind willkommen. Bitte lesen Sie die `CONTRIBUTING.md` für Details zum Code of Conduct und dem Prozess für das Einreichen von Pull Requests.
Aktuell werden **keine Pull-Request akzeptiert**.
Die App ist Teil meiner Bachelorarbeit und solange diese nicht eingereicht wurde, werden Pull-requests ignoriert.

## Lizenz

Diese Software ist unter der MIT-Lizenz lizenziert. Weitere Informationen finden Sie in der `LICENSE.md`-Datei.

## Kontakt

Für weitere Fragen oder Feedback kontaktieren Sie mich gerne bei Github oder per [Mail](hi@jan-may.dev).

### Empfohlenes IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
