'use strict';

function titleClickHandler(event){
  console.log('Link was clicked!');
  console.log(event);
  const clickedElement = this;
  event.preventDefault();
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement: ', clickedElement);
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const activeSelector = clickedElement.getAttribute('href');
  console.log("activeSelector: ", activeSelector);
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(activeSelector);
  console.log("targetArticle: ", targetArticle);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post', optTitleSelector = '.post-title', optTitleListSelector = '.titles';

function generateTitleLinks() {
    /* [DONE] remove contents of titleList */
    let titleList = document.querySelector(optTitleListSelector);
    console.log(titleList);
    titleList.innerHTML='';

    /* for each article */

    let articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log(articleId);
      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);
      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);
      /* [DONE] insert link into titleList */
      titleList.insertAdjacentHTML("afterbegin", linkHTML);
    }

}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log(links);
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
