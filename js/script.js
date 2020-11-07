'use strict'; 

const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.tags.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.authors'

};

const opts = {
  tagSizes: {
    count: 5,
    classPrefix: 'tag-size-',
  },
};
  
const select = {
  all: {
    articles: '.post',
    linksTo: {
      tags: 'a[href^="#tag-"]',
      authors: 'a[href^="#author-"]',
    },
  },
  article: {
    tags: '.post-tags .list',
    author: '.post-author',
  },
  listOf: {
    titles: '.titles',
    tags: '.tags.list',
    authors: '.authors.list',
  },
};

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
  const activeArticles = document.querySelectorAll('.post article.active');
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

function generateTitleLinks(customSelector = '') {

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(opt.titleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */
  const articles = document.querySelectorAll(opt.articleSelector + customSelector);
  let html = '';

  for (let article of articles) {

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

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

function calculateTagsParams(tags) {
  console.log('tags', tags); 

  const params = { max: 0, min: 999999 };

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params) {

  const normalizedCount = count - params.min; 
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opt.CloudClassCount - 1) + 1);

  return opt.CloudClassPrefix + classNumber; 

}


function generateTags() {

  /* [NEW] 7.3 create a new variable allTags with an empty object */
  let allTags = {};
  // console.log('allTags', allTags);
  
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);
  
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
  
    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(opt.articleTagSelector);
    tagsWrapper.innerHTML = '';
  
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
  
    /* [DONE] split tags into array */
  
    const articleTagsArray = articleTags.split(' ');
	
	
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
  
      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
  
      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
  
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
  
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* [DONE] END LOOP: for each tag */
    }
  
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  
    /* [DONE] END LOOP: for every article: */
  }
  
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opt.tagsListSelector);
  
  /* 7.3 */
  // console.log('tagsParams:', tagsParams);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  
  /* [NEW] 7.3 create variable for all links HTML code */
  let allTagsHTML = '';
  
  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {

    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
	
    /* allTagsHTML += tagLinkHTML; */
    allTagsHTML += tagLinkHTML;
	
    /* [NEW] END LOOP: for each tag in allTags: */
  }
  
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}  

generateTags();

function tagClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

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

function addClickListenersToTags() {

  /* find all links to tags */
  const tags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let tag of tags) {
    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

/* add generate authors */

function generateAuthors() {

  /* find all authors */
  const articles = document.querySelectorAll(opt.articleSelector);

  /* START LOOP: for every article */
  for (let article of articles) {

    /* find authors wrapper */
    const authorsWrapper = article.querySelector(opt.articleAuthorSelector);
    authorsWrapper.innerHTML = '';
	
    /* make html variable with empty string */
    let html = '';

    /* generate HTML of the link */
    const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
	
    /* [DONE] add generated code to html variable */
	
    /* [DONE] insert HTML of all the authors into the tags wrapper */
    authorsWrapper.innerHTML = html;

    /* get author name from data-author atribute */
    const articleAuthor = article.getAttribute('data-author');

    /* END LOOP: for every article */
  }
}

generateAuthors();

function authorClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all authors with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author  */
  for (let activeAuthor of activeAuthors) {

    /* remove class active */
    activeAuthor.classList.remove('active');

    /* END LOOP: for each active author link */
  }
  /* find all authors with "href" attribute equal to the "href" constant */
  const sameAuthors = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author */
  for (let sameAuthor of sameAuthors) {

    /* add class active */
    sameAuthor.classList.add('active');

    /* END LOOP: for each found author */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

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


