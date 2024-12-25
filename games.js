

const airtablePersonalAccessToken = 'patU5vT2BfRHI8cF5.b16e7230d4e570cce13f4b0e8ffdce95f5cdcafeb64047e3f98cc16776d221f7';
const airtableBaseId = 'appgneRmwG8LUpgIL';
const airtableTableName = 'GamesList';

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


            const gamesLists = document.getElementById('gamesLists');
            gamesLists.innerHTML = ''; // Clear existing list items

           
            // Loop through each record in the Airtable data
            data.records.forEach(record => {
               


                const aTagId = record.fields['aTagId'];
                const title = record.fields['title'];
                const description = record.fields['description'];
                const logo = record.fields['logo'] ? record.fields['logo'][0].url : '';
                const downloadUrl = record.fields['downloadUrl'];
                const dirDownloadUrl = record.fields['dirDownloadUrl'];


                // elements To create 

                const aTag = document.createElement('a');
                aTag.id = aTagId;
                gamesLists.appendChild(aTag);

                // Parent Div

                const parentDiv = document.createElement('div');
                parentDiv.className = "parentdiv";
                aTag.prepend(parentDiv);

                // // 1St Child Div
                const firstChildDiv = document.createElement('div');
                firstChildDiv.className = "gameIconOrTtl";
                parentDiv.prepend(firstChildDiv);

                // // Img Tag for Icon or Logo
                const gameIcon = document.createElement('img');
                gameIcon.className = "gameIcon";
                gameIcon.alt = 'Game Icon';
                gameIcon.src = logo;
                firstChildDiv.prepend(gameIcon);

                // // Game Title
                const gameTitle = document.createElement('h2');
                gameTitle.className = 'gameTtl';
                gameTitle.textContent = title;
                gameIcon.after(gameTitle);

                // Second Child Div
                const secondChildDiv = document.createElement('div');
                secondChildDiv.className = 'gameDes';
                firstChildDiv.after(secondChildDiv);

                const desPara = document.createElement('p');
                desPara.textContent = description;
                secondChildDiv.prepend(desPara);

                //Third child Div
                const thirdChildDiv = document.createElement('div');
                thirdChildDiv.className = 'gameButtons';
                secondChildDiv.after(thirdChildDiv);

                const Downbtn = document.createElement('button');
                Downbtn.className = 'gameDowBtn';
                Downbtn.setAttribute = ('data-open', 'modal1');
                thirdChildDiv.appendChild(Downbtn);

                const downbtnATag = document.createElement('a');
                downbtnATag.href = downloadUrl;
                downbtnATag.target = '_blank';
                Downbtn.prepend(downbtnATag);

                const boldTag = document.createElement('b');
                downbtnATag.prepend(boldTag);

                const downText2 = 'Download';
                boldTag.prepend(downText2);
                const Dirdownbtn = document.createElement('button');
                Dirdownbtn.className = 'DirgameDowBtn';
                // Dirdownbtn.setAttribute = ('data-open', 'modal1');
                Downbtn.after(Dirdownbtn);

                const dirDownbtnATag = document.createElement('a');
                dirDownbtnATag.href = dirDownloadUrl;
                Dirdownbtn.prepend(dirDownbtnATag);
                dirDownbtnATag.target = '_blank';
                const downText = 'Direct Download';
                downText.className = 'dirDownText';
                dirDownbtnATag.prepend(downText);

                
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

