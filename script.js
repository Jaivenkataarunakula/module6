document.addEventListener('DOMContentLoaded', function () {
   // loadposts();

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(postData => {
            createPostElement(postData.title, postData.content, postData.comments);
        });
    }

    function savePosts(posts) {
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function createPostElement(title, content, comments) {
        const blogPostsSection = document.getElementById('blog-posts');

        const newPost = document.createElement('article');
        newPost.classList.add('post', 'fade-in');

        const postTitle = document.createElement('h2');
        postTitle.textContent = title;
        newPost.appendChild(postTitle);

        const postContent = document.createElement('p');
        postContent.textContent = content;
        newPost.appendChild(postContent);

        const likeButton = document.createElement('button');
        likeButton.classList.add('like-btn');
        likeButton.innerHTML = '<i class="fas fa-thumbs-up"></i> Like <span class="like-count">0</span>';
        newPost.appendChild(likeButton);

        const commentsSection = document.createElement('div');
        commentsSection.classList.add('comments-section');
        commentsSection.innerHTML = `
            <h3>Comments</h3>
            <ul class="comments-list"></ul>
            <input type="text" class="comment-input" placeholder="Add a comment">
            <button class="comment-btn">Post Comment</button>
        `;
        newPost.appendChild(commentsSection);

        if (comments && comments.length > 0) {
            const commentsList = commentsSection.querySelector('.comments-list');
            comments.forEach(comment => {
                const newComment = document.createElement('li');
                newComment.textContent = comment.text;
                commentsList.appendChild(newComment);
            });
        }

        blogPostsSection.appendChild(newPost);

        addEventListenersToPost(newPost);
    }

    function addEventListenersToPost(post) {
        const likeButton = post.querySelector('.like-btn');
        const commentButton = post.querySelector('.comment-btn');

        likeButton.addEventListener('click', function () {
            const likeCount = this.querySelector('.like-count');
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
        });

        commentButton.addEventListener('click', function () {
            const commentInput = post.querySelector('.comment-input');
            const commentsList = post.querySelector('.comments-list');

            if (commentInput.value.trim() !== '') {
                const newComment = document.createElement('li');
                newComment.textContent = commentInput.value;

                commentsList.appendChild(newComment);

                const postIndex = Array.from(post.parentNode.children).indexOf(post);
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts[postIndex].comments = posts[postIndex].comments || [];
        posts[postIndex].comments.push(newComment); // Save the new comment to the post
        localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage


                commentInput.value = '';
            }
        });
    }

    const addPostButton = document.getElementById('add-post-btn');

    addPostButton.addEventListener('click', function () {
        const titleInput = document.getElementById('new-post-title');
        const contentInput = document.getElementById('new-post-content');

        if (titleInput.value.trim() !== '' && contentInput.value.trim() !== '') {
            const newPost = {
                title: titleInput.value,
                content: contentInput.value,
                comments: []
            };

            createPostElement(newPost.title, newPost.content, newPost.comments);

            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.push(newPost);
            savePosts(posts);

            titleInput.value = '';
            contentInput.value = '';
        }
    });

    // Load existing posts on page load
    loadPosts();
});
