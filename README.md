# Drug Store Management System

## Introduction

Welcome to the Drug Store Management System, a Nest.js project designed to streamline the management processes of a drug store. This system provides a platform for efficiently managing inventory, sales, customer data, and other essential aspects of a drug store.

## Features

-   **User Management**: Manage users with roles and permissions for accessing the system.
-   **Authentication**: Securely authenticate users to access the system.
-   **Order Management**: Record and manage orders placed by customers.
-   **Customer Management**: Maintain customer records and manage interactions for improved service.
-   **Product Management**: Manage the inventory of products available in the store.
-   **Sales Management**: Record and monitor sales transactions, including generating invoices and receipts.
-   **Customization**: Customize the system according to specific business requirements and preferences.

## Technologies Used

-   **Nest.js**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
-   **TypeScript**: A statically typed superset of JavaScript that compiles to plain JavaScript for enhanced development experience and code quality.
-   **PostgreSQL**: A powerful, open-source relational database management system for storing and managing data efficiently.
-   **JWT (JSON Web Tokens)**: For secure authentication and authorization of users.
-   **Swagger**: Generate interactive API documentation for easy testing and understanding of endpoints.

## Getting Started

To get started with the Drug Store Management System, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone <repository_url>
    ```

2. **Install dependencies**:

    ```bash
    cd drug-store-management-system
    npm install
    ```

3. **Set Up Environment Variables**

    To configure environment variables such as database connection details, JWT secret, etc., follow these steps:

    Create a `.env` file in the root directory of the project.
    Define the environment variables in the `.env` file in the following format:
    bash

    ```
    DATABASE_URL
    JWT_EXPIRATION_DATE
    JWT_SECRET_TOKEN
    ```

    Replace the placeholder values (DATABASE_URL, JWT_EXPIRATION_DATE, JWT_SECRET_TOKEN) with your actual database connection details and JWT secret.

## Run the Application

To run the application in development mode, execute the following command in your terminal:

```bash
npm run start:dev
```

## API Documentation

The Drug Store Management System API is documented using Swagger. Once the application is running, you can access the Swagger documentation at `/api/docs`.

## Contributing

Contributions to the Drug Store Management System are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add my feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support, please contact [Mohamadreza](mohamadrezakhf@example.com).
