package com.studybuddy.controller;

import com.studybuddy.model.*;
import com.studybuddy.dao.*;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.stage.FileChooser;
import javafx.stage.Modality;
import javafx.stage.Stage;
import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.atomic.AtomicInteger;

public class MainController {
    @FXML private TabPane mainTabPane;
    @FXML private ListView<Note> notesListView;
    @FXML private ListView<Flashcard> flashcardsListView;
    @FXML private ListView<TodoItem> todoListView;
    @FXML private TextField searchField;
    @FXML private Label timerLabel;
    @FXML private TextField timerDuration;
    @FXML private Label statusLabel;
    @FXML private Label buddyNameLabel;
    @FXML private Button startTimerButton;
    @FXML private Button stopTimerButton;
    @FXML private Button quizButton;
    @FXML private Button gameButton;

    private User currentUser;
    private final UserDAO userDAO = new UserDAO();
    private final NoteDAO noteDAO = new NoteDAO();
    private final FlashcardDAO flashcardDAO = new FlashcardDAO();
    private final TodoItemDAO todoItemDAO = new TodoItemDAO();
    private final Tika tika = new Tika();
    private Timer timer;
    private AtomicInteger remainingSeconds;
    private String buddyName = "Study Buddy";

    @FXML
    private void initialize() {
        buddyNameLabel.setText(buddyName);
        stopTimerButton.setDisable(true);
        quizButton.setDisable(true);
        gameButton.setDisable(true);
    }

    @FXML
    private void handleNewUser() {
        TextInputDialog dialog = new TextInputDialog();
        dialog.setTitle("New User");
        dialog.setHeaderText("Create a new user account");
        dialog.setContentText("Please enter your username:");

        Optional<String> result = dialog.showAndWait();
        result.ifPresent(username -> {
            TextInputDialog passwordDialog = new TextInputDialog();
            passwordDialog.setTitle("New User");
            passwordDialog.setHeaderText("Create a new user account");
            passwordDialog.setContentText("Please enter your password:");

            Optional<String> passwordResult = passwordDialog.showAndWait();
            passwordResult.ifPresent(password -> {
                User newUser = new User();
                newUser.setUsername(username);
                newUser.setPassword(password);
                userDAO.createUser(newUser);
                currentUser = newUser;
                updateStatus("New user created: " + username);
                refreshAllLists();
            });
        });
    }

    @FXML
    private void handleLogin() {
        TextInputDialog dialog = new TextInputDialog();
        dialog.setTitle("Login");
        dialog.setHeaderText("Login to your account");
        dialog.setContentText("Please enter your username:");

        Optional<String> result = dialog.showAndWait();
        result.ifPresent(username -> {
            TextInputDialog passwordDialog = new TextInputDialog();
            passwordDialog.setTitle("Login");
            passwordDialog.setHeaderText("Login to your account");
            passwordDialog.setContentText("Please enter your password:");

            Optional<String> passwordResult = passwordDialog.showAndWait();
            passwordResult.ifPresent(password -> {
                if (userDAO.authenticateUser(username, password)) {
                    currentUser = userDAO.getUserByUsername(username);
                    updateStatus("Logged in as: " + username);
                    refreshAllLists();
                } else {
                    showAlert("Login Failed", "Invalid username or password");
                }
            });
        });
    }

    @FXML
    private void handleNewNote() {
        if (currentUser == null) {
            showAlert("Error", "Please login first");
            return;
        }

        TextInputDialog dialog = new TextInputDialog();
        dialog.setTitle("New Note");
        dialog.setHeaderText("Create a new note");
        dialog.setContentText("Please enter the note title:");

        Optional<String> result = dialog.showAndWait();
        result.ifPresent(title -> {
            TextArea textArea = new TextArea();
            textArea.setPrefRowCount(10);
            textArea.setPrefColumnCount(50);

            Dialog<String> contentDialog = new Dialog<>();
            contentDialog.setTitle("New Note");
            contentDialog.setHeaderText("Enter note content");
            contentDialog.getDialogPane().setContent(textArea);
            contentDialog.getDialogPane().getButtonTypes().addAll(ButtonType.OK, ButtonType.CANCEL);

            Optional<String> contentResult = contentDialog.showAndWait();
            contentResult.ifPresent(content -> {
                Note note = new Note();
                note.setTitle(title);
                note.setContent(content);
                note.setUser(currentUser);
                noteDAO.createNote(note);
                refreshNotesList();
            });
        });
    }

