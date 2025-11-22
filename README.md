# COVID-19 Interactive Dashboard

A lightweight, interactive web application that visualizes daily COVID-19 case data for selected countries. Built with React, Vite, Ant Design, and Tailwind CSS, this dashboard provides real-time insights into the progression of the pandemic using data from the [disease.sh](https://disease.sh/) API.

## Features

- **Real-time Data**: Fetches live data for cases, recoveries, and deaths.
- **Global & Country Views**: Switch between a global overview and specific country statistics.
- **Interactive Charts**: Visualize historical trends with dynamic area charts (30 days, 90 days, 1 year, All time).
- **Data Table**: Sortable and responsive table displaying detailed statistics for all countries.
- **Modern UI**: Clean, responsive design using Ant Design components and Tailwind CSS styling.

## Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Library**: [Ant Design](https://ant.design/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **State Management & Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/amitmittal117/covid-dashboard.git
   cd covid-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`.

## Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── ChartsContainer.jsx  # Historical data visualization
│   │   ├── CountryFilter.jsx    # Country selection dropdown
│   │   ├── Dashboard.jsx        # Main dashboard container
│   │   ├── DataTable.jsx        # Detailed country statistics table
│   │   └── StatsCards.jsx       # Key metrics summary cards
│   └── Layout/
│       └── MainLayout.jsx       # Application shell and layout
├── services/
│   └── api.js                   # API integration with disease.sh
├── lib/
│   └── utils.js                 # Utility functions
├── App.jsx                      # Root component
└── main.jsx                     # Entry point
```

## License

This project is open source and available under the [MIT License](LICENSE).
