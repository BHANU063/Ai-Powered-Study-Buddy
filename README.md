# Study Buddy

A comprehensive study tool for students that helps with note-taking, flashcards, to-do lists, and time management.

## Features

- **Notes Management**
  - Create and edit text notes
  - Upload and parse PDF/TXT files
  - Search through notes
  - Organize notes by user

- **Flashcards**
  - Create and manage flashcards
  - Review system with spaced repetition
  - Track review history

- **To-Do List**
  - Create and manage tasks
  - Mark tasks as completed
  - Filter by completion status
  - Set due dates

- **Timer**
  - Pomodoro-style timer
  - Customizable duration
  - Start, pause, and reset functionality

- **User Management**
  - Create user accounts
  - Login/logout functionality
  - User-specific data storage

- **Theme Support**
  - Light and dark themes
  - Modern, clean interface

## Prerequisites

- Java 17 or later
- Maven 3.6 or later
- PostgreSQL 12 or later

## Setup

1. **Database Setup**
   ```sql
   CREATE DATABASE studybuddy;
   ```

2. **Database Configuration**
   Edit `src/main/resources/hibernate.cfg.xml` to match your PostgreSQL configuration:
   ```xml
   <property name="hibernate.connection.url">jdbc:postgresql://localhost:5432/studybuddy</property>
   <property name="hibernate.connection.username">your_username</property>
   <property name="hibernate.connection.password">your_password</property>
   ```

3. **Build and Run**
   ```bash
   mvn clean install
   mvn javafx:run
   ```

## Usage

1. **Create a User Account**
   - Click "File" → "New User"
   - Enter username and password

2. **Login**
   - Click "File" → "Login"
   - Enter your credentials

3. **Notes**
   - Create new notes with "New Note" button
   - Upload files with "Upload File" button
   - Search notes using the search field

4. **Flashcards**
   - Create flashcards with "New Flashcard" button
   - Review flashcards with "Start Review" button

5. **To-Do List**
   - Add tasks with "New Task" button
   - Filter tasks by completion status
   - Mark tasks as completed

6. **Timer**
   - Set duration in minutes
   - Use start, pause, and reset buttons

7. **Themes**
   - Switch between light and dark themes in the "View" menu

## Development

The project uses:
- JavaFX for the UI
- Hibernate for database operations
- PostgreSQL for data storage
- Apache Tika for file parsing

## License

This project is licensed under the MIT License - see the LICENSE file for details. 