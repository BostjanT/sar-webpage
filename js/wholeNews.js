import {
  documentToHtmlString
} from "@contentful/rich-text-html-renderer";

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "quuudgeu6kvg",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "anFDgz6QfwXf8VYgCQQNCsE8KoJD2ZxLv3t-d1PMJzw"
});

// varibales

const displayNews = document.querySelector(".display-news");

// getting the news
class News {
  async getNews() {
    try {
      let contentful = await client.getEntries({
        content_type: "klubskeNovice"
      });

      /* let result = await fetch("news.json");
      let data = await result.json(); */
      let news = contentful.items;
      /* let news = data.news; */
      news.sort(function (a, b) {
        return b - a;
      });

      news = news.map(item => {
        const {
          title,
          date
        } = item.fields;
        const {
          besedilo
        } = item.fields;
        const image = item.fields.image.fields.file.url;
        return {
          title,
          besedilo,
          image,
          date
        };
      });
      return news;
    } catch (error) {
      console.log(error);
    }
  }
}
// display news
class UI {
  displayNews(news) {
    let result = "";
    news.forEach(news => {
      result += `
      
            <div class="blog-content">
              <div class="img-container">
                <img src="${news.image}" alt="novica" />
              </div>
              <div class="date">${news.date}</div>
              <div class="post-title my-2 text-center font-weight-bold">
               ${news.title}
              </div>
              <div>
              < p class = "post-content mb-5" >
                 ${
                  documentToHtmlString(news.besedilo)
                } <
                /p>
              </div>
            </div>
        
    

    `;
    });

    displayNews.innerHTML = result;
  }
}

//local storage
class Storage {
  static saveNews(news) {
    localStorage.setItem("news", JSON.stringify(news));
  }
  static getNews(id) {
    let news = JSON.parse(localStorage.getItem("news"));
    return news.find(news => news.id === id);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const news = new News();

  // get all news
  news.getNews().then(news => {
    ui.displayNews(news);
    Storage.saveNews(news);
  });
});

/*  <div class="carousel-item col-md-3 active">
        <div class="blog-thumbnail">
        <a href="#"><img src="${news.image}" class="img-fluid mx-auto d-block" alt="slide 1"></a>
        <div class="blog-content">
          <span class="post-date">${news.title}</span>
          <p class="post-title">${news.besedilo}</p>
        </div>

        </div>

      </div> */