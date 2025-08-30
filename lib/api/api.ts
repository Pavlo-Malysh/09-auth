import axios from "axios";
import type { NewNote, Note } from "../../types/note";


interface fetchNotesResponse {
    notes: Note[];
    totalPages: number;
}
interface Params {
    page: number;
    perPage: number;
    search: string;
    tag?: string;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const nextServer = axios.create({
    baseURL,
    withCredentials: true,
})

// const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

// axios.defaults.baseURL = "https://notehub-public.goit.study/api";
// axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;


export const fetchNotes = async (page: number, search: string, tag?: string): Promise<fetchNotesResponse> => {

    const params: Params = {
        page,
        perPage: 10,
        search,
        tag,
    };

    const response = await nextServer.get<fetchNotesResponse>("/notes", {
        params,
    })


    return response.data;

}

export const createNote = async (newNote: NewNote) => {
    const res = await nextServer.post<Note>("/notes", newNote)
    return res.data
}

export const deleteNote = async (noteId: string) => {
    const res = await nextServer.delete<Note>(`/notes/${noteId}`);
    return res.data
}

export const fetchNoteById = async (noteId: string) => {
    const res = await nextServer.get<Note>(`/notes/${noteId}`)
    return res.data
}