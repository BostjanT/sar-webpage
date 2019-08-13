// varibales

const displayNews = document.getElementById("showNews");

// getting the products
class News {
  async getNewss() {
    try {
      let result = await fetch("news.json");
      let data = await result.json();

      let news = data.items;
      news = news.map(item => {
        const { title } = item.fields;

        const image = item.fields.image.fields.file.url;
        return { title, image };
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
                <p class="post-title"${news.title}</p>
                
              </div>
            </div>


    
     `;
    });
    productsDOM.innerHTML = result;
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
