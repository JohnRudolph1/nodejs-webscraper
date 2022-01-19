const feedDisplay = document.querySelector("#feed");

fetch("http://localhost:4200/results")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((article) => {
      const articleItem =
      
        `<div><h3> 
        ${article.title}
        </h3>` +
        `<div><h3> 
        ${article.date}
        </h3>` +
        `<div><h3> 
        ${article.location}
        </h3>` +
        `<a href = "${article.url}">Event Link</a>
        </div><br><br>`;
      feedDisplay.insertAdjacentHTML("beforeend", articleItem);
    });
  })
  .catch((err) => console.log(err));

//find a way to format the children
