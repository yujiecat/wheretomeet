// import React from 'react';
// import DOMPurify from 'dompurify';
// import ReactHTMLParser from 'react-html-parser';
// import Avatar from 'react-avatar';
// import moment from 'moment'

// const Message = ({ avatar, name, content, date, time }) => {
// 	const clean = DOMPurify.sanitize(content);

// 	return(
// 		<Box>
// 			<Avatar
// 				size = {50}
// 				name = {name}
// 				src = {avatar}
// 			/>
// 			<div></div>
// 		</Box>
// 	);

// }

import React from 'react';
import moment from 'moment';
import DOMPurify from 'dompurify';
import 'src/styles/Message.css';

export default function Message(props) {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp
    } = props;

	const msg = DOMPurify.sanitize(data);

    const friendlyTimestamp = moment(data.timestamp).format('LLLL');
    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
        }

        <div className="bubble-container">
          <div className="bubble" title={friendlyTimestamp}>
            { msg }
          </div>
        </div>
      </div>
    );
}