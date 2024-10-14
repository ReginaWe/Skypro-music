import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { playerReducer } from "./features/playerSlice";
import { authReducer } from "./features/authSlice";

const rootReducer = combineReducers({
  player: playerReducer,
  auth: authReducer,
});

// Функция makeStore создает и возвращает хранилище Redux с помощью функции configureStore.
export const makeStore = () => {
  return configureStore({
    // Мы передаем объект, в котором свойство reducer содержит корневой редьюсер, объединяющий все редьюсеры нашего приложения.
    reducer: rootReducer,
  });
};

// Тип RootState представляет собой тип состояния нашего приложения, который возвращает функция getState хранилища Redux.
export type RootState = ReturnType<typeof rootReducer>;

// Тип AppStore представляет собой тип нашего хранилища Redux, который возвращает функция makeStore.
export type AppStore = ReturnType<typeof makeStore>;

// Тип AppDispatch представляет собой тип функции диспетчера, который возвращает функция dispatch хранилища Redux.
export type AppDispatch = AppStore["dispatch"];
