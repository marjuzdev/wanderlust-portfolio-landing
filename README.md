# Wanderlust Chronicles - Portfolio Landing Page

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC)

A modern, responsive, and visually stunning portfolio landing page designed for photographers, travelers, and creative professionals. Built with React and TypeScript, it features a sophisticated design system, smooth animations, and multilingual support.

## 🌟 Features

-   **Modern Design System**: Built with **Radix UI** and **Tailwind CSS** for a polished, accessible, and responsive user interface.
-   **Immersive Experience**: Smooth page transitions and interactive elements powered by **Framer Motion**.
-   **Internationalization (i18n)**: Full multi-language support (English/Spanish) using `i18next` and `react-i18next`.
-   **Dynamic Content**:
    -   **Destinations**: showcase travel locations with detailed pages.
    -   **Gallery**: A masonry-style photo gallery.
    -   **News/Blog**: Integrated news section (likely customizable or API-driven).
-   **Responsive Layout**: Fully optimized for mobile, tablet, and desktop devices.
-   **Theming**: Dark mode support via `next-themes`.
-   **Component Library**: Reusable UI components including carousels, dialogues, and form elements.

## 🛠️ Tech Stack

This project is built using the following technologies:

-   **Frontend Framework**: React 18
-   **Language**: TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS, Tailwind Merge, CLSX
-   **UI Components**: Radix UI Primitives, Lucide React (Icons)
-   **Animation**: Framer Motion
-   **Routing**: React Router DOM
-   **State Management**: TanStack Query (React Query)
-   **Forms**: React Hook Form, Zod
-   **Internationalization**: i18next
-   **Testing**: Vitest, React Testing Library

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed:

-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/marjuzdev/wanderlust-portfolio-landing.git
    cd wanderlust-portfolio-landing
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:8080`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and configurations
├── locales/        # i18n translation files
├── pages/          # Application pages (Home, About, Gallery, etc.)
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
