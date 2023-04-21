const wppconnect = require('@wppconnect-team/wppconnect');


// Control variables
let userStages = []; // Stages >> [undefined, "stageBusinessChoice", "stageVote"]
let limitBusinessChoiceViews = []; // Limited to 3 times
let limitVoteViews = []; // Limited to 3 times
let TimeLimitToVote = []; // Save reference to setTimeout()
let businessSelected = []; // Save business choice
let stars = []; // Save stars choice
const TIMEOUTDALY = 120000; // Set time limite to vote

const BUSINESS = {
  b1: "Ponto do Caju",
  b2: "Pizza ONE",
  b3: "Empório da Onça",
  b4: "Big Food",
  b5: "Recando da vegan",
};


// Messages
// ---------------------- --------------------- ---------------------
const welcomeMessage = `*Bem-vindo ao Concurso Gastronômico Sabores da Vila* \n\n🔎 Para avaliar leve em consideração o prato, atendimento e limpeza do ambiente.  \n\n⚠️ _Atenção, será contabilizado apenas uma avaliação por estabelecimento participante._ \n\nPara seguirmos com sua avaliação selecione um estabelecimento: \n\n\n[ Digite *1* para *${BUSINESS.b1}* ]\n\n[ Digite *2* para *${BUSINESS.b2}* ]\n\n[ Digite *3* para *${BUSINESS.b3}* ]\n\n[ Digite *4* para *${BUSINESS.b4}* ]\n\n[ Digite *5* para *${BUSINESS.b5}* ]\n\n...ou *0* para cancelar.`;

const tryAgainChoiceBusinessMessage = `Tente novamente: \n\nDigite *1* para *${BUSINESS.b1}*; \n\nDigite *2* para *${BUSINESS.b2}*; \n\nDigite *3* para *${BUSINESS.b3}*; \n\nDigite *4* para *${BUSINESS.b4}*; \n\nDigite *5* para *${BUSINESS.b5}*; \n\n...ou *0* para cancelar.`;

// ---------------------- --------------------- ---------------------
const selectStarsMessage = (business) => `OK, vamos avaliar o estabelecimento *${business}*: \n\nDigite *1* para ⭐️; \n\nDigite *2* para ⭐️⭐️; \n\nDigite *3* para ⭐️⭐️⭐️; \n\nDigite *4* para ⭐️⭐️⭐️⭐️; \n\nDigite *5* para ⭐️⭐️⭐️⭐️⭐️; \n\n...ou *0* para cancelar.`;
const tryAgainVoteMessage = "Tente novamente: \n\nDigite *1* para ⭐️; \n\nDigite *2* para ⭐️⭐️; \n\nDigite *3* para ⭐️⭐️⭐️; \n\nDigite *4* para ⭐️⭐️⭐️⭐️; \n\nDigite *5* para ⭐️⭐️⭐️⭐️⭐️; \n\n...ou *0* para cancelar.";
// ---------------------- --------------------- ---------------------
const registeredMessage = (stars, business) => `Registramos sua avaliação de *${stars} estrelas* para *${business}*. \n\nAgradecemos sua participação!`;
const meetOtherParticipantsMessage = "Aproveite para conhecer os outros participantes acessando o site abaixo: \n\nwww.sitedoconcurso.br";
const developerByMessage = "```Solução desenvolvida por:``` \nwww.karytonn.dev";
// ---------------------- --------------------- ---------------------
const timeExpiredMessage = "❌*O tempo para avaliar expirou!* \n\nDigite *A* para iniciar uma nova avaliação.";
const registerError = "Ocorreu um erro na sua avaliação, tente novamente mais tarde.";
const manualExiteMessage = "*Avaliação cancelada!*";
// ---------------------- --------------------- ---------------------


// LIB START
wppconnect
  .create(
    // {
    //   whatsappVersion: '2.2311.5',
    // }
  )
  .then((client) => start(client))
  .catch((error) => console.log(error));

  function start(client) {
    client.onMessage((message) => {
      // If received message is NOT from a group or me, start stages of bot
      if(!message.isGroupMsg && message.fromMe === false) stages(client, message);
  })
}


