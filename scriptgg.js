let user = [
    {
      id: 1,
      username: "telly_tawin",
      fullname: "Worapon Klabsri",
      profile_img: "https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/317489971_5623605147752916_3985050570724987458_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFmMFwNQQOWqRvP48NME4RHI-v5OrkZU3kj6_k6uRlTebRC9srvj-VmJlch8cq2wqpcHpOfZGiKFTuuVPTy1ys-&_nc_ohc=T6sEsm2NJZ4AX-yQ1zi&_nc_ht=scontent.fcnx1-1.fna&oh=00_AfCwZ6Of0bzMwj7n_r-cduvDU8u4XVlgf_aWpaTpmwBqPQ&oe=63E595AF",
      posts: "69 posts",
      follower: "101 follower",
      following: "1 following",
    },
    {
      id: 2,
      username: "bright.att",
      fullname: "Bright Athit",
      profile_img: "https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/326162774_633938541866029_7579181424752404603_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFCEnOpLpb92a3G2CNkXu_okPSl6D-HOrqQ9KXoP4c6upSboY1kedn0HgY65mVPMqUSlxY2UwFAHroL3-eArW-M&_nc_ohc=I-ljvPg9vLwAX-s19x6&_nc_ht=scontent.fcnx1-1.fna&oh=00_AfABvJD1EtnivJmtYW1HgDIKGDowiqQUafyI95BJjmYngw&oe=63E5512C",
      posts: "1412 posts",
      follower: "579 follower",
      following: "230 follwing",
    },
    {
      id: 3,
      username: "k.yor_in",
      fullname: "Yor-in Udomwattanakul",
      profile_img: "https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/326969510_474492804896615_6730554989233831402_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeF7akdej7FSHEg1WP4Nkida81kqIydG5nfzWSojJ0bmd85UnA4DzufuqQpur94_17pHekRuD8zN020zFUwa7by8&_nc_ohc=McXLrhV-o-MAX_dUk31&_nc_ht=scontent.fcnx1-1.fna&oh=00_AfAFx6bLF-LF1vfP8BYSrC92tPWOiSjBqB0BGx3JHn7aTw&oe=63E6933A",
      posts: "101 posts",
      follower: "491 follower",
      following: "2.04m following",
    },
    {
      id: 4,
      username: "py_keen",
      fullname: "Prachya Chaisermtawan",
      profile_img: "https://scontent.fcnx1-1.fna.fbcdn.net/v/t1.15752-9/320341431_513720900778653_8799088590109916420_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHOzE_7vpTE4KI9d1KWZniC8fymwlMi0Lbx_KbCUyLQtqkDtn6Hch5SwhhwUD7nd7RExYw4bTNQkpZNT_o50Fgf&_nc_ohc=7-3JDKYU9IwAX8zIlkd&tn=BbohIBpXRqZ6EukG&_nc_ht=scontent.fcnx1-1.fna&oh=03_AdTwHyz1mNtotmIzYasUsD8Av73y50O-m46DipxXPGOXYA&oe=64089FFE",
      posts: "24 posts",
      follower: "547 follower",
      following: "299 following",
    },
    {
      id: 5,
      username: "lnwmalee",
      fullname: "Malee SoBeautiful",
      profile_img: "https://scontent.fcnx1-1.fna.fbcdn.net/v/t1.6435-9/30572013_597993593884021_3245693574267797504_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFmf1VAm-2_gSgt7uN-CARTVJWuvejebbdUla696N5ttyMFcREthXzJooRxBT3eQMKJvF5kBAaCEDhcdRbd_1Q9&_nc_ohc=L4_fiCKkKKoAX99S4Z2&_nc_ht=scontent.fcnx1-1.fna&oh=00_AfDyN_ra25tGaxAMczqsWYKqBwsI-H4YHtxK1rPZlQV7jg&oe=6408BA3F",
      posts: "1,234 posts",
      follower: "2k follower",
      following: "1.8k following",
    }
];

const searchBx = document.getElementById("searchBox");
const searchOut = document.querySelector(".searchOut");
const commuBtn = document.querySelector(".sb-disBtn-comunity");
const commuBtnData = document.querySelector(".sb-disBtn-comunity-data")

let imgPrf = document.querySelector("#imgPrf");
let namePrf = document.querySelector("#namePrf");
let postPrf = document.querySelector("#postPrf");
let followerPrf = document.querySelector("#followerPrf");
let followingPrf = document.querySelector("#followingPrf");

searchBx.onkeyup = (e) => {
  let kb = e.target.value
  let emptyArr = [];
  if (kb) {
    emptyArr = user.filter((data) => {
      return data.username.toLocaleLowerCase().startsWith(kb.toLocaleLowerCase());
    });
    emptyArr = emptyArr.map((data) => {
      return data =`<li>
                      <a href="/HTML/FEFinal/index2.html?q=${data.username}?id=${String(data.id).padStart(6, '0')}">
                        <div class="searchUserInfo">
                          <img class="userImg" src="${data.profile_img}"></img>
                          <h5>${data.username}</h5>
                        </div>
                      </a>
                    </li>`;
    })
    showUserData(emptyArr);
    searchOut.classList.add("active");
  }else {
    searchOut.classList.remove("active");
  }
}

let showUserData = (list) => {
  let listData;
  if(!list.length) {
    userValue = searchBx.value;
    listData = `<li>
                  <div class="searchUserInfo">
                    <h5>${"can't found anything..."}</h5>
                  </div>
                </li>`;
  }else {
    listData = list.join('');
  }
  searchOut.innerHTML = listData;
}

if(window.location.pathname == "/HTML/FEFinal/index2.html") {
    let searchPath = window.location.search;
    let number = "0123456789"
    let check = (x) => number.includes(x)  ? true : false;
    let matches = [...searchPath].reduce((x, y) => check(y) ? x+y : x, '')

    let imgPrfAll = document.querySelectorAll("[id='imgPrf']");
    let namePrfAll = document.querySelectorAll("[id='namePrf']");

    for(let i=0; i<user.length; i++) {
      if(matches-1 == i) {
            document.title = `Triple-F | ${user[i].username}`
            for(let a=0; a<imgPrfAll.length; a++) {
                imgPrfAll[a].src = user[i].profile_img;
                namePrfAll[a].innerHTML = user[i].username;
            }
            postPrf.innerHTML = user[i].posts;
            followerPrf.innerHTML = user[i].follower;
            followingPrf.innerHTML = user[i].following;
        }
    }
  }
  