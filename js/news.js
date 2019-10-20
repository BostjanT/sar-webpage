const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "quuudgeu6kvg",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "anFDgz6QfwXf8VYgCQQNCsE8KoJD2ZxLv3t-d1PMJzw"
});

// varibales

const displayNews = document.querySelector(".news-center");

// getting the news
class News {
  async getNews() {
    try {
      let contentful = await client.getEntries({
        content_type: "klubskeNovice"
      });
      console.log(contentful);

      /*  let result = await fetch("news.json");
      let data = await result.json(); */

      /* let news = data.news; */
      let news = contentful.items;
      news.sort(function (a, b) {
        return b - a;
      });

      news = news.map(item => {
        const {
          title,
          besedilo,
          id
        } = item.fields;
        const image = item.fields.image.fields.file.url;

        return {
          title,
          besedilo,
          image,
          id
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
        <article class="novica">
      <div class="img-container">
        <img 
        src="${news.image}" 
        alt="news image"
        class="news-img">
        <button class="news-btn" data-id="${news.id}">
        <a href="news.html?id=${news.id}">
          <i class="fas fa-book-reader">
          <span class="space">Preberite več<span></i>
        </a> 
        </button>
      </div>
      <h3 class="naslov font-weight-bold">${news.title}</h3>
    
    </article>
    

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