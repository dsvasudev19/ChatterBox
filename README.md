# ChatterBox

ChatterBox is a real-time chatting application built with React.js for the frontend and Socket.IO for real-time communication. This application allows users to sign in, chat with other users in real-time, and enjoy a smooth chatting experience.

## Features
- **Real-time communication**: Users can send and receive messages instantly.
- **User authentication**: Users can log in with their credentials to start chatting.
- **Responsive design**: The app is designed to be fully responsive and works seamlessly across all devices.

---

## Screenshots

**Home Page**  
![Home Page](https://res.cloudinary.com/dxqrg09mq/image/upload/v1733584417/screencapture-chatterbox-dev-vercel-app-2024-11-18-15_50_55_nhs7op.png)


**Chat Page**  
![Chat Page](https://res.cloudinary.com/dxqrg09mq/image/upload/v1733584384/screencapture-chatterbox-dev-vercel-app-chat-2024-11-18-15_53_25_rozqyt.png)

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Socket.IO (for real-time communication)
- **Styling**: Tailwind CSS, Styled-components

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: [Install Node.js](https://nodejs.org/)
- **npm or yarn**: These package managers come with Node.js

---

## Steps to Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/chatterbox.git
cd chatterbox
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn.

For npm:
```bash
npm install
```

For yarn:
```bash
yarn install
```

### 3. Set up the Backend (Socket.IO server)

Make sure you have the backend server running. If the backend is in a separate repository, follow the instructions in the backend README to set it up. Typically, this would involve:

- Navigating to the backend directory
- Installing the dependencies
- Running the server

For example:
```bash
cd server
npm install
npm start
```

The backend server should be running on a port, such as `http://localhost:5000`.

### 4. Start the Frontend

To run the frontend, use the following command:

For npm:
```bash
npm start
```

For yarn:
```bash
yarn start
```

This will start the development server and you can access the app in your browser at `http://localhost:3000`.

---

## Project Structure

```
chatterbox/
├── public/
│   └── index.html
├── src/
│   ├── components/          # All the reusable components
│   ├── pages/               # Different pages (Home, Login, Chat)
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point for React app
│   └── socket.js            # Socket.IO configuration
├── .gitignore
├── package.json
└── README.md
```

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add feature-name'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- React.js for a fast and efficient frontend.
- Socket.IO for enabling real-time communication.

---

Feel free to open issues or make pull requests for any improvements or bug fixes!
