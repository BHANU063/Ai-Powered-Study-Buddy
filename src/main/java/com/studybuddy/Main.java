package com.studybuddy;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import com.studybuddy.database.DatabaseUtil;

public class Main extends Application {
    @Override
    public void start(Stage primaryStage) throws Exception {
        // Initialize database connection
        DatabaseUtil.initialize();

        Platform.setImplicitExit(true);
        
        // Load the main FXML file
        Parent root = FXMLLoader.load(getClass().getClassLoader().getResource("fxml/main.fxml"));
        Scene scene = new Scene(root, 1200, 800);
        
        // Load the stylesheet
        scene.getStylesheets().add(getClass().getClassLoader().getResource("styles/light-theme.css").toExternalForm());
        
        primaryStage.setTitle("Study Buddy");
        primaryStage.setScene(scene);
        
        // Set minimum size to prevent window sizing issues
        primaryStage.setMinWidth(800);
        primaryStage.setMinHeight(600);
        
        // Show the window on the JavaFX Application Thread
        Platform.runLater(() -> {
            primaryStage.show();
        });
    }

    @Override
    public void stop() {
        // Close database connection when application closes
        DatabaseUtil.shutdown();
    }

    public static void main(String[] args) {
        // Set system properties to fix macOS-specific JavaFX issues
        System.setProperty("prism.order", "sw");
        System.setProperty("javafx.animation.fullspeed", "true");
        System.setProperty("glass.platform", "Monocle");
        System.setProperty("monocle.platform", "Headless");
        
        launch(args);
    }
} 