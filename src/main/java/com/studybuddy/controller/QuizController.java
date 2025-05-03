package com.studybuddy.controller;

import com.studybuddy.model.Flashcard;
import com.studybuddy.dao.FlashcardDAO;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.stage.Stage;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class QuizController {
    @FXML private Label questionLabel;
    @FXML private TextArea answerTextArea;
    @FXML private Button submitButton;
    @FXML private Label scoreLabel;
    @FXML private Label progressLabel;
    @FXML private Button nextButton;
    @FXML private Button finishButton;

    private List<Flashcard> flashcards;
    private int currentIndex = 0;
    private int score = 0;
    private boolean answerSubmitted = false;
    private Stage stage;

    public void initialize(List<Flashcard> flashcards, Stage stage) {
        this.flashcards = new ArrayList<>(flashcards);
        Collections.shuffle(this.flashcards);
        this.stage = stage;
        nextButton.setDisable(true);
        updateQuestion();
        updateProgress();
    }

    private void updateQuestion() {
        if (currentIndex < flashcards.size()) {
            Flashcard currentCard = flashcards.get(currentIndex);
            questionLabel.setText(currentCard.getQuestion());
            answerTextArea.clear();
            answerTextArea.setDisable(false);
            submitButton.setDisable(false);
            nextButton.setDisable(true);
            answerSubmitted = false;
        } else {
            finishQuiz();
        }
    }

    private void updateProgress() {
        progressLabel.setText(String.format("Question %d of %d", currentIndex + 1, flashcards.size()));
        scoreLabel.setText(String.format("Score: %d/%d", score, currentIndex));
    }

    @FXML
    private void handleSubmitAnswer() {
        if (answerSubmitted) return;

        Flashcard currentCard = flashcards.get(currentIndex);
        String userAnswer = answerTextArea.getText().trim();
        String correctAnswer = currentCard.getAnswer().trim();

        boolean isCorrect = userAnswer.equalsIgnoreCase(correctAnswer);
        if (isCorrect) {
            score++;
        }

        answerTextArea.setDisable(true);
        submitButton.setDisable(true);
        nextButton.setDisable(false);
        answerSubmitted = true;

        String feedback = isCorrect ? "Correct!" : "Incorrect. The correct answer was: " + correctAnswer;
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle("Answer Feedback");
        alert.setHeaderText(null);
        alert.setContentText(feedback);
        alert.showAndWait();

        updateProgress();
    }

    @FXML
    private void handleNextQuestion() {
        currentIndex++;
        updateQuestion();
        updateProgress();
    }

    @FXML
    private void handleFinishQuiz() {
        finishQuiz();
    }

    private void finishQuiz() {
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle("Quiz Complete");
        alert.setHeaderText("Quiz Results");
        alert.setContentText(String.format("Your final score: %d/%d (%.1f%%)", 
            score, flashcards.size(), (score * 100.0) / flashcards.size()));
        alert.showAndWait();
        stage.close();
    }
} 