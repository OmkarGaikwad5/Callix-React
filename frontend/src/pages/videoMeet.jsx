import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import { Badge, IconButton, TextField, Box, Paper, Typography, Tooltip, Snackbar, Alert } from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import styles from "../styles/videoComponent.module.css";
import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import ChatIcon from '@mui/icons-material/Chat'
import { useNavigate } from "react-router-dom";
import { showAlert, useAlert } from "../contexts/AlertContext.jsx"

const server_url = "http://localhost:8000";
var connections = {};

const peerConfigConnections = {
  "iceServers": [
    { "urls": "stun:stun.l.google.com:19302" }
  ]
}

export default function VideoMeetComponent() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  var socketRef = useRef();
  let socketIdRef = useRef();

  let localVideoref = useRef();

  let [videoAvailable, setVideoAvailable] = useState(true);
  const [error, setError] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  let [audioAvailable, setAudioAvailable] = useState(true);

  let [video, setVideo] = useState([]);

  let [audio, setAudio] = useState();

  let [screen, setScreen] = useState();

  let [showModal, setModal] = useState(true);

  let [screenAvailable, setScreenAvailable] = useState();

  let [messages, setMessages] = useState([])

  let [message, setMessage] = useState("");

  let [newMessages, setNewMessages] = useState(3);

  let [askForUsername, setAskForUsername] = useState(true);

  let [username, setUsername] = useState("");

  const videoRef = useRef([])

  let [videos, setVideos] = useState([])

  // TODO
  // if(isChrome() === false) {


  // }

  useEffect(() => {
    console.log("HELLO")
    getPermissions();

  })

  let getDislayMedia = () => {
    if (screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
          .then(getDislayMediaSuccess)
          .then((stream) => { })
          .catch((e) => console.log(e))
      }
    }
  }

  const getPermissions = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoPermission) {
        setVideoAvailable(true);
        console.log('Video permission granted');
      } else {
        setVideoAvailable(false);
        console.log('Video permission denied');
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (audioPermission) {
        setAudioAvailable(true);
        console.log('Audio permission granted');
      } else {
        setAudioAvailable(false);
        console.log('Audio permission denied');
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoref.current) {
            localVideoref.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMedia();
      console.log("SET STATE HAS ", video, audio);

    }


  }, [video, audio])
  let getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);
    connectToSocketServer();

  }


  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => setCopySuccess(true))
      .catch(() => alert("Failed to copy link"));
  };

  let getUserMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach(track => track.stop())
    } catch (e) { console.log(e) }

    window.localStream = stream
    localVideoref.current.srcObject = stream

    for (let id in connections) {
      if (id === socketIdRef.current) continue

      connections[id].addStream(window.localStream)

      connections[id].createOffer().then((description) => {
        console.log(description)
        connections[id].setLocalDescription(description)
          .then(() => {
            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
          })
          .catch(e => console.log(e))
      })
    }

    stream.getTracks().forEach(track => track.onended = () => {
      setVideo(false);
      setAudio(false);

      try {
        let tracks = localVideoref.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
      } catch (e) { console.log(e) }

      let blackSilence = (...args) => new MediaStream([black(...args), silence()])
      window.localStream = blackSilence()
      localVideoref.current.srcObject = window.localStream

      for (let id in connections) {
        connections[id].addStream(window.localStream)

        connections[id].createOffer().then((description) => {
          connections[id].setLocalDescription(description)
            .then(() => {
              socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
            })
            .catch(e => console.log(e))
        })
      }
    })
  }

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
        .then(getUserMediaSuccess)
        .then((stream) => { })
        .catch((e) => console.log(e))
    } else {
      try {
        let tracks = localVideoref.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
      } catch (e) { }
    }
  }





  let getDislayMediaSuccess = (stream) => {
    console.log("HERE")
    try {
      window.localStream.getTracks().forEach(track => track.stop())
    } catch (e) { console.log(e) }

    window.localStream = stream
    localVideoref.current.srcObject = stream

    for (let id in connections) {
      if (id === socketIdRef.current) continue

      connections[id].addStream(window.localStream)

      connections[id].createOffer().then((description) => {
        connections[id].setLocalDescription(description)
          .then(() => {
            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
          })
          .catch(e => console.log(e))
      })
    }

    stream.getTracks().forEach(track => track.onended = () => {
      setScreen(false)

      try {
        let tracks = localVideoref.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
      } catch (e) { console.log(e) }

      let blackSilence = (...args) => new MediaStream([black(...args), silence()])
      window.localStream = blackSilence()
      localVideoref.current.srcObject = window.localStream

      getUserMedia()

    })
  }

  let gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message)

    if (fromId !== socketIdRef.current) {
      if (signal.sdp) {
        connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
          if (signal.sdp.type === 'offer') {
            connections[fromId].createAnswer().then((description) => {
              connections[fromId].setLocalDescription(description).then(() => {
                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
              }).catch(e => console.log(e))
            }).catch(e => console.log(e))
          }
        }).catch(e => console.log(e))
      }

      if (signal.ice) {
        connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
      }
    }
  }




  let connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, { secure: false })

    socketRef.current.on('signal', gotMessageFromServer)

    socketRef.current.on('connect', () => {
      socketRef.current.emit('join-call', window.location.href);

      // ✅ Reset chat messages when a new meeting starts
      setMessages([]);
      setNewMessages(0);

      socketIdRef.current = socketRef.current.id

      socketRef.current.off('chat-message'); // <-- Important

      socketRef.current.on('chat-message', addMessage)

      socketRef.current.on('user-left', (id) => {
        setVideos((videos) => videos.filter((video) => video.socketId !== id))
      })

      socketRef.current.on('user-joined', (id, clients) => {
        clients.forEach((socketListId) => {

          connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
          // Wait for their ice candidate       
          connections[socketListId].onicecandidate = function (event) {
            if (event.candidate != null) {
              socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
            }
          }

          // Wait for their video stream
          connections[socketListId].onaddstream = (event) => {
            console.log("BEFORE:", videoRef.current);
            console.log("FINDING ID: ", socketListId);

            let videoExists = videoRef.current.find(video => video.socketId === socketListId);

            if (videoExists) {
              console.log("FOUND EXISTING");

              // Update the stream of the existing video
              setVideos(videos => {
                const updatedVideos = videos.map(video =>
                  video.socketId === socketListId ? { ...video, stream: event.stream } : video
                );
                videoRef.current = updatedVideos;
                return updatedVideos;
              });
            } else {
              // Create a new video
              console.log("CREATING NEW");
              let newVideo = {
                socketId: socketListId,
                stream: event.stream,
                autoplay: true,
                playsinline: true
              };

              setVideos(videos => {
                const updatedVideos = [...videos, newVideo];
                videoRef.current = updatedVideos;
                return updatedVideos;
              });
            }
          };


          // Add the local video stream
          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream)
          } else {
            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            connections[socketListId].addStream(window.localStream)
          }
        })

        if (id === socketIdRef.current) {
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue

            try {
              connections[id2].addStream(window.localStream)
            } catch (e) { }

            connections[id2].createOffer().then((description) => {
              connections[id2].setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
                })
                .catch(e => console.log(e))
            })
          }
        }
      })
      socketRef.current.on('disconnect', () => {
        setMessages([]);
        setNewMessages(0);
      });

    })
  }

  let silence = () => {
    let ctx = new AudioContext()
    let oscillator = ctx.createOscillator()
    let dst = oscillator.connect(ctx.createMediaStreamDestination())
    oscillator.start()
    ctx.resume()
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
  }
  let black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), { width, height })
    canvas.getContext('2d').fillRect(0, 0, width, height)
    let stream = canvas.captureStream()
    return Object.assign(stream.getVideoTracks()[0], { enabled: false })
  }

  const handleVideo = () => {
    const videoTracks = localVideoref.current?.srcObject?.getVideoTracks();
    if (videoTracks && videoTracks.length > 0) {
      const currentEnabled = videoTracks[0].enabled;
      const newEnabled = !currentEnabled;
      videoTracks[0].enabled = newEnabled;
      setVideo(newEnabled); // Always set the state based on actual track status
    }
  };


  let handleAudio = () => {
    setAudio(!audio)
    // getUserMedia();
  }



  const handleConnect = () => {
    if (!username.trim()) {
      setError(true);
      return;
    }
    setError(false);
    connect();
  };


  useEffect(() => {
    if (screen !== undefined) {
      getDislayMedia();
    }
  }, [screen])
  let handleScreen = () => {
    setScreen(!screen);
  }

  const handleEndCall = () => {
    try {
      // Stop all tracks from local stream
      if (window.localStream) {
        window.localStream.getTracks().forEach((track) => {
          track.stop();
        });
        window.localStream = null;
      }

      // Optional: clear video ref
      if (localVideoref.current) {
        localVideoref.current.srcObject = null;
      }

      // Navigate away after cleanup
      navigate("/home");
      Alert("Meeting Ended Successfully", "success"); // or your route
    } catch (e) {
      console.error("Error stopping media tracks:", e);
    }
  };


  let openChat = () => {
    setModal(true);
    setNewMessages(0);
  }
  let closeChat = () => {
    setModal(false);
  }
  let handleMessage = (e) => {
    setMessage(e.target.value);
  }

  const addMessage = (data, sender, socketIdSender) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: sender, data: data }
    ]);
    if (socketIdSender !== socketIdRef.current) {
      setNewMessages((prevNewMessages) => prevNewMessages + 1);
    }
  };



  let sendMessage = () => {
    console.log(socketRef.current);
    socketRef.current.emit('chat-message', message, username)
    setMessage("");

    // this.setState({ message: "", sender: username })
  }


  let connect = () => {
    setAskForUsername(false);
    getMedia();
  }


  return (
    <div>

      {askForUsername === true ?

        <Box
          sx={{
            minHeight: '100vh',
            width: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: 2,
          }}
        >
          {/* Animated Background Blobs */}
          <motion.div
            style={{
              position: 'absolute',
              top: '-150px',
              left: '-100px',
              width: 300,
              height: 300,
              borderRadius: '50%',
              zIndex: 0,
            }}

          />
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-150px',
              right: '-100px',
              width: 250,
              height: 250,
              borderRadius: '50%',
              zIndex: 0,
            }}

          />

          <motion.div

            style={{ width: '100%', maxWidth: 500, zIndex: 1 }}
          >
            <Paper
              elevation={6}
              sx={{
                padding: 4,
                borderRadius: 4,
                textAlign: 'center',
                backdropFilter: 'blur(10px)',

              }}
            >


              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
              >
                Enter the Lobby
              </Typography>

              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(false);
                }}
                fullWidth
                error={error}
                helperText={error ? 'Username is required' : ''}
                sx={{
                  mb: 3,
                  '& .MuiInputBase-root': {
                    borderRadius: 2,

                  },
                  input: {
                  },
                }}
              />

              <Button
                variant="contained"
                size="large"
                onClick={handleConnect}
                fullWidth
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  transition: '0.3s',
                  '&:hover': {
                  },
                }}
              >
                Connect
              </Button>

              <Box
                mt={4}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '2px solid #ccc',
                }}
              >
                <video
                  ref={localVideoref}
                  autoPlay
                  muted
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                  }}
                />
              </Box>
            </Paper>
          </motion.div>
        </Box> :


        <div className={styles.meetVideoContainer}>
          {/* Chat Box - shown only if modal is active and screen is wide enough */}
          {showModal && (
            <div className={styles.chatRoom}>
              <div className={styles.chatContainer}>
                <h1>Chat</h1>
                <Button
                  onClick={() => setModal(false)}
                  variant="outlined"
                  color="error"
                  style={{ alignSelf: "flex-end", marginBottom: "10px" }}
                >
                  Close
                </Button>

                <div className={styles.chattingDisplay}>
                  {messages.length !== 0 ? (
                    messages.map((item, index) => (
                      <div key={index} style={{ marginBottom: "20px" }}>
                        <p style={{ fontWeight: "bold" }}>{item.sender}</p>
                        <p>{item.data}</p>
                      </div>
                    ))
                  ) : (
                    <p>No Messages Yet</p>
                  )}
                </div>

                <div className={styles.chattingArea}>
                  <TextField
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="outlined-basic"
                    label="Enter Your chat"
                    variant="outlined"
                    fullWidth
                  />
                  <Button variant="contained" onClick={sendMessage}>
                    Send
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Button Controls */}
          <div className="button-container-bar">
            <IconButton onClick={handleVideo} style={{ color: "white" }}>
              {video ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>

            <Tooltip title="Copy Meeting Link">
              <IconButton onClick={handleShareLink} style={{ color: "white" }}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>

            <Snackbar
              open={copySuccess}
              autoHideDuration={3000}
              onClose={() => setCopySuccess(false)}
              message="Meeting link copied to clipboard!"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />

            <IconButton onClick={handleEndCall} style={{ color: "red" }}>
              <CallEndIcon />
            </IconButton>

            <IconButton onClick={handleAudio} style={{ color: "white" }}>
              {audio ? <MicIcon /> : <MicOffIcon />}
            </IconButton>

            {screenAvailable && (
              <IconButton onClick={handleScreen} style={{ color: "white" }}>
                {screen ? <ScreenShareIcon /> : <StopScreenShareIcon />}
              </IconButton>
            )}

            <Badge badgeContent={newMessages} max={999} color="error">
              <IconButton onClick={() => setModal(!showModal)} style={{ color: "white" }}>
                <ChatIcon />
              </IconButton>
            </Badge>
          </div>


          {/* Local User Video (Large if >5 participants) */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "20px",
              zIndex: 1000,
              width: videos.length === 0 ? "350px" : videos.length === 1 ? "220px" : "160px",
              height: videos.length === 0 ? "350px" : videos.length === 1 ? "150px" : "120px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 0 10px rgba(0,0,0,0.4)",
              backgroundColor: "#000",
            }}
          >
            <video
              ref={localVideoref}
              autoPlay
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",

              }}
            />
          </div>


          {/* Remote Users Videos */}
          <div className={styles.conferenceView}>
            {videos.map((video) => (
              <div className={styles.remoteVideoWrapper} key={video.socketId}>
                <video
                  data-socket={video.socketId}
                  ref={(ref) => {
                    if (ref && video.stream) {
                      ref.srcObject = video.stream;
                    }
                  }}
                  autoPlay
                />
              </div>
            ))}
          </div>
        </div>


      }

    </div>
  )
}
