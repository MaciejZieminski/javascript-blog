'use strict';

function titleClickHandler(event){
  const clickedElement = this;
  event.preventDefault();
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const activeSelector = clickedElement.getAttribute('href');
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(activeSelector);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post', optTitleSelector = '.post-title', optTitleListSelector = '.titles', optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = '') {
    /* [DONE] remove contents of titleList */
    let titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML='';
    /* for each article */
    let articles = document.querySelectorAll(optArticleSelector + customSelector);
    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      /* [DONE] insert link into titleList */
      titleList.insertAdjacentHTML("afterbegin", linkHTML);
    }
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags() {
  /* [DONE] find all articles */
  let articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = ' ';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* [DONE] generate HTML of the link */
      let linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
      /* [DONE] END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
  tagsWrapper.insertAdjacentHTML("afterbegin", html);
  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  let allTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* [DONE] START LOOP: for each active tag link */
  for (let tag of allTags) {
    /* remove class active */
    tag.classList.remove('active');
  }
  /* [DONE] END LOOP: for each active tag link */
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const allTagsHref = document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE] START LOOP: for each found tag link */
  for (let tag of allTagsHref) {
        /* [DONE] add class active */
    tag.classList.add('active');
  }
  /* [DONE] END LOOP: for each found tag link */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const allLinksToTags = document.querySelectorAll('.post-tags a')
  /* [DONE] START LOOP: for each link */
  for (let eachLink of allLinksToTags) {
  /* [DONE] add tagClickHandler as event listener for that link */
    eachLink.addEventListener('click', tagClickHandler);
  }
  /* [DONE] END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors () {
  /* [DONE] find all articles */
  /* START LOOP: for every article: */
    /* [DONE] find tags wrapper */
    /* [DONE] make html variable with empty string */
    /* [DONE] get tags from data-tags attribute */
    /* [DONE] split tags into array */
    /* [DONE] START LOOP: for each tag */
      /* [DONE] generate HTML of the link */
      /* [DONE] add generated code to html variable */
      /* [DONE] END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
  /* END LOOP: for every article: */
}

generateAuthors();

function authorClickHandler () {
  /* [DONE] prevent default action for this event */
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  /* find all tag links with class active */
  /* [DONE] START LOOP: for each active tag link */
    /* remove class active */
  /* [DONE] END LOOP: for each active tag link */
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  /* [DONE] START LOOP: for each found tag link */
        /* [DONE] add class active */
  /* [DONE] END LOOP: for each found tag link */
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToAuthors () {
  /* [DONE] find all links to tags */
  /* [DONE] START LOOP: for each link */
  /* [DONE] add tagClickHandler as event listener for that link */
  /* [DONE] END LOOP: for each link */
}
