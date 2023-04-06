import { useState, useEffect } from 'react';
import axios from 'axios';
import "./CommentSection.css";

function CommentSection({ movieId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  
  useEffect(() => {
    // Fetch comments from localStorage or set to an empty array if it doesn't exist
    const existingComments = JSON.parse(localStorage.getItem(`comments_${movieId}`)) || [];
    setComments(existingComments);
  }, [movieId]);
  
  async function handleSubmit(event) {
    event.preventDefault();
    
    // Create a new comment object
    const newComment = { id: Date.now(), text: commentText };
    
    // Fetch existing comments from localStorage or create a new array if it doesn't exist
    const existingComments = JSON.parse(localStorage.getItem(`comments_${movieId}`)) || [];
    
    // Add the new comment to the existing comments array
    existingComments.push(newComment);
    
    // Save the updated comments array back to localStorage
    localStorage.setItem(`comments_${movieId}`, JSON.stringify(existingComments));
    
    // Update the comments state to re-render the comment section with the new comment
    setComments(existingComments);
    
    // Clear the comment text input
    setCommentText('');
  }
  
  return (
    <div class="comment-container">
  <div class="myComment">
    <form onSubmit={handleSubmit}>
    <textarea
  value={commentText}
  onChange={event => setCommentText(event.target.value)}
  className="comment-input"
/>
      <button type="submit">Submit Comment</button>
    </form>
    <div class="comments-list">
      {comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default CommentSection;
