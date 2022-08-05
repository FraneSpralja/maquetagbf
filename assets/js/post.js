const url = 'https://www.inteligenciaf.com/blog/wp-json/wp/v2/posts';

export function getPostWP() {
    fetch(url)
        .then(resp => resp.json())
        .then(posts => imprimirPostWP(posts));
}

function imprimirPostWP(content) {

    const posts = content.slice(0, 4);
    
    const postWP = document.querySelector('#post-wp')
    
    const groupList = document.createElement('ul'); 
    groupList.classList.add('post-list')

    const postTitle = document.createElement('h2');
    postTitle.classList.add('post-title-section');
    postTitle.textContent = 'Noticias'
    
    postWP.appendChild(postTitle);
    

    posts.forEach(post => {
        const listItem = document.createElement('li');

        const {title, content, date, link} = post;

        const titleEl = document.createElement('h3');
        titleEl.classList.add('post-title');
        titleEl.textContent = title.rendered;

        const contentEl = document.createElement('span');
        contentEl.classList.add('post-content');
        contentEl.textContent = caracteresMaxPost(content.rendered)

        const dateEl = document.createElement('span');
        dateEl.classList.add('post-date');
        dateEl.textContent = new Date(date).toLocaleDateString();

        const linkEl = document.createElement('a');
        linkEl.classList.add('post-link');
        linkEl.setAttribute('target', '_blank')
        linkEl.textContent = 'Ir a noticia';
        linkEl.href = link

        listItem.appendChild(dateEl)
        listItem.appendChild(titleEl);
        listItem.appendChild(contentEl);
        listItem.appendChild(linkEl);

        groupList.appendChild(listItem)
    });

    postWP.appendChild(groupList)
}

function caracteresMaxPost(content) {
    let postLimpio = content.replace( /(<([^>]+)>)/ig, '')
    
    if(postLimpio.length > 10) {
        postLimpio = `${postLimpio.substring(0,250)}...`;
        return postLimpio
    }

}