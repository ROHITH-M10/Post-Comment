import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm'; // Assuming you have a separate CommentForm component for adding comments

function ShowComments({ post }) {  

  return (
            <div className="comments">
                {post.comments.map((comment) => (
                <div key={comment.id} className="comment">
                    <div className='comment-by'>@{comment.author}</div>
                    {
                      comment.style === 'link' ? (
                        <a href={comment.content} target='_blank' className={`comment-content-list ${comment.style}`}>{comment.content}</a>
                      ) : (
                        <div className= {`comment-content-list ${comment.style}`}>{comment.content}</div>
                      )
                    }
                
                    <div className='time-stamp'>{comment.timestamp}</div>
                </div>
                ))}
            </div>
    );
}

export default ShowComments;
