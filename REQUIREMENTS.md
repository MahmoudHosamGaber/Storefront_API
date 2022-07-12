# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index route: '/api/products' [GET]
- Show route: '/api/products/:id' [GET]
- Create [token required] route: '/api/products' [POST]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required] route: '/api/users/' [GET]
- Show [token required] route: '/api/users/:id' [GET]
- Create N[token required] route: '/api/users/:id' [POST]

#### Orders

- Current Order by user (args: user id)[token required] route: '/api/orders' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Table: products (id: serial primary key, name varchar, price integer)

#### Table: users (id: serial primary key, firstName varchar, lastName varchar, password varchar)

#### Table: orders (id: serial primary key, userID :string[foreign key to users table], status varchar)

#### Table: order_products (id: serial primary key, orderId :string [foreign key to orders table], productId :string [foreign key to products table], quantity integer)

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
