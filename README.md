# musala_soft

Implement a solution for managing gateways - master devices that control multiple peripheral devices storing information about these gateways and their associated devices, the information is stored in a postgres database. The service also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, is possible to add and remove a device from a gateway. It is implemented using React.js, Prisma ORM, Node.js, Axios, TypeScript, JavaScript, CSS, Bootstrap, Ant.design and Postgres.

# Development dependencies:

Just using npm install on both the back-end and front-end all dependencies are installed automatically

musala_front dependencies:

- NodeJS v14.15.4
- npm v6.14.10
- antd v4.24.1
- axios v0.26.1
- bootstrap v5.1.3
- react v18.2.0
- react-dom v18.2.0
- react-router-dom v6.4.3

musala_back dependencies:

- prisma v3.15.2
- ts-node v10.9.1
- typescript v4.8.4
- @types/node v16.18.3
- @prisma/client v3.0.1
- @types/express v4.17.13
- express v4.17.1
- nodemon v2.0.12

# Deployment

You can deploy the app easiliy if you have docker, docker-compose and make installed. Go to the root of the project and execute the command:

`make run`

# Email and password
email: root@gmail.com
password: Vi9oy3haem5Shee1chaeM3phu4iFoaGh