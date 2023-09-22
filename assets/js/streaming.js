const chatBtn = document.getElementById('chat-input-btn');
const formChat = document.getElementById('formChat');
const comments = document.getElementsByClassName('stm-chat-comments');

const colors = ['#E74C3C', '#9B59B6', '#F1C40F', '#2ECC71', '#BDC3C7', '#BDC3C7']
let colorIndex = 0

formChat.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const chatInput = document.getElementById('chat-input').value;

    if (chatInput == '') {
        console.log("chat input is null")
    } else {
        console.log("chat input isn't null")
        const currentColor = colors[colorIndex]
        const commentBxScroll = document.getElementById('scrollBottomAuto');
        let commentList = document.getElementById('commentList');
        let commentItem = document.createElement('li');

        commentItem.innerHTML = 
                            `
                                <p><span style='--clr-span: ${currentColor}'>username</span> ${chatInput}</p>
                            `;


        commentList.appendChild(commentItem)

        colorIndex = (colorIndex + 1) % colors.length;

        document.getElementById('chat-input').value = "";
        commentBxScroll.scrollTop = commentBxScroll.scrollHeight;
    }
})