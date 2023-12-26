# Payouts Frontend Application

## Overview
This project showcases a frontend application built using React, TypeScript, and Styled Components. It presents a user interface to display payout history fetched from an API endpoint. The application allows users to search for payouts based on various criteria, including usernames.

## Technical Choices
- **Framework:** React
- **Type Checking:** TypeScript
- **Styling:** Utilizes Styled Components for consistent and maintainable styling across components.

## Application Features
- Fetches payout data from the provided API endpoints.
- Implements search functionality enabling users to search for payouts based on username.
- Renders payout history in a table format, adhering to the designs in the provided Figma file.

## How to Run the Application
1. **Clone the Repository**
    ```bash
    git clone https://github.com/sulaimanwebdev/tech-test
    cd tech-test
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Run the Application**
    ```bash
    npm start
    ```

## Access the Application
Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Approach and Considerations
- **Design Adherence:** Implemented the user interface as specified in the provided Figma file to ensure consistency and visual alignment.
- **TypeScript & Styled Components:** Leveraged TypeScript for type safety and Styled Components for consistent, responsive, and easily maintainable styling.
- **Error Handling:** Implemented error messages for scenarios where the API fetch fails or no user is found based on the search criteria.
- **Optimization:** Focused on optimizing user experience while ensuring performance in the search functionality.
