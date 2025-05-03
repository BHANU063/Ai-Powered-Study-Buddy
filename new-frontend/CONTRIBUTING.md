# Contributing to StudyBuddy

Thank you for your interest in contributing to StudyBuddy! This guide will help you (or anyone) get the project running on your laptop and start contributing.

---

## 🚀 Getting Started (Step-by-Step)

### 1. **Prerequisites**
- **Git** installed ([Download here](https://git-scm.com/downloads))
- **Node.js** (v18 or higher recommended) & **npm** ([Download here](https://nodejs.org/))
- **Java JDK** (v17 or higher recommended) ([Download here](https://adoptopenjdk.net/))

---

### 2. **Clone the Repository**
Open your terminal and run:
```bash
git clone https://github.com/BHANU063/Ai-Powered-Study-Buddy.git
cd Ai-Powered-Study-Buddy
```

---

### 3. **Frontend Setup (React + Vite)**
```bash
cd new-frontend
npm install
npm run dev
```
- This will start the frontend on [http://localhost:5173](http://localhost:5173)

---

### 4. **Backend Setup (Java)**
- Open a new terminal window/tab.
- Make sure you are in the project root (`Ai-Powered-Study-Buddy`).
- If you use Maven:
```bash
mvn clean install
mvn spring-boot:run
```
- If you use Gradle (if applicable):
```bash
gradle build
gradle bootRun
```
- The backend will start on [http://localhost:8080](http://localhost:8080) (or as configured).

---

### 5. **Configuration**
- If you need to change ports or database settings, check the backend's `application.properties` or `application.yml` file (usually in `src/main/resources`).
- For environment variables, create a `.env` file if needed (see `.env.example` if present).

---

### 6. **Troubleshooting**
- **Port already in use?** Change the port in the config or stop the other app using it.
- **Dependency errors?**
  - For frontend: run `npm install` again.
  - For backend: run `mvn clean install` or `gradle build` again.
- **Java version issues?** Make sure you have JDK 17+ and your `JAVA_HOME` is set.
- **Still stuck?** Open an issue on GitHub or contact the maintainer.

---

## 🛠️ How to Contribute
1. **Fork this repo** (top right on GitHub)
2. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b my-feature
   ```
3. **Make your changes** and **commit**:
   ```bash
   git add .
   git commit -m "Describe your change"
   ```
4. **Push to your fork**:
   ```bash
   git push origin my-feature
   ```
5. **Open a Pull Request** on GitHub

---

## 🙏 Thanks for contributing!
If you have any questions, feel free to open an issue or reach out. 