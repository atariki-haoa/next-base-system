# Next Base System
Welcome to the Next Base System! This project is a foundational template I’ve put together to help streamline the process of building Next.js applications using TypeScript. My goal with this template is to provide a clean, well-structured starting point that I can use and share with others in the community, ensuring that projects can scale smoothly from the beginning.

## Why This Project?
As I’ve worked on various Next.js projects, I found myself often setting up the same configurations repeatedly: file structures, TypeScript setup, API routes, and more. To save time and maintain consistency, I decided to create this base system, which includes a flexible folder structure, common tools, and best practices that I believe are helpful for building robust applications.

This template is ideal for both personal projects and team development, with an emphasis on scalability and maintainability. Whether you’re starting a small project or planning to grow it into something larger, this base system should give you a solid foundation to build upon.

## Features
Next.js + TypeScript: Fully configured with TypeScript for static type checking and enhanced developer experience.
API Routes: Example structure for handling API routes cleanly within the project.
Customizable Folder Structure: Organized directories for components, pages, services, and utils.
Pre-configured ESLint and Prettier: Maintain clean and consistent code with linting and formatting tools.
Built-in Environment Management: Example .env file setup for managing environment variables.
Getting Started
To get started with this template, you’ll need to clone the repository and install the dependencies. Follow these steps to set it up:

## Prerequisites
Make sure you have the following installed:

Node.js: Version 14 or higher
Yarn or npm
Installation
Clone the repository:

```bash
git clone https://github.com/atariki-haoa/next-base-system.git
```
Navigate to the project directory:

```bash
cd next-base-system
```
Install the dependencies:

If you use npm:

```bash
npm install
```

Running the Development Server
Once the dependencies are installed, you can start the development server with:
```bash
npm run dev
```

This will start the Next.js development server at http://localhost:3000. You should see the starter page loaded in your browser.

Building for Production
To build the project for production:

```bash
npm run build
```

Environment Variables
You can create an .env.local file in the root of the project to manage your environment variables. Here’s an example of how it might look:

### Example environment variables
NEXT_PUBLIC_API_URL=http://localhost:3000/api
How to Use This Template
Modify the pages directory to add new routes and views.
Add your services, helpers, and utilities in the services and utils directories.
Customize the components folder with your own reusable UI components.
Set up your environment variables by creating a .env.local file as needed.
Contributing
If you find this template useful or have any suggestions for improvements, feel free to fork the repo and open a pull request. I’d love to see how this can be expanded or adapted to other projects!

