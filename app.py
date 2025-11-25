import eventlet
eventlet.monkey_patch()
from collections import defaultdict
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit, join_room, leave_room


app = Flask(__name__)
app.config['SECRET_KEY'] = 'devsecret'
socketio = SocketIO(app, cors_allowed_origins='*', async_mode='eventlet')

# In-memory store for room contents and connected users
rooms = defaultdict(lambda: {"content": "", "users": set()})

@app.route('/')
def index():
    # Optional: room param for sharing a link like /?room=room1
    return render_template('index.html')

# Socket handlers
@socketio.on('join')
def on_join(data):
    username = data.get('username', 'anon')
    room = data.get('room', 'default')
    join_room(room)
    rooms[room]['users'].add(username)
    # send current content to the joining user only
    emit('init', {'content': rooms[room]['content'], 'users': list(rooms[room]['users'])}, room=request.sid)
    # notify room about new user list
    emit('user_list', {'users': list(rooms[room]['users'])}, room=room)

@socketio.on('leave')
def on_leave(data):
    username = data.get('username', 'anon')
    room = data.get('room', 'default')
    leave_room(room)
    if username in rooms[room]['users']:
        rooms[room]['users'].remove(username)
    emit('user_list', {'users': list(rooms[room]['users'])}, room=room)

@socketio.on('edit')
def on_edit(data):
    """
    Receive an edit from a client and broadcast to others in the room.
    data = { room: str, content: str, sender: str }
    """
    room = data.get('room', 'default')
    content = data.get('content', '')
    sender = data.get('sender', '')
    # update server state
    rooms[room]['content'] = content
    # Broadcast updated content to all clients in room except the sender
    emit('update', {'content': content, 'sender': sender}, room=room, include_self=False)

@socketio.on('cursor')
def on_cursor(data):
    """
    Share cursor/selection positions for awareness (optional)
    data = { room: str, pos: int, sender: str }
    """
    room = data.get('room', 'default')
    emit('cursor_update', data, room=room, include_self=False)

if __name__ == '__main__':
    # Use eventlet for WebSocket support
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
