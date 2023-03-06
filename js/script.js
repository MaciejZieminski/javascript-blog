'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCludLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

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

const optArticleSelector = '.post', optTitleSelector = '.post-title', optTitleListSelector = '.titles', optArticleTagsSelector = '.post-tags .list', optAritcleAuthorSelector = '.post-author', optTagsListSelector = '.list.tags', optCloudClassCount = 5, optCloudClassPrefix = 'tag-size-';

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
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      /* [DONE] insert link into titleList */
      titleList.insertAdjacentHTML("afterbegin", linkHTML);
    }
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function calculateTagsParams(tags) {
  const params = {max: 0, min: 999999};

  for(let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    else (tags[tag] < params.min); {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass (count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [DONE] create a new variable allTags with an empty object */
  let allTags = {};
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
      const linkHTML = templates.articleTagLink({ tag: tag });
      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
      /* [DONE] END LOOP: for each tag */
      /* [DONE] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)) {
        /* [DONE] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* insert HTML of all the links into the tags wrapper */
  tagsWrapper.insertAdjacentHTML("afterbegin", html);
  /* [DONE] END LOOP: for every article: */
  /* [DONE] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);
  let allTagsHTML = '';
  for (let tag in allTags) {
    const tagLinkHTML = '<li class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ')' + '</li>';
    allTagsHTML += tagLinkHTML;
  }
  tagList.innerHTML = allTagsHTML;
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
  let allTag = document.querySelectorAll('a.active[href^="#tag-"]');
  /* [DONE] START LOOP: for each active tag link */
  for (let tag of allTag) {
    /* remove class active */
    tag.classList.remove('active');
  }
  /* [DONE] END LOOP: for each active tag link */
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const allTagHref = document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE] START LOOP: for each found tag link */
  for (let tag of allTagHref) {
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
  let articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  let authorWrapper = document.querySelector('.list.authors');
  for (let article of articles) {
    const articleAuthor = article.getAttribute('data-author');
    let linkHTML = '<li><a href="#au-' + articleAuthor + '"><span>' + articleAuthor +  '</span></a></li>';
    html = html + linkHTML;
  }
  authorWrapper.insertAdjacentHTML("afterbegin", html);
}

generateAuthors();

function authorClickHandler (event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  console.log(href);
  const author = href.replace('#-au', '');
  console.log(author);
  let allAuthors = document.querySelectorAll('a.active[href^="#-au"]');
  for (let author_1 of allAuthors) {
    author_1.classList.remove('active');
  }
  const allAuthHref = document.querySelectorAll('a[href="' + href + '"]');
  for (let one of allAuthHref) {
    one.classList.add('active');
  }
  generateTitleLinks('[data-author="' + href + '"]');
}

function addClickListenersToAuthors () {
  const allLinkToAuthors = document.querySelectorAll('.list authors');
  for (let link of allLinkToAuthors) {
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
