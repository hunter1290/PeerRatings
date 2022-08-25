const key = 1;

const body = document.body;
const down = document.getElementById("down");


async function addUser(newUser) {

    // request for ratings
    const res = await fetch(`https://codeforces.com/api/user.rating?handle=${newUser}`);
    const data = await res.json();
    const resultArray = await data.result;
    const oldRat = await resultArray[resultArray.length - 1].oldRating;
    const newRat = await resultArray[resultArray.length - 1].newRating;

    // request for photo and name
    const res2 = await fetch(`https://codeforces.com/api/user.info?handles=${newUser}`);
    const data2 = await res2.json();
    const userPhoto = await data2.result[0].titlePhoto;
    const userTitle = newUser;
    const obj = { key: key, old_rat: oldRat, new_rat: newRat, photo: userPhoto, title: userTitle };

    if (localStorage.length == 0) {
        let ratingList = [];
        ratingList.push(obj);
        let str = JSON.stringify(ratingList);
        localStorage.setItem(key, str);
    }
    else {
        const dataVal = localStorage.getItem(key);
        const currArr = JSON.parse(dataVal);
        currArr.push(obj);
        const newArr = JSON.stringify(currArr);
        localStorage.removeItem(key);
        localStorage.setItem(key, newArr);
    }
    display();
}

const display = () => {

    const info = JSON.parse(localStorage.getItem(key));

    // if (localStorage.length != 0) {
    // Do Not Touch this line
    down.innerHTML = `<br>`

    // change code here for list updation
    const div = document.createElement("div");
    div.classList.add('major');
    let index = 0;
    if (info.length == 0) return;
    info.map(x => {
        const ran = document.createElement('div');
        ran.innerHTML = `    
                <div class="col1">
                <p class="col1class">${x.title}</p>
                <img src = "${x.photo}"></img>
                    
                </div>
                <div class="col2">
                    <h2 id="oldId">Older Rating : ${x.old_rat}</h2>
                    <h2 id="newId">Current Rating : ${x.new_rat}</h2>
                </div>

                 <img class="delete" src = "https://icons-for-free.com/iconfiles/png/512/delete+24px-131985190578721347.png" onclick = "deleteUser(${index})"></img>
                `;
        div.appendChild(ran);

        ran.classList.add('cards');
        ran.id = index.toString();
        // console.log(x);
        index++;
    })
    down.append(div);
    // }
}


let addBut = document.getElementById("add");
let clr = document.getElementById("clrAll");

// localStorage.clear();
addBut.addEventListener('click',
    () => {
        const input = document.getElementById('input-field')
        let str = input.value;
        // console.log(str);
        addUser(str);
    })

clr.addEventListener('click',
    () => {
        localStorage.clear();
        display();
    })


const deleteUser = (idx) => {

    const info = JSON.parse(localStorage.getItem(key));

    info.splice(idx, 1);
    let aarr = JSON.stringify(info);

    localStorage.clear();

    localStorage.setItem(key, aarr);

    display();
}

display()