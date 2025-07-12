# github_crm_task

## Requirements

- Docker  
- Docker Compose

---

## How to run

1. Clone the repository

    ```bash
    git clone https://github.com/shaggy611/github_crm.git
   
    cd github_crm
    ```

2. Start Docker Compose

    ```bash
    docker-compose up --build
    ```

3. After startup, services will be available at:

    - Backend (NestJS API): [http://localhost:3000](http://localhost:3000)  
    - Frontend (React): [http://localhost:5177](http://localhost:5177)

---

## Management commands

- To stop all containers

    ```bash
    docker-compose down -v
    ```

---

## Important notes

- Make sure ports **3000**, **5177**, and **5432** are free before running.  
- Database migrations run automatically on backend startup.

---
