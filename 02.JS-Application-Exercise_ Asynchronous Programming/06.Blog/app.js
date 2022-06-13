function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getPosts);

    document.getElementById('btnViewPost').addEventListener('click', displayPost);

}

attachEvents();

async function getPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts';

    const respons = await fetch(url);
    const data = await respons.json();

    const select = document.getElementById('posts');
    Object.values(data).map(createOption).forEach(o => select.appendChild(o));
}

function createOption(post) {
    const result = document.createElement('option');
    result.textContent = post.title;
    result.value = post.id;

    return result;
}

function displayPost() {
    const postId = document.getElementById('posts').value;
    getCommentsByPostId(postId);
}

async function getCommentsByPostId(postId) {
    const postResponst = await fetch('http://localhost:3030/jsonstore/blog/posts/' + postId);
    const postData = await postResponst.json();

    document.getElementById('post-title').textContent = postData.title;
    document.getElementById('post-body').textContent = postData.body;


    const url = 'http://localhost:3030/jsonstore/blog/comments';
    const commentsRespons = await fetch(url);
    const commentsData = await commentsRespons.json();
    const comments = Object.values(commentsData).filter(c => c.postId == postId);

    const commentsUl = document.getElementById('post-comments');

    comments.map(createComment).forEach(c => commentsUl.appendChild(c));
}

function createComment(comment){

    const result = document.createElement('li');
    result.textContent = comment.text;
    result.id = comment.id;
    return result;
}