function stages(client, message) {

  // STAGE 0 > If specific message
  if ( message.body === "#getstatus") {
    
    // Call the function that returns the status of polls 
    // ...
  
  // STAGE 1 > If any other first message
  } else if (userStages[message.from] == undefined) {
    sendWppMessage(client, message.from, welcomeMessage);
    userStages[message.from] = "stageBusinessChoice";

    // Start time limit counter to vote and reset the survey process
    TimeLimitToVote[message.from] = setTimeout(function(){
      userStages[message.from] = undefined;
      sendWppMessage(client, message.from, timeExpiredMessage)
    }, TIMEOUTDALY) 

  // STAGE 2 > If business choice stage
  } else if (userStages[message.from] === "stageBusinessChoice") {
    switch (message.body) {
      case "0":
        sendWppMessage(client, message.from, manualExiteMessage);
        userStages[message.from] = undefined;
        businessSelected[message.from] = undefined;
        limitBusinessChoiceViews[message.from] = 0;
        clearTimeout(TimeLimitToVote[message.from]);
        break;
      case "1":
        businessSelected[message.from] = BUSINESS.b1;
        limitBusinessChoiceViews[message.from] = 0;
        userStages[message.from] = "stageVote";
        sendWppMessage(client, message.from, selectStarsMessage(businessSelected[message.from]));
        break;
      case "2":
        businessSelected[message.from] = BUSINESS.b2;
        limitBusinessChoiceViews[message.from] = 0;
        userStages[message.from] = "stageVote";
        sendWppMessage(client, message.from, selectStarsMessage(businessSelected[message.from]));
        break;
      case "3":
        businessSelected[message.from] = BUSINESS.b3;
        limitBusinessChoiceViews[message.from] = 0;
        userStages[message.from] = "stageVote";
        sendWppMessage(client, message.from, selectStarsMessage(businessSelected[message.from]));
        break;
      case "4":
        businessSelected[message.from] = BUSINESS.b4;
        limitBusinessChoiceViews[message.from] = 0;
        userStages[message.from] = "stageVote";
        sendWppMessage(client, message.from, selectStarsMessage(businessSelected[message.from]));
        break;
      case "5":
        businessSelected[message.from] = BUSINESS.b5;
        limitBusinessChoiceViews[message.from] = 0;
        userStages[message.from] = "stageVote";
        sendWppMessage(client, message.from, selectStarsMessage(businessSelected[message.from]));
        break;
      default:
        sendWppMessage(client, message.from, tryAgainChoiceBusinessMessage)
        if(!limitBusinessChoiceViews[message.from]){
          limitBusinessChoiceViews[message.from] = 0;
        }
        limitBusinessChoiceViews[message.from] += 1;
        if (limitBusinessChoiceViews[message.from] === 3) {
          userStages[message.from] = undefined;
          businessSelected[message.from] = undefined;
          limitBusinessChoiceViews[message.from] = 0;
          clearTimeout(TimeLimitToVote[message.from]);
        }
        break;
    }

  // STAGE 3 > If vote stage
  } else if (userStages[message.from] === "stageVote") {

    switch (message.body) {
      case "0":
        sendWppMessage(client, message.from, manualExiteMessage);
        userStages[message.from] = undefined;
        limitVoteViews[message.from] = 0;
        businessSelected[message.from] = undefined;
        clearTimeout(TimeLimitToVote[message.from]);
        break;
      case "1":
        stars[message.from] = 1;
        limitVoteViews[message.from] = 0;
        userStages[message.from] = undefined;
        registerVote(client, message.from);
        break;
      case "2":
        stars[message.from] = 2;
        limitVoteViews[message.from] = 0;
        userStages[message.from] = undefined;
        registerVote(client, message.from);
        break;
      case "3":
        stars[message.from] = 3;
        limitVoteViews[message.from] = 0;
        userStages[message.from] = undefined;
        registerVote(client, message.from);
        break;
      case "4":
        stars[message.from] = 4;
        limitVoteViews[message.from] = 0;
        userStages[message.from] = undefined;
        registerVote(client, message.from);
        break;
      case "5":
        stars[message.from] = 5;
        limitVoteViews[message.from] = 0;
        userStages[message.from] = undefined;
        registerVote(client, message.from);
        break;
      default:
        sendWppMessage(client, message.from, tryAgainVoteMessage);
        if(!limitVoteViews[message.from]){
          limitVoteViews[message.from] = 0; // Initialize vote views limit to vote stage from specific user
        }
        limitVoteViews[message.from] += 1;
        if (limitVoteViews[message.from] === 3) {
          userStages[message.from] = undefined;
          limitVoteViews[message.from] = 0;
          businessSelected[message.from][message.from] = undefined;
          clearTimeout(TimeLimitToVote[message.from]);
        }
        break;
    }

  } else {
    userStages[message.from] = undefined;
  }
}

async function sendWppMessage(client, sendTo, text) {
  client
    .sendText(sendTo, text)
    .then((result) => {
      // console.log('SUCESSO: ', result); 
    })
    .catch((erro) => {
      console.error('ERRO: ', erro);
    });
}

async function registerVote(client, sendTo) {
  try {
    // Call function to register vote
    // ...
    await sendWppMessage(client, sendTo, registeredMessage(stars[sendTo], businessSelected[sendTo]));
    setTimeout(() => {
      sendWppMessage(client, sendTo, meetOtherParticipantsMessage);
    }, 1000);
    setTimeout(() => {
      sendWppMessage(client, sendTo, developerByMessage);
    }, 2000);
  } catch (error) {
    await sendWppMessage(client, sendTo, registerError);
  } finally {
    clearTimeout(TimeLimitToVote[sendTo]);
    businessSelected[sendTo] = undefined;
    stars[sendTo] = undefined; 
  }
}