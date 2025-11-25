// Client-side logic for the realtime editor
const socket = io(); // connects to same host / port

const editor = document.getElementById("editor");
const joinBtn = document.getElementById("joinBtn");
const leaveBtn = document.getElementById("leaveBtn");
const usernameInput = document.getElementById("username");
const roomInput = document.getElementById("roomInput");
const status = document.getElementById("status");
const userList = document.getElementById("userList");

let currentRoom = null;
let username = null;

// Debounce helper
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Emit edits to server (debounced)
const sendEdit = debounce(() => {
  if (!currentRoom) return;
  const content = editor.value;
  socket.emit("edit", { room: currentRoom, content, sender: username });
}, 250);

editor.addEventListener("input", (e) => {
  sendEdit();
});

joinBtn.addEventListener("click", () => {
  username = usernameInput.value
    ? usernameInput.value.trim()
    : "User" + Math.floor(Math.random() * 1000);
  const room = roomInput.value ? roomInput.value.trim() : "default";
  currentRoom = room;
  socket.emit("join", { username, room });
  editor.disabled = false;
  joinBtn.disabled = true;
  leaveBtn.disabled = false;
  setStatus("Joined room: " + currentRoom);
});

leaveBtn.addEventListener("click", () => {
  socket.emit("leave", { username, room: currentRoom });
  editor.disabled = true;
  joinBtn.disabled = false;
  leaveBtn.disabled = true;
  setStatus("Left room");
  currentRoom = null;
});

// Receive initial content only for the connecting socket
socket.on("init", (data) => {
  // populate editor with server content
  editor.value = data.content || "";
  userList.textContent = (data.users || []).join(", ") || "-";
});

// Receive live updates from others
socket.on("update", (data) => {
  const incoming = data.content || "";
  // Replace content; in production you'd merge/caret-preserve
  editor.value = incoming;
});

socket.on("user_list", (data) => {
  userList.textContent = (data.users || []).join(", ") || "-";
});

socket.on("cursor_update", (data) => {
  // optional: show remote cursors
});

socket.on("connect", () => setStatus("Connected to server"));
socket.on("disconnect", () => setStatus("Disconnected"));

function setStatus(text) {
  status.textContent = text;
}
