document.addEventListener("DOMContentLoaded", function () {
    new WOW().init();
    const blogContainer = document.getElementById('blog-container'); // Define blogContainer here

    // Check if blogContainer exists before proceeding
    if (!blogContainer) {
        console.error('Error: blogContainer not found in the DOM.');
        return;
    }

    fetch('blogs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Loop through the blog items in the JSON data
            data.forEach(blog => {
                console.log(blog);
                // Create HTML elements for each blog item
                const blogItem = document.createElement('div');
                blogItem.classList.add('col-md-4', 'wow', 'slideInUp');
                blogItem.innerHTML = `
                    <div class="blog-item bg-light rounded overflow-hidden">
                        
                        <div class="blog-img position-relative overflow-hidden">
                        <img class="img-fluid" src="${blog.image}" alt="">
                        <a class="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-5 py-2 px-4" href="">${blog.category}</a>
                    </div>
                    <div class="p-4">
                        <div class="d-flex mb-3">
                            <small class="me-3"><i class="far fa-user text-primary me-2"></i>${blog.author}</small>
                            <small><i class="far fa-calendar-alt text-primary me-2"></i>${blog.date}</small>
                        </div>
                        <h4 class="mb-3">${blog.title}</h4>
                        <p>${blog.content}</p>
                        <a class="text-uppercase" href="">Read More <i class="bi bi-arrow-right"></i></a>
                    </div>
                    </div>
                `;

                // Append the blog item to the container
                const row = blogContainer.querySelector('.row');
                row.appendChild(blogItem);

                // Debugging: Log the values
                console.log(blog.content);
                console.log(blog.title);
                console.log(blog.category);
            });
        })
        .catch(error => {
            console.error('Error fetching blog data:', error);
        });
});