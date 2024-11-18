const socket = io();

const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");
const typingIndicator = document.getElementById("typing-indicator");

let typing = false;
let typingTimeout;

// Emit 'typing' when user starts typing
input.addEventListener("input", () => {
  if (!typing) {
    typing = true;
    socket.emit("typing");
  }
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    typing = false;
    socket.emit("stop typing");
  }, 500);
});

// Send message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    const message = input.value.trim();
    socket.emit("chat message", { text: message, self: true });
    addMessage(message, true);
    input.value = "";
    socket.emit("stop typing");
  }
});

// Display new messages
socket.on("chat message", (data) => {
  addMessage(data.text, data.self);
});

// Show typing indicator
socket.on("typing", () => {
  typingIndicator.style.opacity = "1";
});

// Hide typing indicator
socket.on("chat message", (data) => {
    socket.broadcast.emit("chat message", { text: data.text }); // Broadcast to others
  });
  
// Add a message to the DOM
function addMessage(text, isSelf) {
  const message = document.createElement("div");
  message.textContent = text;
  message.className = "message";
  if (isSelf) message.classList.add("self");
  messages.appendChild(message);
  scrollToBottom();
}

// Smooth auto-scroll
function scrollToBottom() {
  messages.scroll({
    top: messages.scrollHeight,
    behavior: "smooth",
  });
}