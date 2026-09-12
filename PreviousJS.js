const lessons = {

    iot: {
        title: "Internet of Things (IoT)",
        description: "Internet of Things recordings.",

        videos: [
            {
                title: "IoT Introduction",
                description: "Introduction to Internet of Things",
                youtube: "YOUR_IOT_VIDEO_ID"
            }
        ]
    },


    webdev: {
        title: "Web Development",
        description: "HTML, CSS and JavaScript recordings.",

        videos: [
            {
                title: "Web Development Introduction",
                description: "Introduction to Web Development",
                youtube: "YOUR_WEBDEV_VIDEO_ID"
            },
			
            {
                title: "Web Development Introduction",
                description: "Introduction to Web Development",
                youtube: "YOUR_WEBDEV_VIDEO_ID"
            },{
                title: "Web Development Introduction",
                description: "Introduction to Web Development",
                youtube: "YOUR_WEBDEV_VIDEO_ID"
            },
			
            {
                title: "Web Development Introduction",
                description: "Introduction to Web Development",
                youtube: "YOUR_WEBDEV_VIDEO_ID"
            },{
                title: "Web Development Introduction",
                description: "Introduction to Web Development",
                youtube: "YOUR_WEBDEV_VIDEO_ID"
            },
			
            {
                title: "Web Development Introduction",
                description: "Introduction to Web Development",
                youtube: "YOUR_WEBDEV_VIDEO_ID"
            },
			{
                title: "Web Development Introduction",
                description: "Introduction to Web Development",
                youtube: "YOUR_WEBDEV_VIDEO_ID"
            },
			
        ]
    },


    python: {
        title: "Python",
        description: "Python programming recordings.",
  
        videos: [
            {
                title: "Python Introduction",
                description: "Introduction to Python programming",
                youtube: "exOfeLnbfSM"
            },

            {
                title: "Python Variables",
                description: "Variables and data types",
                youtube: "YOUR_PYTHON_VIDEO_ID_2"
            }
        ]
    },


    os: {
        title: "Operating Systems",
        description: "Operating Systems recordings.",

        videos: [
            {
                title: "OS Revision Day 01",
                description: "Introduction to Operating Systems",
                youtube: "wGj4zKeR_pY"
            },
			{
                title: "OS Revision Day 02",
                description: "Introduction to Operating Systems",
                youtube: "wsjGxqMrM90"
            },
			{
                title: "OS Revision Day 03",
                description: "Introduction to Operating Systems",
                youtube: "LAzhgDXrxkc"
            },
			{
                title: "OS Revision Day 04",
                description: "Introduction to Operating Systems",
                youtube: "LpYYkTpF8EM"
            },
			{
                title: "OS Revision Day 05",
                description: "Introduction to Operating Systems",
                youtube: "CXmOmivK5VA"
            },
			{
                title: "OS Revision Day 06",
                description: "Introduction to Operating Systems",
                youtube: "R0aZRefJf64"
            },
        ]
    },


    number: {
        title: "Number Systems",
        description: "Number system recordings.",

        videos: [
            {
                title: "Number Systems Introduction",
                description: "Introduction to Number Systems",
                youtube: "YOUR_NUMBER_VIDEO_ID"
            }
        ]
    },


    logic: {
        title: "Logic Gates",
        description: "Digital logic and logic gate recordings.",

        videos: [
            {
                title: "Logic Gates Introduction",
                description: "Introduction to Logic Gates",
                youtube: "YOUR_LOGIC_VIDEO_ID"
            }
        ]
    },


    networking: {
        title: "Networking",
        description: "Computer networking recordings.",

        videos: [
            {
                title: "Networking Introduction",
                description: "Introduction to Computer Networking",
                youtube: "YOUR_NETWORKING_VIDEO_ID"
            }
        ]
    },


    database: {
        title: "Database",
        description: "Database recordings.",

        videos: [
            {
                title: "Database Introduction",
                description: "Introduction to Databases",
                youtube: "YOUR_DATABASE_VIDEO_ID"
            }
        ]
    },


    information: {
        title: "Information Systems",
        description: "Information Systems recordings.",

        videos: [
            {
                title: "Information Systems Introduction",
                description: "Introduction to Information Systems",
                youtube: "YOUR_INFORMATION_VIDEO_ID"
            }
        ]
    },


    ecommerce: {
        title: "E-Commerce",
        description: "Electronic commerce recordings.",

        videos: [
            {
                title: "E-Commerce Introduction",
                description: "Introduction to E-Commerce",
                youtube: "YOUR_ECOMMERCE_VIDEO_ID"
            }
        ]
    },


    future: {
        title: "Future Trends",
        description: "Future ICT trends recordings.",

        videos: [
            {
                title: "Future Trends in ICT",
                description: "Emerging trends in ICT",
                youtube: "YOUR_FUTURE_VIDEO_ID"
            }
        ]
    }

};




function openLesson(lessonId, clickedButton) {

    const lesson = lessons[lessonId];

    if (!lesson) {
        console.error("Lesson not found:", lessonId);
        return;
    }

    const grid = document.getElementById("recordingGrid");

    if (!grid) {
        console.error("recordingGrid was not found.");
        return;
    }


    /*innerHTML REPLACES wenw previous lesson ekk.
       Therefore Python disappears when another
       lesson is selected.
	   GOTCHA*/

    let html = `

        <div class="lesson-heading">

            <div>
                <h2>${lesson.title}</h2>
                <span>${lesson.description}</span>
            </div>

            <span>
                ${lesson.videos.length} recording(s)
            </span>

        </div>

    `;


    lesson.videos.forEach((video) => {

        html += `

            <article class="video-card">

                <div class="video-container">

                    <iframe
                        src="https://www.youtube.com/embed/${video.youtube}"
                        title="${video.title}"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>

                </div>

                <div class="video-info">

                    <h3>${video.title}</h3>

                    <p>${video.description}</p>

                </div>

            </article>

        `;

    });


    

    grid.innerHTML = html;
	/*In here if we put grid.innerHTML += html; then we can see
	selected lesson recordings with the recordings of the lesson selected before
    */
      

    document
        .querySelectorAll(".lesson-menu button")
        .forEach(button => {

            button.classList.remove("active");

        });


    
    if (clickedButton) {
        clickedButton.classList.add("active");
    }

}



function goHome() {

    window.location.href = "Main.html";

}
