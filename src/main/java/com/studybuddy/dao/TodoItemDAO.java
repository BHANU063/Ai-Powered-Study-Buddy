package com.studybuddy.dao;

import com.studybuddy.model.TodoItem;
import com.studybuddy.model.User;
import com.studybuddy.database.DatabaseUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.time.LocalDateTime;
import java.util.List;

public class TodoItemDAO {
    public TodoItem createTodoItem(TodoItem todoItem) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.persist(todoItem);
            transaction.commit();
            return todoItem;
        }
    }

    public List<TodoItem> getTodoItemsByUser(User user) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Query<TodoItem> query = session.createQuery(
                "FROM TodoItem WHERE user = :user ORDER BY dueDate ASC, createdAt DESC",
                TodoItem.class
            );
            query.setParameter("user", user);
            return query.getResultList();
        }
    }

    public List<TodoItem> getCompletedTodoItems(User user) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Query<TodoItem> query = session.createQuery(
                "FROM TodoItem WHERE user = :user AND completed = true ORDER BY dueDate DESC",
                TodoItem.class
            );
            query.setParameter("user", user);
            return query.getResultList();
        }
    }

    public List<TodoItem> getPendingTodoItems(User user) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Query<TodoItem> query = session.createQuery(
                "FROM TodoItem WHERE user = :user AND completed = false ORDER BY dueDate ASC",
                TodoItem.class
            );
            query.setParameter("user", user);
            return query.getResultList();
        }
    }

    public TodoItem updateTodoItem(TodoItem todoItem) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.merge(todoItem);
            transaction.commit();
            return todoItem;
        }
    }

    public void deleteTodoItem(TodoItem todoItem) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.remove(todoItem);
            transaction.commit();
        }
    }

    public List<TodoItem> getOverdueTodoItems(User user) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Query<TodoItem> query = session.createQuery(
                "FROM TodoItem WHERE user = :user AND completed = false AND dueDate < :now ORDER BY dueDate ASC",
                TodoItem.class
            );
            query.setParameter("user", user);
            query.setParameter("now", LocalDateTime.now());
            return query.getResultList();
        }
    }
} 