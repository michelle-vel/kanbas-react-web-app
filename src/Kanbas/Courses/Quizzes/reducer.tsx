import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Quiz {
  _id: string;
  name: string;
  status: string;
  dueDate: string;
  points: number;
  questions: number;
  course: string;
  editing?: boolean;
}

interface QuizzesState {
  quizzes: Quiz[];
}

const initialState: QuizzesState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action: PayloadAction<Partial<Quiz>>) => {
      const newQuiz: Quiz = {
        _id: new Date().getTime().toString(),
        name: action.payload.name || "Untitled Quiz",
        status: action.payload.status || "Available",
        dueDate: action.payload.dueDate || "",
        points: action.payload.points || 0,
        questions: action.payload.questions || 0,
        course: action.payload.course || "",
      };
      state.quizzes = [...state.quizzes, newQuiz];
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === action.payload._id ? action.payload : q
      );
    },
    editQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === action.payload ? { ...q, editing: true } : q
      );
    },
  },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz, editQuiz } =
  quizzesSlice.actions;

export default quizzesSlice.reducer;