import React, { Component } from 'react';
import { StreamApp, NotificationDropdown, FlatFeed, LikeButton, Activity, CommentField, CommentList, StatusUpdateForm } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';

class Stream extends Component {
    render() {
        return(
            <StreamApp
            apiKey={process.env.REACT_APP_GETSTREAM_KEY}
            appId={process.env.REACT_APP_GETSTREAM_ID}
            token={process.env.REACT_APP_GETSTREAM_TOKEN}
            >
            <NotificationDropdown notify/>
            <StatusUpdateForm feedGroup="timeline" userId="user-colby" />
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