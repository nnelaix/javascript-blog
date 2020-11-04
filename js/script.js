'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagSelector = '.post-tags .list';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');

};

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* [DONE] insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;

  }
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function generateTags() {
  /* find all articles */
  const articles = document.querySelector(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      /* add generated code to html variable */
      html = html + linkHTML;
      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = allTags.join(' ');

    /* END LOOP: for every article: */
  }
}
generateTags();

function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {

    /* remove class active */
  activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const sameTags = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let sameTag of sameTags) {

    /* add class active */
  sameTag.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){

  /* find all links to tags */
  const tags = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each link */
  for (let tag of tags) {
    /* add tagClickHandler as event listener for that link */
  tag.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
}

addClickListenersToTags();

/* add generate authors */

function generateAuthors() {

/* find all authors */ 
  const articles = document.querySelectorAll(optArticleAuthorSelector);

/* START LOOP: for every article */
  for (let article of articles) {

/* make html variable with empty string */ 
let html = '';

/* get author name from data-author atribute */
const articleAuthor = article.getAttribute('data-author');

/* END LOOP: for every article */ 
  }

generateAuthors(); 

function authorClickHandler(event) {

/* prevent default action for this event */
event.preventDefault();

/* make new constant named "clickedElement" and give it the value of "this" */
const clickedElement = this;

/* make a new constant "href" and read the attribute "href" of the clicked element */
const href = clickedElement.getAttribute('href');

/* make a new constant "tag" and extract tag from the "href" constant */
const tag = href.replace('#author-', '');

/* find all tag links with class active */
const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

/* START LOOP: for each active tag link */
for (let activeAuthor of activeAuthors) {

  /* remove class active */
activeAuthor.classList.remove('active');

/* END LOOP: for each active tag link */
}
/* find all tag links with "href" attribute equal to the "href" constant */
const sameAuthors = document.querySelectorAll('a[href="' + href + '"]');

/* START LOOP: for each found tag link */
for (let sameAuthor of sameAuthors) {

  /* add class active */
sameAuthor.classList.add('active');

/* END LOOP: for each found tag link */
  }

/* execute function "generateTitleLinks" with article selector as argument */
generateTitleLinks('[data-author="' + tag + '"]');

}



authorClickHandler();

function addClickListenersToAuthors() {

 /* find all links to tags */
 const tags = document.querySelectorAll('a[href^="#author-"]');

 /* START LOOP: for each link */
 for (let author of authors) {

   /* add tagClickHandler as event listener for that link */
 author.addEventListener('click', authorClickHandler);

 /* END LOOP: for each link */
  }

}
addClickListenersToTags();

}