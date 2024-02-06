// https://platform.openai.com/docs/api-reference/introduction
// https://platform.openai.com/account/api-keys

let msg_area=document.querySelector('.msg_area');
let send=document.getElementById('send');
let text=document.querySelector('.text');

const API_KEY  ="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";

function start() {
    let res_msg = document.createElement('div');
    res_msg.innerHTML = "Hello myself AskDu, How can I help you?";
    res_msg.setAttribute("class", "left");

    msg_area.appendChild(res_msg);
}

send.addEventListener("click", async (e) => {
    e.preventDefault();
    let req = text.value.trim();
    console.log(req);
    let res="";
    let reply;
    if (req){
    try{
        // Send user message to ChatGPT
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{"role": "user", "content": req }],
                    // prompt: req,
                    temperature: 0.7,
                }),
            });

      if (response.ok) {
        res=await response.json();
        reply=res.choices[0].message.content;   
        console.log(response);
    } else {
        reply='Error: Unable to process your request.';
    }

    // Get and display ChatGPT's reply

        let msg_req = document.createElement('div');
        let msg_res = document.createElement('div');

        let Con1 = document.createElement('div');
        let Con2 = document.createElement('div');

        Con1.setAttribute("class", "msgCon1");
        Con2.setAttribute("class", "msgCon2");

        msg_req.innerHTML = req;
        msg_res.innerHTML = reply;

        msg_req.setAttribute("class", "right");
        msg_res.setAttribute("class", "left");

        msg_area.appendChild(Con1);
        msg_area.appendChild(Con2);

        Con1.appendChild(msg_req);
        Con2.appendChild(msg_res);

        text.value = "";

        function scroll(){
            var scrollmsg= msg_area;
            scrollmsg.scrollTop= scrollmsg.scrollHeight;
        }
        scroll();
    } catch(error) {
        console.error(error);
        responseTextarea.value = 'Error: Unable to process your request.';
    }
   }
});
