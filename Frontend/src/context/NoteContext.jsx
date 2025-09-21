import { createContext, useEffect, useState } from "react";
import Backend_URL from "../api/url";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNote = async () => {
    setLoading(true);
    try {
      const response = await Backend_URL.get("get-notes"); // no leading slash needed if baseURL ends without slash
      // If your API returns { notes: [...] } use response.data.notes
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNote(); // <-- call it
  }, []);

  const createNote = async (noteData) => {
    setLoading(true);
    try {
      const res = await Backend_URL.post("create-note", noteData);
      // assuming res.data is the created note object
      setNotes((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (id, updatedNoteData) => {
    setLoading(true);
    try {
      const res = await Backend_URL.put(`update-note/${id}`, updatedNoteData);
      // assuming res.data is the updated note object
      setNotes((prev) => prev.map((n) => (n._id === id ? res.data : n)));
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      await Backend_URL.delete(`delete-note/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, loading, getNote, createNote, updateNote, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};
