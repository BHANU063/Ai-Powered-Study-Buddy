#!/bin/bash

# Build the project
mvn clean compile

# Set up JavaFX SDK path
JAVAFX_SDK_PATH="javafx-sdk-17.0.2"

# Get all other dependencies
CLASSPATH=$(mvn dependency:build-classpath -Dmdep.excludeGroupIds=org.openjfx -Dmdep.outputFile=/dev/stdout -q)

# Run with JavaFX SDK
java \
  --module-path "${JAVAFX_SDK_PATH}/lib" \
  --add-modules javafx.controls,javafx.fxml \
  -Djava.library.path="${JAVAFX_SDK_PATH}/lib" \
  -cp "target/classes:${CLASSPATH}" \
  com.studybuddy.Main 