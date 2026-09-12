

const aiButton =
    document.getElementById("ictAiButton");

const aiChat =
    document.getElementById("ictAiChat");

const closeAiChat =
    document.getElementById("closeAiChat");

const aiInput =
    document.getElementById("aiInput");

const sendAiMessage =
    document.getElementById("sendAiMessage");

const aiMessages =
    document.getElementById("aiMessages");


let aiConversation = [];

let aiBusy = false;




aiButton.addEventListener(
    "click",
    () => {

        aiChat.classList.toggle("open");

        if (
            aiChat.classList.contains("open")
        ) {

            setTimeout(
                () => aiInput.focus(),
                300
            );

        }

    }
);




closeAiChat.addEventListener(
    "click",
    () => {

        aiChat.classList.remove("open");

    }
);



document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            aiChat.classList.remove("open");

        }

    }
);



document
    .querySelectorAll(
        "[data-ai-question]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                aiInput.value =
                    button.dataset.aiQuestion;

                sendMessage();

            }
        );

    });




aiInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


sendAiMessage.addEventListener(
    "click",
    sendMessage
);



aiInput.addEventListener(
    "input",
    () => {

        aiInput.style.height =
            "auto";

        aiInput.style.height =
            Math.min(
                aiInput.scrollHeight,
                110
            ) + "px";

    }
);



function addUserMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "ai-message user";

    message.innerHTML = `

        <div class="message-bubble">

            <strong>
                You
            </strong>

            <p></p>

        </div>

    `;

    message
        .querySelector("p")
        .textContent = text;

    aiMessages.appendChild(message);

    scrollAiChat();

}


/* =====================================================
   CREATE BOT MESSAGE
===================================================== */

function createBotMessage() {

    const message =
        document.createElement("div");

    message.className =
        "ai-message bot";

    message.innerHTML = `

        <div class="message-avatar">
            🤖
        </div>

        <div class="message-bubble">

            <strong>
                ICT Lab AI
            </strong>

            <p></p>

        </div>

    `;

    aiMessages.appendChild(message);

    scrollAiChat();

    return message
        .querySelector("p");

}




function createTypingIndicator() {

    const typing =
        document.createElement("div");

    typing.className =
        "ai-message bot ai-loading";

    typing.innerHTML = `

        <div class="message-avatar">
            🤖
        </div>

        <div class="message-bubble">

            <div class="ai-typing">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>

    `;

    aiMessages.appendChild(typing);

    scrollAiChat();

    return typing;

}



async function sendMessage() {

    const text =
        aiInput.value.trim();


    if (
        !text ||
        aiBusy
    ) {

        return;

    }


    aiBusy = true;

    sendAiMessage.disabled = true;


    addUserMessage(text);


    aiConversation.push({

        role:
            "user",

        content:
            text

    });


    aiInput.value = "";

    aiInput.style.height =
        "auto";


    const typing =
        createTypingIndicator();


    try {

       

        const languageSelect =
            document.getElementById(
                "languageSelect"
            );


        const language =
            languageSelect
                ? languageSelect.value
                : "en";



        const response =
            await fetch(
                "/api/chat",
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            messages:
                                aiConversation,

                            language

                        })

                }
            );


        if (
            !response.ok
        ) {

            throw new Error(
                "Server error"
            );

        }


        typing.remove();


        const output =
            createBotMessage();


     

        const reader =
            response.body.getReader();

        const decoder =
            new TextDecoder();


        let fullAnswer =
            "";


        while (true) {

            const {
                done,
                value
            } =
                await reader.read();


            if (done)
                break;


            const chunk =
                decoder.decode(
                    value,
                    {
                        stream: true
                    }
                );


            fullAnswer +=
                chunk;


            output.textContent =
                fullAnswer;


            scrollAiChat();

        }


        aiConversation.push({

            role:
                "assistant",

            content:
                fullAnswer

        });



        if (
            aiConversation.length > 14
        ) {

            aiConversation =
                aiConversation.slice(-14);

        }

    }

    catch (error) {

        typing.remove();


        const output =
            createBotMessage();


        output.textContent =
            "I couldn't connect to the AI server. Please try again.";


        console.error(
            error
        );

    }


    finally {

        aiBusy =
            false;

        sendAiMessage.disabled =
            false;

        aiInput.focus();

    }

}



function scrollAiChat() {

    aiMessages.scrollTop =
        aiMessages.scrollHeight;

}