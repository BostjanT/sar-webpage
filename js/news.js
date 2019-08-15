// varibales

const displayNews = document.querySelector(".video-slides", "owl-carousel");

// getting the products
class News {
  async getNews() {
    try {
      let result = await fetch("news.json");
      let data = await result.json();

      let news = data.news;

      news = news.map(item => {
        const { title, besedilo } = item.fields;

        const image = item.fields.image.fields.file.url;
        return { title, besedilo, image };
      });
      return news;
    } catch (error) {
      console.log(error);
    }
  }
}
// display products
class UI {
  displayNews(news) {
    let result = "";
    news.forEach(news => {
      result += `
      
<!-- Single News Area -->
            <div class="single-blog-post style-3">
              <!-- Blog Thumbnail -->
              <div class="blog-thumbnail">
                <a href="#"><img src="${news.image}" alt=""></a>
              
              </div>

              <!-- Blog Content -->
              <div class="blog-content">
                <span class="post-date">June 20, 2018</span>
                <p class="post-title">${news.title}</p>
                <p class="post-details-content text-white">${news.besedilo}</p>
                
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

  // get all products
  news.getNews().then(news => {
    ui.displayNews(news);
    Storage.saveNews(news);
  });
});
