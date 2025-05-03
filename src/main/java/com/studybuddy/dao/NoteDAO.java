package com.studybuddy.dao;

import com.studybuddy.model.Note;
import com.studybuddy.model.User;
import com.studybuddy.database.DatabaseUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.util.List;

public class NoteDAO {
    public Note createNote(Note note) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.persist(note);
            transaction.commit();
            return note;
        }
    }

    public List<Note> getNotesByUser(User user) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Query<Note> query = session.createQuery("FROM Note WHERE user = :user ORDER BY lastModified DESC", Note.class);
            query.setParameter("user", user);
            return query.getResultList();
        }
    }

    public Note updateNote(Note note) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.merge(note);
            transaction.commit();
            return note;
        }
    }

    public void deleteNote(Note note) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.remove(note);
            transaction.commit();
        }
    }

    public List<Note> searchNotes(User user, String searchTerm) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            Query<Note> query = session.createQuery(
                "FROM Note WHERE user = :user AND (title LIKE :searchTerm OR content LIKE :searchTerm)",
                Note.class
            );
            query.setParameter("user", user);
            query.setParameter("searchTerm", "%" + searchTerm + "%");
            return query.getResultList();
        }
    }

    public Note getNoteById(Long id) {
        try (Session session = DatabaseUtil.getSessionFactory().openSession()) {
            return session.get(Note.class, id);
        }
    }
} 