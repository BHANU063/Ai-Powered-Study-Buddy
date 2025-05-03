package com.studybuddy.dao;

import com.studybuddy.model.Flashcard;
import com.studybuddy.model.User;
import com.studybuddy.database.DatabaseUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.util.List;

public class FlashcardDAO {
    public Flashcard createFlashcard(Flashcard flashcard) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.persist(flashcard);
            transaction.commit();
            return flashcard;
        }
    }

    public List<Flashcard> getFlashcardsByUser(User user) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Query<Flashcard> query = session.createQuery("FROM Flashcard WHERE user = :user", Flashcard.class);
            query.setParameter("user", user);
            return query.getResultList();
        }
    }

    public Flashcard updateFlashcard(Flashcard flashcard) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.merge(flashcard);
            transaction.commit();
            return flashcard;
        }
    }

    public void deleteFlashcard(Flashcard flashcard) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.remove(flashcard);
            transaction.commit();
        }
    }

    public List<Flashcard> getFlashcardsForReview(User user) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Query<Flashcard> query = session.createQuery(
                "FROM Flashcard WHERE user = :user ORDER BY lastReviewed ASC", 
                Flashcard.class
            );
            query.setParameter("user", user);
            query.setMaxResults(10); // Limit to 10 cards for review
            return query.getResultList();
        }
    }

    public void markAsReviewed(Flashcard flashcard) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            flashcard.setLastReviewed(java.time.LocalDateTime.now());
            flashcard.setReviewCount(flashcard.getReviewCount() + 1);
            session.merge(flashcard);
            transaction.commit();
        }
    }
} 