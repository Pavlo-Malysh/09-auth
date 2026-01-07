# NoteHub

Веб-додаток для управління персональними нотатками з автентифікацією користувачів.

## Опис

NoteHub — це fullstack додаток для створення, редагування, перегляду та організації нотаток. Підтримує фільтрацію за тегами, пошук, пагінацію та профіль користувача.

## Функціональність

- Реєстрація та вхід користувачів
- Створення, перегляд та видалення нотаток
- Фільтрація нотаток за тегами (Todo, Work, Personal, Meeting, Shopping)
- Пошук нотаток за ключовими словами
- Пагінація списку нотаток
- Профіль користувача з можливістю редагування
- Збереження чернеток нотаток у localStorage
- Модальний перегляд нотаток (Intercepting Routes)

## Технології

| Технологія | Призначення |
|------------|-------------|
| Next.js 15 | Фреймворк (App Router, SSR, Middleware) |
| React 19 | UI бібліотека |
| TypeScript | Статична типізація |
| TanStack Query | Серверний стан, кешування, prefetching |
| Zustand | Клієнтський стан (auth, drafts) |
| Axios | HTTP клієнт |
| Yup | Валідація форм |
| react-hot-toast | Toast сповіщення |
| react-paginate | Пагінація |
| use-debounce | Дебаунс пошуку |
| CSS Modules | Стилізація |

## Структура проекту

```
app/
├── (auth routes)/          # Публічні маршрути (sign-in, sign-up)
├── (private routes)/       # Захищені маршрути
│   ├── notes/
│   │   ├── [id]/           # Деталі нотатки
│   │   ├── action/create/  # Створення нотатки
│   │   └── filter/         # Фільтрація за тегами
│   │       ├── @sidebar/   # Паралельний маршрут (sidebar)
│   │       └── [...slug]/  # Динамічний маршрут
│   └── profile/            # Профіль користувача
│       └── edit/           # Редагування профілю
├── @modal/                 # Intercepting route для модалок
├── layout.tsx              # Кореневий layout
└── page.tsx                # Головна сторінка

components/
├── AuthNavigation/         # Навігація авторизації
├── AuthProvider/           # Провайдер автентифікації
├── Header/                 # Хедер
├── Footer/                 # Футер
├── Modal/                  # Модальне вікно
├── NoteForm/               # Форма створення нотатки
├── NoteList/               # Список нотаток
├── Pagination/             # Пагінація
├── SearchBox/              # Пошук
├── TagsMenu/               # Меню тегів
└── TanStackProvider/       # Провайдер React Query

lib/
├── api/
│   ├── api.ts              # Axios інстанс
│   ├── clientApi.ts        # Клієнтські API функції
│   └── serverApi.ts        # Серверні API функції
├── store/
│   ├── authStore.ts        # Zustand store автентифікації
│   └── noteStore.ts        # Zustand store чернеток
└── tags.ts                 # Список тегів

middleware.ts               # Захист маршрутів
```

## Автентифікація

Використовується токенна автентифікація з JWT:

- **accessToken** — короткотривалий токен (HttpOnly cookie)
- **refreshToken** — довготривалий токен для оновлення сесії

### Middleware

Перехоплює запити до захищених маршрутів та перевіряє наявність токенів:
- Немає токенів → редірект на `/sign-in`
- Є токени → доступ дозволено
- Авторизований на `/sign-in` → редірект на `/`

### AuthProvider

Клієнтський компонент, що ініціалізує стан користувача при завантаженні додатку.

## Запуск

```bash
# Встановлення залежностей
npm install

# Змінні середовища
cp .env
# Додати NEXT_PUBLIC_API_URL
# Додати NEXT_PUBLIC_NOTEHUB_TOKEN

# Розробка
npm run dev

# Продакшн збірка
npm run build
npm start
```

## Скрипти

| Команда | Опис |
|---------|------|
| `npm run dev` | Запуск dev сервера (Turbopack) |
| `npm run build` | Продакшн збірка |
| `npm start` | Запуск продакшн сервера |
| `npm run lint` | Перевірка ESLint |

## API Endpoints

| Метод | Endpoint | Опис |
|-------|----------|------|
| POST | `/api/auth/register` | Реєстрація |
| POST | `/api/auth/login` | Вхід |
| POST | `/api/auth/logout` | Вихід |
| GET | `/api/auth/session` | Перевірка/оновлення сесії |
| GET | `/api/users/me` | Поточний користувач |
| PATCH | `/api/users/me` | Оновлення профілю |
| GET | `/api/notes` | Список нотаток |
| POST | `/api/notes` | Створення нотатки |
| GET | `/api/notes/:id` | Деталі нотатки |
| DELETE | `/api/notes/:id` | Видалення нотатки |
