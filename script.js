document.addEventListener("DOMContentLoaded", function () {
  const commentButtons = document.querySelectorAll(".btn-comment");
  const likeButton = document.querySelector(".btn-like");
  const toggleCommentsButton = document.querySelector(".toggle-comments");

  commentButtons.forEach((button) => {
    button.addEventListener("click", function () {
      document.getElementById("commentModal").style.display = "block";
    });
  });

  const closeButton = document.querySelector(".close");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      document.getElementById("commentModal").style.display = "none";
    });
  }

  const commentForm = document.getElementById("commentForm");
  if (commentForm) {
    commentForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission
      handleCommentSubmission();
    });
  }

  if (likeButton) {
    likeButton.addEventListener("click", function () {
      handleLike();
    });
  }

  if (toggleCommentsButton) {
    toggleCommentsButton.addEventListener("click", function () {
      const commentsSection = document.querySelector(".comment-list");
      if (commentsSection) {
        commentsSection.classList.toggle("hidden");
        this.classList.toggle("rotate-down");
      }
    });
  }

  updateCounts();
});

function handleCommentSubmission() {
  const commentName = document.getElementById("commentName").value.trim();
  const commentText = document.getElementById("commentText").value.trim();

  if (!commentName) {
    alert("Please enter your name.");
    return;
  }

  if (!commentText) {
    alert("Please enter a comment.");
    return;
  }

  const commentList = document.querySelector(".comment-list");
  const newComment = document.createElement("li");
  newComment.innerHTML = `<strong>${commentName}</strong>: ${commentText}`;
  if (commentList) {
    commentList.appendChild(newComment);
  }

  document.getElementById("commentName").value = "";
  document.getElementById("commentText").value = "";
  document.getElementById("commentModal").style.display = "none";

  updateCommentCount(1); // Assuming post ID is 1
}

function handleLike() {
  updateLikeCount(1); // Assuming post ID is 1
}

function updateCommentCount(postId) {
  let commentCount = localStorage.getItem(`commentCount${postId}`) || 0;
  commentCount++;
  localStorage.setItem(`commentCount${postId}`, commentCount);
  updateCounts();
}

function updateLikeCount(postId) {
  let likeCount = localStorage.getItem(`likeCount${postId}`) || 0;
  likeCount++;
  localStorage.setItem(`likeCount${postId}`, likeCount);
  updateCounts();
}

function updateCounts() {
  const likeCount1 = localStorage.getItem("likeCount1") || 0;
  const commentCount1 = localStorage.getItem("commentCount1") || 0;

  document.getElementById("likeCount1").textContent = likeCount1;
  document.getElementById("commentCount1").textContent = commentCount1;

  // Repeat for other posts
  const likeCount2 = localStorage.getItem("likeCount2") || 0;
  const commentCount2 = localStorage.getItem("commentCount2") || 0;

  document.getElementById("likeCount2").textContent = likeCount2;
  document.getElementById("commentCount2").textContent = commentCount2;
}
