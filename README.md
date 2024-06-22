# Test API

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/test-api.git
    cd test-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables:
    - Create a `.env` file in the root directory and add your configuration:
      ```
      DB_USER=your_db_user
      DB_HOST=your_db_host
      DB_NAME=your_db_name
      DB_PASSWORD=your_db_password
      DB_PORT=your_db_port
      SECRET_KEY=your_secret_key
      ```

4. Create the database and tables:
    - Use the provided SQL script in `database.sql` to create the necessary tables.

5. Start the server:
    ```bash
    npm start
    ```

## Deployment

1. Deploy the application to a cloud provider like Railway.app.
2. Configure the necessary environment variables in the cloud provider.
3. Deploy the application and ensure it is running correctly.

## Endpoints

- Membership
  - `POST /registration`
  - `POST /login`
  - `GET /profile`
  - `PUT /profile/update`
  - `PUT /profile/image`
- Information
  - `GET /banner`
  - `GET /services`
- Transaction
  - `GET /balance`
  - `POST /topup`
  - `POST /transaction`
  - `GET /transaction/history`