    @FXML
    private void handleUploadFile() {
        if (currentUser == null) {
            showAlert("Error", "Please login first");
            return;
        }

        FileChooser fileChooser = new FileChooser();
        fileChooser.setTitle("Select File");
        fileChooser.getExtensionFilters().addAll(
            new FileChooser.ExtensionFilter("Text Files", "*.txt"),
            new FileChooser.ExtensionFilter("PDF Files", "*.pdf")
        );

        File selectedFile = fileChooser.showOpenDialog(mainTabPane.getScene().getWindow());
        if (selectedFile != null) {
            try {
                String content = tika.parseToString(selectedFile);
                Note note = new Note();
                note.setTitle(selectedFile.getName());
                note.setContent(content);
                note.setFilePath(selectedFile.getAbsolutePath());
                note.setUser(currentUser);
                noteDAO.createNote(note);
                refreshNotesList();
                updateStatus("File uploaded successfully: " + selectedFile.getName());
            } catch (IOException | TikaException e) {
                showAlert("Error", "Failed to parse file: " + e.getMessage());
            }
        }
    }

    @FXML
    private void handleSearchNotes() {
        if (currentUser == null) {
            showAlert("Error", "Please login first");
            return;
        }

        String searchTerm = searchField.getText();
        if (!searchTerm.isEmpty()) {
            List<Note> searchResults = noteDAO.searchNotes(currentUser, searchTerm);
            notesListView.getItems().setAll(searchResults);
            updateStatus("Found " + searchResults.size() + " matching notes");
        } else {
            refreshNotesList();
        }
    }

    @FXML
    private void handleNewFlashcard() {
        if (currentUser == null) {
            showAlert("Error", "Please login first");
            return;
        }

        TextInputDialog questionDialog = new TextInputDialog();
        questionDialog.setTitle("New Flashcard");
        questionDialog.setHeaderText("Create a new flashcard");
        questionDialog.setContentText("Please enter the question:");

        Optional<String> questionResult = questionDialog.showAndWait();
        questionResult.ifPresent(question -> {
            TextInputDialog answerDialog = new TextInputDialog();
            answerDialog.setTitle("New Flashcard");
            answerDialog.setHeaderText("Create a new flashcard");
            answerDialog.setContentText("Please enter the answer:");

            Optional<String> answerResult = answerDialog.showAndWait();
            answerResult.ifPresent(answer -> {
                Flashcard flashcard = new Flashcard();
                flashcard.setQuestion(question);
                flashcard.setAnswer(answer);
                flashcard.setUser(currentUser);
                flashcardDAO.createFlashcard(flashcard);
                refreshFlashcardsList();
            });
        });
    }

    @FXML
    private void handleStartReview() {
        if (currentUser == null) {
            showAlert("Error", "Please login first");
            return;
        }

        List<Flashcard> reviewCards = flashcardDAO.getFlashcardsForReview(currentUser);
        if (reviewCards.isEmpty()) {
            showAlert("Review", "No flashcards available for review");
            return;
        }

        // TODO: Implement flashcard review UI
        updateStatus("Starting review with " + reviewCards.size() + " cards");
    }

    @FXML
    private void handleNewTask() {
        if (currentUser == null) {
            showAlert("Error", "Please login first");
            return;
        }

        TextInputDialog dialog = new TextInputDialog();
        dialog.setTitle("New Task");
        dialog.setHeaderText("Create a new task");
        dialog.setContentText("Please enter the task title:");

        Optional<String> result = dialog.showAndWait();
        result.ifPresent(title -> {
            TextArea textArea = new TextArea();
            textArea.setPrefRowCount(5);
            textArea.setPrefColumnCount(50);

            Dialog<String> descriptionDialog = new Dialog<>();
            descriptionDialog.setTitle("New Task");
            descriptionDialog.setHeaderText("Enter task description");
            descriptionDialog.getDialogPane().setContent(textArea);
            descriptionDialog.getDialogPane().getButtonTypes().addAll(ButtonType.OK, ButtonType.CANCEL);

            Optional<String> descriptionResult = descriptionDialog.showAndWait();
            descriptionResult.ifPresent(description -> {
                TodoItem todoItem = new TodoItem();
                todoItem.setTitle(title);
                todoItem.setDescription(description);
                todoItem.setUser(currentUser);
                todoItemDAO.createTodoItem(todoItem);
                refreshTodoList();
            });
        });
    }

    @FXML
    private void handleShowCompleted() {
        if (currentUser == null) {
            showAlert("Error", "Please login first");
            return;
        }

        List<TodoItem> completedItems = todoItemDAO.getCompletedTodoItems(currentUser);
        todoListView.getItems().setAll(completedItems);
        updateStatus("Showing " + completedItems.size() + " completed tasks");
    }

    @FXML
    private void handleShowPending() {
        if (currentUser == null) {
            showAlert("Error", "Please login first");
            return;
        }

        List<TodoItem> pendingItems = todoItemDAO.getPendingTodoItems(currentUser);
        todoListView.getItems().setAll(pendingItems);
        updateStatus("Showing " + pendingItems.size() + " pending tasks");
    }

    @FXML
    private void handleLightTheme() {
        mainTabPane.getScene().getStylesheets().clear();
        mainTabPane.getScene().getStylesheets().add(getClass().getResource("/styles/light-theme.css").toExternalForm());
    }

