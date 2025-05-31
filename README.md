# Full-Stack Item Rental Application

A full-stack web application that allows users to rent and manage items through a flexible, multi-role system.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Usage](#usage)
6. [Roadmap](#roadmap)
7. [Acknowledgements](#acknowledgements)

## Overview

This is a full-stack item rental platform designed to demonstrate scalable full-stack architecture with multiple user roles: Renters, Companies (item owners), and Admins.

The motivation behind building this item rental application came up by observing the Canadian market.

I noticed that while there are some rental services available, they are often limited in scope—focused on specific categories like clothing or equipment—and typically offer fixed pricing, which can be prohibitively expensive.

Given the high cost of living in Canada, I wanted to create a more flexible and inclusive platform where individuals can rent a wide range of items, from clothes and tools to furniture, based on the renter’s asking price.

This model not only promotes affordability but also encourages resource sharing, helping people save money and reduce unnecessary purchases.

Through this project, I aimed to provide a practical solution that makes everyday items more accessible to everyone.

## Tech Stack

**Frontend**: React, Next.js, TypeScript, Tailwind CSS, DaisyUI  
**Backend**: NestJS, GraphQL, Prisma ORM  
**Database**: PostgreSQL  
**DevOps**: Docker, AWS   
**Others**: React Hook Form, Heroicons

## Getting Started

You can either explore the live deployed version or run the application locally using Docker.

### 🌐 Live Demo

- **Frontend (Renter)**: ADD LINK HERE
- **Frontend (Company)**: ADD LINK HERE
- **Frontend (Admin)**: ADD LINK HERE
- **Backend API (GraphQL Playground)**: ADD LINK HERE

### 🐳 Run Locally with Docker

#### 1. **Clone the Repository**
```bash
git clone https://github.com/misato118/temp_app.git
```

ADD MORE STEPS HERE

## Usage

This project simulates real-world workflows for three user types:

- **Renters**
  - Browse and filter available items
  - Submit rental applications with custom price and duration
  - Estimate delivery fees based on address
  - Leave item reviews after use

- **Companies**
  - Submit item listings (subject to admin approval)
  - Manage item availability and inventory
  - Review and respond to rental applications

- **Admins** (in progress)
  - Review and approve submitted item listings
  - Oversee and manage renter/company accounts

## Roadmap

- [ ] Add Admin system
  - [ ] Companies list
  - [ ] Renters list
- [ ] Change the application logo

See the [open issues](https://github.com/misato118/temp_app/issues) for a full list of proposed features and known issues.

## Acknowledgement

This project was built to demonstrate my skills in full-stack web development. I’d like to acknowledge the following official resources and tools that greatly supported the development process:

- [Apollo GraphQL Documentation](https://www.apollographql.com/docs) – for setting up client-side GraphQL operations
- [NestJS Documentation](https://nestjs.com/) – for backend architecture and GraphQL integration
- [Next.js Documentation](https://nextjs.org/docs) – for frontend routing, API routes, and deployment guidance
- [GraphQL.org Learning Guide](https://graphql.org/learn/) – for understanding GraphQL fundamentals
- [GraphQL Code Generator Docs](https://the-guild.dev/graphql/codegen/docs/getting-started) – for generating typed GraphQL hooks and queries

Styling and UI were supported by:

- [Tailwind CSS Docs](https://tailwindcss.com/docs/flex-direction#column) – for responsive layout and utility-first styling
- [daisyUI Docs](https://daisyui.com/docs/colors/) – for theming and component styling
- [Heroicons](https://heroicons.com/outline) – for modern, accessible icons

Form handling was implemented with guidance from:

- [React Hook Form Docs](https://react-hook-form.com/docs/useform/reset) – for form state management and reset behavior

Special thanks to these communities and their documentation teams for making high-quality learning and implementation resources publicly available.