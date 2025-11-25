# REAL-TIME-COLLABORATION-TOOL

*COMPANY*: CODTECH IT SOLUTIONS

*NAME*: THUDIMILLA VAISHALI

*INTERN ID*: CT04DR919

*DOMAIN*: SOFTWARE DEVELOPMENT

*DURATION*: 4 WEEKS

*MENTOR*: NEELA SANTHOSH

The Real-Time Collaboration Tool developed for Task 3 is an interactive, multi-user platform designed to enable real-time note-taking or collaborative editing, similar to popular tools like Google Docs. This project demonstrates the practical use of WebSockets to achieve instantaneous communication between multiple clients, making it ideal for collaborative environments such as online classrooms, remote workspaces, coding discussions, or document editing sessions. The primary objective of the task was to build a fully functional collaborative system that allows multiple users to join the same room, edit shared content, and instantly view updates made by others without requiring a page refresh.
The tool is built using Flask, a lightweight Python web framework, combined with Flask-SocketIO, which enables real-time bi-directional communication between the server and connected clients. SocketIO provides an abstraction over WebSockets, offering a reliable transport layer that supports both WebSockets and fallbacks like long-polling. The backend server is responsible for maintaining active rooms, storing each room’s current content, and broadcasting updates to all users within the same room. A dictionary-based in-memory structure is used to store room data, where each room contains a text buffer and a set of active users. This allows the application to handle multiple rooms simultaneously, ensuring isolation between different collaborative groups.
On the frontend, a simple and user-friendly interface is created using HTML, CSS, and JavaScript. Each user can enter a username and room name. When they join a room, the client establishes a WebSocket connection with the server. Any changes typed into the editor are emitted to the server, which immediately broadcasts them to other connected clients in the same room. To avoid overwhelming the server with rapid keystrokes, input events are debounced on the client side before being transmitted. This results in smoother performance and reduces unnecessary network traffic. The server updates the shared content and ensures synchronization so that all users always view the most recent state of the document.
The tool also features the ability to track connected users within a room. When a user joins or leaves, the server updates the user list and broadcasts the updated list to all participants. This creates a sense of presence and awareness within the collaborative environment. The application is executed in a virtual environment to maintain clean dependency management and ensure consistent behavior across systems. Packages such as Flask-SocketIO, eventlet, and python-socketio are essential components that power the real-time functionality.

*OUTPUT*:
<img width="1907" height="747" alt="Image" src="https://github.com/user-attachments/assets/ca76990a-9ddc-46c3-a754-4fb2ad69bc47" />

<img width="1908" height="716" alt="Image" src="https://github.com/user-attachments/assets/7172ea65-eb1b-4663-a2e3-c96aed89d8f8" />