    @FXML
    private void handleDarkTheme() {
        mainTabPane.getScene().getStylesheets().clear();
        mainTabPane.getScene().getStylesheets().add(getClass().getResource("/styles/dark-theme.css").toExternalForm());
    }

    @FXML
    private void handleAbout() {
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle("About Study Buddy");
        alert.setHeaderText("Study Buddy v1.0");
        alert.setContentText("A comprehensive study tool for students.\n\n" +
                           "Features:\n" +
                           "- Notes and file uploads\n" +
                           "- Flashcards\n" +
                           "- To-do list\n" +
                           "- Pomodoro timer\n" +
                           "- Theme switching");
        alert.showAndWait();
    }

    @FXML
    private void handleExit() {
        System.exit(0);
    }

    @FXML
    private void handleStartTimer() {
        try {
            int minutes = Integer.parseInt(timerDuration.getText());
            if (minutes <= 0) {
                showAlert("Invalid Duration", "Please enter a positive number of minutes");
                return;
            }

            remainingSeconds = new AtomicInteger(minutes * 60);
            updateTimerLabel();

            timer = new Timer();
            timer.scheduleAtFixedRate(new TimerTask() {
                @Override
                public void run() {
                    if (remainingSeconds.decrementAndGet() <= 0) {
                        timer.cancel();
                        javafx.application.Platform.runLater(() -> {
                            showAlert("Timer Complete", "Your study session has ended!");
                            handleStopTimer();
                        });
                    } else {
                        javafx.application.Platform.runLater(() -> updateTimerLabel());
                    }
                }
            }, 1000, 1000);

            startTimerButton.setDisable(true);
            stopTimerButton.setDisable(false);
            timerDuration.setDisable(true);
            updateStatus("Timer started for " + minutes + " minutes");
        } catch (NumberFormatException e) {
            showAlert("Invalid Input", "Please enter a valid number of minutes");
        }
    }

    @FXML
    private void handleStopTimer() {
        if (timer != null) {
            timer.cancel();
            timer = null;
        }
        startTimerButton.setDisable(false);
        stopTimerButton.setDisable(true);
        timerDuration.setDisable(false);
        updateStatus("Timer stopped");
    }

    @FXML
    private void handleStartQuiz() {
        if (currentUser == null) {
            showAlert("Error", "Please login first");
            return;
        }

        List<Flashcard> flashcards = flashcardDAO.getFlashcardsByUser(currentUser);
        if (flashcards.isEmpty()) {
            showAlert("No Flashcards", "Create some flashcards first!");
            return;
        }

        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("/fxml/quiz.fxml"));
            Parent root = loader.load();
            QuizController controller = loader.getController();
            
            Stage stage = new Stage();
            stage.setTitle("Flashcard Quiz");
            stage.setScene(new Scene(root));
            stage.initModality(Modality.APPLICATION_MODAL);
            
            controller.initialize(flashcards, stage);
            stage.showAndWait();
        } catch (IOException e) {
            showAlert("Error", "Failed to start quiz: " + e.getMessage());
        }
    }

    @FXML
    private void handleStartGame() {
        if (currentUser == null) {
            showAlert("Error", "Please login first");
            return;
        }

        // TODO: Implement game UI
        updateStatus("Starting study game");
    }

    @FXML
    private void handleNameBuddy() {
        TextInputDialog dialog = new TextInputDialog(buddyName);
        dialog.setTitle("Name Your Study Buddy");
        dialog.setHeaderText("Give your study buddy a name");
        dialog.setContentText("Enter a name:");

        Optional<String> result = dialog.showAndWait();
        result.ifPresent(name -> {
            buddyName = name;
            buddyNameLabel.setText(buddyName);
            updateStatus("Study buddy renamed to: " + name);
        });
    }

    private void updateTimerLabel() {
        int minutes = remainingSeconds.get() / 60;
        int seconds = remainingSeconds.get() % 60;
        timerLabel.setText(String.format("%02d:%02d", minutes, seconds));
    }

    private void refreshAllLists() {
        refreshNotesList();
        refreshFlashcardsList();
        refreshTodoList();
    }

    private void refreshNotesList() {
        if (currentUser != null) {
            List<Note> notes = noteDAO.getNotesByUser(currentUser);
            notesListView.getItems().setAll(notes);
        }
    }

    private void refreshFlashcardsList() {
        if (currentUser != null) {
            List<Flashcard> flashcards = flashcardDAO.getFlashcardsByUser(currentUser);
            flashcardsListView.getItems().setAll(flashcards);
        }
    }

    private void refreshTodoList() {
        if (currentUser != null) {
            List<TodoItem> todoItems = todoItemDAO.getTodoItemsByUser(currentUser);
            todoListView.getItems().setAll(todoItems);
        }
    }

    private void updateStatus(String message) {
        statusLabel.setText(message);
    }

    private void showAlert(String title, String content) {
        Alert alert = new Alert(Alert.AlertType.ERROR);
        alert.setTitle(title);
        alert.setHeaderText(null);
        alert.setContentText(content);
        alert.showAndWait();
    }
} 