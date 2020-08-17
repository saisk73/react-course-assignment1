var blogdata,response;

var url_string = window.location.href
var url = new URL(url_string);
var topic_param = url.searchParams.get("topic");

if(topic_param == null)
{
   fetch('https://api.waytoskill.com/assignments')
   .then(res => response = res.json())
   .then(data =>{
      blogdata = data;
      document.getElementById('total-blogs').innerHTML = blogdata.length;   
   })
.then(() =>{
   const container = document.getElementById('blog-container');   
   blogdata.forEach((blog, blogId) => {
      let random_color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
      // Construct card content
      const content = `
        <div id="blog-${blogId}" class="col-xl-3 col-lg-4 col-md-6 col-12 p-2">    
            <div class="border rounded-lg">
               <img class="blog-card-image rounded-top" src="${blog.imgurl}" />
               <div class="blog-body">
                  <p class="blog-title text-truncate">${blog.title}</p>
                  <p class="mb-0">
                     <a href="?topic=${blog.topic}" style="background-color:${random_color}80;" class="btn btn-sm border">${blog.topic}</a>
                  </p>
               </div>
            </div>
         </div>
      `;
      container.innerHTML += content;
    })
   
   }, 1000);

}
else
{
   fetch(`https://api.waytoskill.com/assignments?topic=${topic_param}`)
   .then(res => response = res.json())
   .then(data =>{
      blogdata = data;
      document.getElementById('total-blogs').innerHTML = blogdata.length;   
   })
   .then(() =>{
   const container = document.getElementById('blog-container');   
   // not the best pratice but it works
   if(blogdata.length >0)
   {
      blogdata.forEach((blog, blogId) => {
         let random_color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
         // empty container
         const content = `
           <div id="blog-${blogId}" class="col-xl-3 col-lg-4 col-md-6 col-12 p-2">    
               <div class="border rounded-lg">
                  <img class="blog-card-image rounded-top" src="${blog.imgurl}" />
                  <div class="blog-body">
                     <p class="blog-title text-truncate">${blog.title}</p>
                     <p class="mb-0">
                        <a href="?topic=${blog.topic}" style="background-color:${random_color}80;" class="btn btn-sm border">${blog.topic}</a>
                     </p>
                  </div>
               </div>
            </div>
         `;
         container.innerHTML += content;
       })
   }
   else
   {
      // card content
      const content = `
      <style>
      .filter-container
      {
         display: none !important;
      }
      </style>
      <div class="empty-container row justify-content-center align-content-center" style="height: 90vh;">
        <div class="col-md-6">    
            <p class="text-center text-secondary">
              <svg width="100px" height="100px" viewBox="0 0 16 16" class="bi bi-patch-exclamation" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                 <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                 <path fill-rule="evenodd" d="M10.273 2.513l-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
               </svg>
            </p>
            <h1 class="text-center font-weight-bold mt-4">Hmm....</h1>
            <h4 class="text-center"></h4>
            <h5 class="font-weight-bold text-center">something went wrong</h5>
            <p class="text-center text-secondary">
               Looks Empty over Here...The item you are looking for is not found.
            </p>
            <div class="row justify-content-center">
               <div class="col-md-auto col-sm-auto">
                  <a href="/" class="btn rounded-pill border" style="font-weight:500;">Return Home</a>
               </div>
            </div>
         </div>
      </div>
      `;
      container.innerHTML = content;
   }
   
   });
}


//search
function searchFunction()
{
   input = document.getElementById('search-bar').value.toUpperCase()
   var count = 0;
   for(i=0; i<blogdata.length; i++) {
      if(blogdata[`${i}`].title.toUpperCase().indexOf(input) > -1)
      {
         document.getElementById(`blog-${i}`).style.display= "";
         count = count + 1;
      }
      else
      {
         document.getElementById(`blog-${i}`).style.display= "none";
      }
   }
   document.getElementById('total-blogs').innerHTML = count;
}