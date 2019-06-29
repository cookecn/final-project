import React, { Component } from 'react';
import { StreamApp, FlatFeed, LikeButton, Activity, CommentField, CommentList, StatusUpdateForm } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';

class Stream extends Component {
    render() {
        return(
            <StreamApp
            apiKey={process.env.REACT_APP_GETSTREAM_APP_KEY}
            appId={process.env.REACT_APP_GETSTREAM_APP_ID}
            token={process.env.REACT_APP_GETSTREAM_APP_TOKEN}
            >
            <StatusUpdateForm feedGroup="timeline" userId="the-user-id" />
            <FlatFeed
          options={{reactions: { recent: true } }}
          notify
          Activity={(props) =>
              <Activity {...props}
                Footer={() => (
                  <div style={ {padding: '8px 16px'} }>
                    <LikeButton {...props} />
                    <CommentField
                      activity={props.activity}
                      onAddReaction={props.onAddReaction} />
                    <CommentList activityId={props.activity.id} />
                  </div>
                )}
              />
            }
            />
            </StreamApp>
        )
    }
}

export default Stream;