

const airtablePersonalAccessToken = 'patU5vT2BfRHI8cF5.b16e7230d4e570cce13f4b0e8ffdce95f5cdcafeb64047e3f98cc16776d221f7';
const airtableBaseId = 'appgneRmwG8LUpgIL';
const airtableTableName = 'WebsitesList';

const url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;


// Function to fetch titles from Airtable
function fetchTitles() {
    fetch(url, {
        headers: {
            Authorization: `Bearer ${airtablePersonalAccessToken}`
        }
    })
        .then(response => {

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.json();


        })
        .then(data => {


            const WebsitesLists = document.getElementById('websitesLists');
            WebsitesLists.innerHTML = ''; // Clear existing list items


            // Loop through each record in the Airtable data
            data.records.forEach(record => {


                const webTitle = record.fields['title'];
                const webDescription = record.fields['description'];
                const logo = record.fields['logo'] ? record.fields['logo'][0].url : '';
                const visitLink = record.fields['downloadUrl'];

                const dirDownloadUrl = record.fields['dirDownloadUrl']; 
                const aTagId = record.fields['aTagId'];
                




                // elements To create 
                const aTag = document.createElement('a');
                aTag.id = aTagId;
                aTag.className = 'parentAnchor';
                WebsitesLists.appendChild(aTag);


                const demoDiv = document.createElement('div');
                demoDiv.className = 'demoDiv';
                aTag.appendChild(demoDiv);

                const webImg = document.createElement('img');
                webImg.className = 'webImg';
                webImg.src = logo;
                webImg.alt = 'Website Logo';
                demoDiv.appendChild(webImg);

                const webHeadings = document.createElement('div');
                webHeadings.className = 'webHeadings';
                webImg.after(webHeadings);

                const webHeading = document.createElement('h2');
                webHeading.className = 'webHeading';
                webHeading.textContent = webTitle;
                webHeadings.appendChild(webHeading);

                const webDes = document.createElement('h3');
                webDes.className = 'webDes';
                webDes.textContent = webDescription;
                webHeading.after(webDes);

                const webLink = document.createElement('a');
                webLink.href = visitLink;
                webLink.target = '_blank';
                webHeadings.after(webLink);

                const btns = document.createElement('button');
                btns.className = 'btns';
                btns.textContent = 'Visit';
                webLink.appendChild(btns);


            });
            const loader = document.querySelector('.loader');
            // loader.classList.add('loader--hidden');
            loader.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching Airtable data:', error);
        });

}

fetchTitles();
// setInterval(function () {
//     location.reload();
// }, 30000);
// window.onload = function () {

// };

// Fetch the titles initially when the page loads
// fetchTitles();
// Page Loader

// Optionally, set up an interval to auto-fetch new titles periodically
// setInterval(fetchTitles, 60000); // Fetch every 60 seconds


// const openEls = document.querySelectorAll("[data-open]");
// const closeEls = document.querySelectorAll("[data-close]");
// const isVisible = "is-visible";

// for (const el of openEls) {
//     el.addEventListener("click", function () {
//         const modalId = this.dataset.open;
//         document.getElementById(modalId).classList.add(isVisible);
//     });
// }

// for (const el of closeEls) {
//     el.addEventListener("click", function () {
//         this.parentElement.parentElement.parentElement.classList.remove(isVisible);
//     });
// }

// document.addEventListener("click", e => {
//     if (e.target == document.querySelector(".modal.is-visible")) {
//         document.querySelector(".modal.is-visible").classList.remove(isVisible);
//     }
// });

// document.addEventListener("keyup", e => {
//     // if we press the ESC
//     if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
//         document.querySelector(".modal.is-visible").classList.remove(isVisible);
//     }
// });

