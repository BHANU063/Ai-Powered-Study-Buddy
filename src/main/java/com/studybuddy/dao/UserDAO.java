package com.studybuddy.dao;

import com.studybuddy.model.User;
import com.studybuddy.database.DatabaseUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

public class UserDAO {
    public User createUser(User user) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.persist(user);
            transaction.commit();
            return user;
        }
    }

    public User getUserByUsername(String username) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Query<User> query = session.createQuery("FROM User WHERE username = :username", User.class);
            query.setParameter("username", username);
            return query.uniqueResult();
        }
    }

    public User updateUser(User user) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.merge(user);
            transaction.commit();
            return user;
        }
    }

    public void deleteUser(User user) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.remove(user);
            transaction.commit();
        }
    }

    public boolean authenticateUser(String username, String password) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Query<User> query = session.createQuery("FROM User WHERE username = :username AND password = :password", User.class);
            query.setParameter("username", username);
            query.setParameter("password", password);
            return query.uniqueResult() != null;
        }
    }
} 