This README provides a comprehensive overview of your project, including installation instructions, project structure, available scripts, API endpoints, and technologies used.

# Performance Dashboard App
This project is a Performance Dashboard App built with React and Express. It provides a user-friendly interface to view and manage performance data, including summary reports, performance timings, and detailed test case descriptions.

## Table of Contents
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites
- Node.js
- npm (Node Package Manager)

### Installation
1. Clone the repository:
    git clone https://github.com/dpchavan44/performance-dashboard.git
    cd performance-dashboard

2. Install the dependencies:
    npm run install:all

3. Building for Production
    npm run build
### This will create a build folder with the optimized production build.

4. start servet
    npm run start:server 
### this will start server at specified PORT (default port is 8080)

#Key Files and Directories
src/: Contains the React frontend code.
    components/: React components like Header, SideBar, Footer, etc.
    utils/: Utility functions and Redux store configuration.
server/: Contains the NodeJs, Express backend code.
    routes/: API route handlers.
    util/: Utility functions for the backend.
files/: Contains Excel files used by the backend.
python-scripts/: Python scripts for data processing.

#Available Scripts

#API Endpoints

GET  /api/dashboard          #Fetches the dashboard data from QualityPlanningSummaryData.xlsx.
GET  /api/overviewsummary    #Runs a Python script to generate an overview summary and fetches data from detailedReportDomainApp.xls.
GET  /api/performance-timing #Fetches performance timing data based on query parameters Baseline, RTM, and Module.
POST /api/update-comment     #Updates a comment in QualityPlanningSummaryData.xlsx.
GET  /api/teams              #Fetches the teams' names from TeamsName.json.
GET  /api/fetch-test-details #Fetches test case descriptions from QualityPlanning_TestCase_Descriptions.xlsx.


#Technologies Used
Frontend: React, Redux, Tailwind CSS
Backend: Express, Node.js
Database: Excel files
Other: Python scripts for data processing

#Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.


