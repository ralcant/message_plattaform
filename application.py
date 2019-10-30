import os

from flask import Flask, render_template, url_for, redirect, request
from flask_socketio import SocketIO, emit
from flask_jsglue import JSGlue

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")  

jsglue = JSGlue(app)

# print(app.config["SECRET_KEY"])
socketio = SocketIO(app)

"""
Dictionary of the from channel_name --> message

Each message is of the form (message_content, message_sender, time_sent)

"""
messages = dict() 



"""
List of tuples of the form (channel_name, channel_creator)
"""
channels = [] 

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/user", methods=["POST"])
def first_page():
    display_name= request.form.get("display_name")
    # print(display_name)
    # return render_template('user.html', display_name=display_name)
 
    return redirect(url_for('user', display_name=display_name))
    # return redirect(url_for('index', display_name= display_name))

@app.route("/user/<string:display_name>")
def user(display_name):
    # # print("this is working :))")
    # print('channels now:', channels)
    return render_template('user.html', display_name=display_name, channels=channels)

@socketio.on("new_channel")
def create_channel(data):
    new_channel = (data["channel_name"], data["channel_creator"])
    print(f"new_channel is {new_channel}")#, type new_channel[0], type new_channel[1])
    if new_channel not in channels:
        # print(channels)
        channels.append(new_channel)   
        print('channels so far:',channels)     
        emit("channels", {"new_channel": new_channel}, broadcast=True)
    else:
        print("Trying to create an already existing channel!")

@app.route("/channel/<string:channel_name>", methods=["GET"])
def channel(channel_name):
    print('channel_name is', channel_name)
    if channel_name not in messages:
        list_messages = []
    else:
        list_messages= messages[channel_name] # messages is a list of (message_content, message_sender, time_sent)
    return render_template("channel.html", channel_name= channel_name, channels= channels, list_messages=list_messages)


@socketio.on("new_message")
def add_message(data):
    print("got here")
    channel_name= data["channel_name"]
    message_content = data["message_content"]
    message_sender = data["message_sender"]
    time_sent = data["time_sent"]

    #verify anything?
    #NOTE THAT MESSAGE_SENDER AND CHANNEL_NAME ARE DIRECTLY RELATED (IN VARIABLE MESSAGES)
    if channel_name in messages:
        messages[channel_name].append((message_content, message_sender, time_sent))
    else:
        messages[channel_name] = [(message_content, message_sender, time_sent)]
    print(messages)
    emit("messages", data ,broadcast=True)
