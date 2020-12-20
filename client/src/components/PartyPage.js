import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";

import WatchedMediaImage from "../images/mediaToWatch.png";
import { checkResponse } from "../util/ResponseUtil";
import { getAuthName, getAuthToken } from "../util/AuthenticationUtil";
import Comment from "./Media/Comment";
import MediaBox from "./MediaBox";

export default function PartyPage() {
  const [progress, setProgress] = useState(0);
  const [buttonActive, setButtonActive] = useState({
    watch: true,
    finish: false,
  });
  const [partyId, setpartyId] = useState("");
  const [commentText, setCommentText] = useState("");
  const [participants, setParticipants] = useState([]);
  const [chat, setChat] = useState([]);
  const [participantText, setParticipantText] = useState("");

  const history = useHistory();

  useEffect(() => {
    let path = history.location.pathname.substring(7);
    setpartyId(path);

    const unListen = history.listen(() => {
      let path = history.location.pathname.substring(7);
      setpartyId(path);

      window.scrollTo(0, 0);
    });

    return () => {
      unListen();
    };
  }, []);

  useEffect(() => {
    // TODO fetch
    if ( partyId != "")
    {
        // fetch party participants
        fetch("http://localhost:4000/api/party/getParticipants", {
            method: "POST",
            mode: "cors",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            token: getAuthToken(),
            username: getAuthName(),

            partyId: partyId,
            }),
        })
            .then((r) => checkResponse(r))
            .then((r) => r.json())
            .then((r) => {
                setParticipants( r.data);
            })
            .catch((err) => {
            console.log(err);
            toast.error("Error, could not get party members!");
            });

        // TODO fetch these when how movie will be set determined!
        setProgress(0);
        setButtonActive({ watch: true, finish: false });
    }
  }, [partyId]);

  useEffect(() => {
    if (progress === 3) {
      // TODO fetch, update progress
      setButtonActive({ watch: false, finish: true });
    }
    if (progress === 4) {
      // TODO fetch, update finish
      setButtonActive({ watch: false, finish: false });
    }
  }, [progress]);

  const progressBar = (index) => {
    return (
      <div
        style={{
          display: "inline-block",
          width: index === 3 ? "34%" : "33%",
          height: "100%",
          backgroundColor: progress < index ? "gray" : "#303030",
          border: "1px black solid",
        }}
      />
    );
  };

  const handleChange = (e) => {
    const { value, name } = e.currentTarget;
    if (name === "commentText") {
      setCommentText(value);
    }
    if (name === "participantText") {
      setParticipantText(value);
    }
  };

  const handleCommentSend = () => {
    setChat([...chat, { name: getAuthName(), text: commentText }]);
  };

  const handleNewParticipant = () => {
    // fetch party participants
    fetch("http://localhost:4000/api/party/inviteParticipant", {
        method: "POST",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: getAuthToken(),
            username: getAuthName(),

            invitedUsername: participantText,
            partyId: partyId,
        }),
    })
    .then((r) => checkResponse(r))
    .then((r) => r.json())
    .then((r) => {
        setParticipantText("");
        toast.success( "User successfully invited to the party!");
    })
    .catch((err) => {
    console.log(err);
    toast.error("Error, could not invite the user to the party!");
    });
  };

  const handleDeleteParticipant = (clicked) => {
    // TOOD fetch

    let temp = [];
    participants.forEach((participant) => {
      if (clicked != participant) temp.push(participant);
    });
    setParticipants(temp);
  };

  return (
    <div className="row">
      <div className="col-9" style={{ borderRight: "2px solid black" }}>
        <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
          <div className="card bg-secondary">
            <h1 className="h1 text-center mt-5 text-white">{partyId}</h1>
            <div
              style={{
                height: "40vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "-50px",
              }}
            >
              <button
                className={`btn btn-success btn-lg p-5 w-25 ${
                  !buttonActive.watch && "disabled"
                }`}
                onClick={() => {
                  if (progress < 3) setProgress(progress + 1);
                }}
              >
                Watch
              </button>
              <button
                className={`btn btn-danger btn-lg p-5 w-25 ${
                  !buttonActive.finish && "disabled"
                }`}
                onClick={() => {
                  if (progress === 3) setProgress(progress + 1);
                }}
              >
                Finish
              </button>
            </div>
            <div style={{ height: "20px" }}>
              {progressBar(1)}
              {progressBar(2)}
              {progressBar(3)}
            </div>
          </div>

          <div
            className={`mt-4 ${
              (buttonActive.watch != false || buttonActive.finish != false) &&
              "d-none"
            }`}
          ></div>

          <div className="mt-4">
            <div className="card bg-white p-5">
              <h3>Chat</h3>
              <div
                className="border p-3"
                style={{ height: "25vh", overflowY: "scroll" }}
              >
                {chat.map((entry) => (
                  <React.Fragment className="mt-1">
                    <span className="h5">{entry.name + ": "}</span>
                    <span>{entry.text}</span>
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <div>
                <textarea
                  className="w-100 mt-4"
                  value={commentText}
                  onChange={handleChange}
                  name="commentText"
                />
                <button
                  className="btn btn-sm btn-success w-100 my-2"
                  onClick={() => {
                    handleCommentSend();
                    setCommentText("");
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-3 p-4">
        <h1 className="h1">Participants</h1>
        <hr />
        {participants.map((participant) => (
          <h3 className="h3 w-75">
            {participant.username}{" "}
            { participant.role != "ROLE_CREATOR" && participant.username != getAuthName() && (<button
              className="btn btn-danger btn-sm float-right"
              onClick={() => {
                handleDeleteParticipant(participant);
              }}
            >
              x
            </button>)}
            { participant.role == "ROLE_CREATOR" && (<label>Admin</label>)}
          </h3>
        ))}
        <input
          value={participantText}
          onChange={handleChange}
          className="w-75 mt-3"
          name="participantText"
        />
        <button
          className="btn btn-primary w-75 mt-2"
          onClick={handleNewParticipant}
        >
          Add participant
        </button>
      </div>
    </div>
  );
}
