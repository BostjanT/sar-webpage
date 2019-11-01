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
        try {client.getEntry("5wJ27H2CllS71QpUahdffd")
                .then((entry) => console.log(entry))
                .catch(console.error)
            /*  let contentful = await client.getEntry('5wJ27H2CllS71QpUahdffd') {
                 content_type: "klubskeNovice",
                 order: "sys.createdAt"

             }; */

            let news = contentful.items;
       
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
              <p class="post-content mb-5">${news.besedilo}</p>
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