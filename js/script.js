//variables 
const btnStartTest = document.querySelector('.btnTestBlue')
const questionnaire = document.querySelector('.questionnaire')
// var for progress bar
const progressBar = document.querySelector('.bar')
const progressQuestionNumber = document.querySelector('.progressQuestionNumber')
// var for show btn nest and previous
const qstSwitch = document.querySelector('.quizContainer')
const nextBtn = document.querySelector('.next')
const previousBtn = document.querySelector('.previous')
const currentquestion = document.querySelector('.questionShow')
const answerInputs = document.querySelector('.answerShow')

// var for show and hide para preambul or results
const PreambulSec = document.querySelector('.PreambulSec')
const result = document.querySelector('.resultTitle')
const preambulTitle = document.querySelector('.PreambulSec h1')
const resultMessage = document.querySelectorAll('.PreambulSec p')

// var for stepper info resulats question 
const stepper = document.querySelectorAll('.stepper h1')


// event
btnStartTest.addEventListener('click', function buildQuiz() {
    stepper[0].classList.remove('selected');
    stepper[1].classList.add('selected');
    btnStartTest.style.display = 'none';
    PreambulSec.style.display = 'none';
    questionnaire.style.display = 'block';
    hidePreviousBtn();
    nextBtn.disabled = true;
    loadQuestionList(questions[i]);
});

qstSwitch.addEventListener('change', (event) => {
    const input = event.target

    if (input.type === 'number') {
        const number = parseFloat(input.value)
        
        if (number >= input.min && number <= input.max) {
            answers[input.name] = input.value
            nextBtn.disabled = false
        } else {
            nextBtn.disabled = true
        }
    } else {
        answers[input.name] = input.id
        nextBtn.disabled = false
    }
})

let i = 0

function hidePreviousBtn() {

    if (i === 0) {
        previousBtn.classList.add('hide')
    } else {
        previousBtn.classList.remove('hide')
    }
}





nextBtn.addEventListener('click', () => {
    if (i < ((questions.length) - 1)) {
        i++;
        loadQuestionList(questions[i]);
        activeBar(i);
        hidePreviousBtn();
        nextBtn.disabled = true;
        if (i === ((questions.length) - 1) || answers['Q12'] < 15) {
            nextBtn.innerText = 'Terminer le test';
            nextBtn.classList.add('result');
            const resultBtn = document.querySelector('.result');
            resultBtn.addEventListener('click', Results);

        }else {
            nextBtn.innerText = 'Question suivante';
        }
    }
})


previousBtn.addEventListener('click', () => {
    i--;
    loadQuestionList(questions[i]);
    activeBar(i);
    hidePreviousBtn();
    nextBtn.disabled = true;
    // if (i === (questions.length) - 1 ) {
    //     nextBtn.innerText = 'Terminer le test';

    // }else {
    //     nextBtn.innerText = 'Question suivante';
    //     nextBtn.classList.remove('result');
    // }
})


/* function loadNextQuestion(){
    const input = question.input
  if (input.type === 'number') {
    const number = parseFloat(input.value)
    if (number >= input.min && number <= input.max) {
        nextBtn.disabled = false
       }else if(number < input.min || number > input.max ){
          alert(`valeur doit etre entre ${min} et ${max} `);
          return;
       }else {
        alert('SVP choisir une valeur');
        return; 
    }
  } else {
    nextBtn.disabled = false
  }
}     loadNextQuestion(); */

function loadQuestionList(qst) {
    currentquestion.innerText = qst.question
    answerInputs.innerHTML = ''
    const inputAnswer = qst.input.answer
    const input = qst.input

    if(input.type === 'number'){
        
        answerInputs.innerHTML += `<input class="inputNumber" type="number" name="${input.qNumber}" id="${input.name}" min="${input.min}" max="${input.max}" placeholder="${input.min} - ${input.max}">
                                    <span class="input-span">${input.name}</span>`                       
    
            /* if(number < input.min || number > input.max ){
                alert(`valeur doit etre entre ${min} et ${max} `);
                return;
            }else if (input.value == ''){
                alert('SVP choisir une valeur');
                return;
            }else{ //(number >= input.min && number <= input.max) {
                nextBtn.disabled = false
            } */

    } else if (input.type === 'radio') {

        inputAnswer.forEach(answer => {

            answerInputs.innerHTML += `
                    <div>
                        <input type="radio" name="${input.qNumber}" id="${answer.text}">
                        <label for="${answer.text}" class="side-label">${answer.text}</label>
                        </div>`
        })

    }
}


function activeBar(nb) {

    const nbQuestion = nb + 1

    progressQuestionNumber.innerText = nbQuestion
    progressBar.style.width = `calc(${nbQuestion} * calc(100% / 23))`

}

let answers = {}

let facteurGMajor = 0
let facteurGMineur = 0

function Results() {


    if (answers['Q1'] === 'Oui' && answers['Q2'] >= 39){

        facteurGMineur++
    }
    if (answers['Q1'] === 'Oui' && answers['Q2'] <= 35,4){

        facteurGMajor++
    }

    if (answers['Q8'] === 'Oui') {

        facteurGMineur++
    }

    if (answers['Q9'] === 'Oui' || answers['Q10'] === 'Oui') {

        facteurGMajor++
    }

    if (answers['Q11'] === 'Mal' || answers['Q11'] === 'Très mal') {
        facteurGMineur++
    }
    if (answers['Q12'] < 15) {
        nextBtn.disabled = true;
        nextBtn.innerText = 'Terminer le test';
    }

    showResults(facteurGMajor, facteurGMineur)
}



function showResults(facteurGMajor, facteurGMineur) {
    /// show third stepper
    stepper[1].classList.remove('selected')
    stepper[2].classList.add('selected')
    ////show result
    btnStartTest.style.display = 'block'
    PreambulSec.style.display = 'block'
    result.style.display = 'block'
    questionnaire.style.display = 'none'
    /// refaire le test
    btnStartTest.textContent = 'reprendre le test'
    btnStartTest.addEventListener('click', () => {
        window.location.reload()
    })
     ////////// style for result color size
        preambulTitle.innerText = 'Résultats'
        resultMessage[0].style.fontSize = '1.7rem'
        resultMessage[0].style.fontWeight = 'bold'
        resultMessage[0].style.color = '#FFFFFF'
        resultMessage[1].style.color = '#F4CF1B'
        result.style.color = '#ED0448'
        preambulTitle.style.color = '#fff'
        PreambulSec.style.bgcolor = '#1078AD'
        result.style.fontSize = '1.8rem'
        resultMessage[1].style.fontSize = '1.8rem'
        resultMessage[1].innerText = "#RestezChezVous - limitez les contacts avec d'autres personnes. Le virus peut être propagé par des porteurs ne montrant pas de symptômes."        

        //////algorithm ::: condition for showing result

    //age moins de 15
    if (answers['Q12'] < 15) {
        nextBtn.disabled = true
        result.innerText ='STOP'
        resultMessage[0].innerText ='Prenez contact avec votre médecin généraliste au moindre doute. Cette application n’est pour l’instant pas adaptée aux personnes de moins de 15 ans. En cas d’urgence, appeler le 15.'
    }
   //other age


//    else if (answers['Q1'] === 'oui'|| answers['Q3'] === 'oui' || answers['Q5'] === 'oui'|| answers['Q4'] === 'oui' || answers['Q6'] === 'oui') {

                 else if (facteurGMineur === 0 && facteurGMajor === 0 && answers['Q3'] < 50) {
                    result.innerText = 'Votre situation ne relève probablement pas du Covid-19.'
                    resultMessage[0].innerText = 'Consultez votre médecin au moindre doute.'
            
                } else if ((facteurGMineur === 0 && facteurGMajor === 0 && answers['Q3'] >= 50) || (facteurGMineur = 1)) {
                    result.innerText = 'téléconsultation ou médecin généraliste ou visite à domicile.'
                    resultMessage[0].innerText = 'appelez le 141 si une gêne respiratoire ou des difficultés importantes pour s’alimenter ou boire pendant plus de 24h apparaissent.”'
            
                } else if(facteurGMineur = 2) {
                    result.innerText = 'Appelez 141'
                    resultMessage[0].innerText = 'appelez le 141 si une gêne respiratoire ou des difficultés importantes pour s’alimenter ou boire pendant plus de 24h apparaissent.”'
            
                } else if (facteurGMajor >= 2) {
                    result.innerText = 'Appelez 141'
                    resultMessage[0].innerText = 'Appelez 141 le plus vite possible'
            
                }else {
                    result.innerText = 'Votre situation ne relève probablement pas du Covid-19.'
                    resultMessage[0].innerText = 'N’hésitez pas à contacter votre médecin en cas de doute. Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation. Pour toute information concernant le Covid-19 allez vers la page d’accueil.'
                }
// } else {
//     result.innerText = 'Votre situation ne relève probablement pas du Covid-19.'
//     resultMessage[0].innerText = 'N’hésitez pas à contacter votre médecin en cas de doute. Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation. Pour toute information concernant le Covid-19 allez vers la page d’accueil.'
// }
}

    /* else if (answers['Q1'] === 'oui'|| (answers['Q1'] === 'oui'&& answers['Q3'] === 'oui') ||( answers['Q3'] === 'oui' && answers['Q5'] === 'oui')|| (answers['Q3'] === 'oui' && (answers['Q4'] === 'oui' || answers['Q1'] === 'oui') && answers['Q6'] === 'oui')) {


        resultMessage[1].innerText = "#RestezChezVous - limitez les contacts avec d'autres personnes. Le virus peut être propagé par des porteurs ne montrant pas de symptômes."        

        if (facteurGMineur === 0 && facteurGMajor === 0 && answers['Q3'] < 50) {
                        result.innerText = 'Votre situation ne relève probablement pas du Covid-19.'
                        resultMessage[0].innerText = 'Consultez votre médecin au moindre doute.'
                
                    } else if ((facteurGMineur === 0 && facteurGMajor === 0 && answers['Q3'] >= 50) || (facteurGMineur = 1)) {
                        result.innerText = 'téléconsultation ou médecin généraliste ou visite à domicile.'
                        resultMessage[0].innerText = 'appelez le 141 si une gêne respiratoire ou des difficultés importantes pour s’alimenter ou boire pendant plus de 24h apparaissent.”'
                
                    } else if(facteurGMineur = 2) {
                        result.innerText = 'Appelez 141'
                        resultMessage[0].innerText = 'appelez le 141 si une gêne respiratoire ou des difficultés importantes pour s’alimenter ou boire pendant plus de 24h apparaissent.”'
                
                    } else if (facteurGMajor >= 2) {
                        result.innerText = 'Appelez 141'
                        resultMessage[0].innerText = 'Appelez 141 le plus vite possible'
                
                    } 
    } else if (answers['Q1'] === 'oui'|| answers['Q3'] === 'oui' || answers['Q5'] === 'oui' || answers['Q4'] === 'oui') {
            if (facteurGMineur === 0 && factuerGMajor === 0) {
                result.innerText = 'Votre situation ne relève probablement pas du Covid-19.'
                resultMessage[0].innerText = 'Consultez votre médecin au moindre doute.'
        
            } else if (facteurGMineur === 1 || factuerGMajor ===1) {
                result.innerText = 'Votre situation ne relève probablement pas du Covid-19.'
                resultMessage[0].innerText = 'Un avis médical est recommandé. Au moindre doute, appelez le 141.'
    
            }
    } else {
        result.innerText = 'Votre situation ne relève probablement pas du Covid-19.'
        resultMessage[0].innerText = 'N’hésitez pas à contacter votre médecin en cas de doute. Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation. Pour toute information concernant le Covid-19 allez vers la page d’accueil.'
    }
}
 */


// results in array
const questions = [{
    question: 'Pensez-vous avoir eu de la fièvre ces derniers jours (frissons, sueurs) ?',

    input: {
        type: 'radio',
        qNumber: 'Q1',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }]
    }
}, {
    question: 'Quelle est votre température ?',

    input: {
        type: 'number',
        qNumber: 'Q2',
        name: 'Degré',
        min: 30,
        max: 45
    }
}, {
    question: 'Avez-vous une toux ou une augmentation de votre toux habituelle ces derniers jours ?',

    input: {
        type: 'radio',
        qNumber: 'Q3',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }]
    }
}, {
    question: 'Avez-vous des douleurs musculaires ou des courbatures inhabituelles ces derniers jours?',

    input: {
        type: 'radio',
        qNumber: 'Q4',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }]
    }
}, {
    question: 'Avez-vous un mal de gorge apparu ces derniers jours?',

    input: {
        type: 'radio',
        qNumber: 'Q5',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }]
    }
}, {
    question: 'Avez-vous de la diarrhée ces dernières 24 heures (au moins 3 selles molles) ?',

    input: {
        type: 'radio',
        qNumber: 'Q6',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }]
    }
}, {
    question: 'Avez-vous une fatigue inhabituelle ces derniers jours ?',

    input: {
        type: 'radio',
        qNumber: 'Q7',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }]
    }
}, {
    question: 'cette fatigue vous oblige-t-elle à vous reposer plus de la moitié de la journée ?',

    input: {
        type: 'radio',
        qNumber: 'Q8',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }]
    }
}, {
    question: 'Avez-vous des difficultés importantes pour vous alimenter ou boire depuis plus de 24h ?',

    input: {
        type: 'radio',
        qNumber: 'Q9',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }]
    }
}, {
    question: 'Avez-vous vu apparaître une gêne respiratoire ou une augmentation de votre gêne respiratoire habituelle ?',

    input: {
        type: 'radio',
        qNumber: 'Q10',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }]
    }
}, {
    question: 'Comment vous sentez-vous ?',

    input: {
        type: 'radio',
        qNumber: 'Q11',
        answer: [{
            text: 'Bien',
        }, {
            text: 'Assez bien',
        }, {
            text: 'Mal',
        }, {
            text: 'Très mal',
        }]
    }
}, {
    question: 'Quel est votre âge ?',

    input: {

        type: 'number',
        qNumber: 'Q12',
        name: 'ans',
        min: 0,
        max: 120
    }
}, {
    question: 'Quel est votre poids ?',

    input: {
        type: 'number',
        qNumber: 'Q13',
        name: 'kg',
        min: 0,
        max: 300
    }
}, {
    question: 'Quelle est votre taille ?',

    input: {
        type: 'number',
        qNumber: 'Q14',
        name: 'cm',
        min: 30,
        max: 300
    }
}, {
    question: 'Avez-vous de l’hypertension artérielle ? Ou avez-vous une maladie cardiaque ou vasculaire ? Ou prenez-vous un traitement à visée cardiologique ?',

    input: {
        type: 'radio',
        qNumber: 'Q15',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }, {
            text: 'Ne sait pas',
        }]
    }
}, {
    question: 'Êtes-vous diabétique ?',

    input: {
        type: 'radio',
        qNumber: 'Q16',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }]
    }
}, {
    question: 'Avez-vous ou avez-vous eu un cancer ?',

    input: {
        type: 'radio',
        qNumber: 'Q17',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }]
    }
}, {
    question: 'Avez-vous une maladie respiratoire ? Ou êtes-vous suivi par un pneumologue ?',

    input: {
        type: 'radio',
        qNumber: 'Q18',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }]
    }
}, {
    question: 'Avez-vous une insuffisance rénale chronique dialysée ?',

    input: {
        type: 'radio',
        qNumber: 'Q19',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }]
    }
}, {
    question: 'Avez-vous une maladie chronique du foie ?',

    input: {
        type: 'radio',
        qNumber: 'Q20',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }]
    }
}, {
    question: 'Êtes-vous enceinte ?',

    input: {
        type: 'radio',
        qNumber: 'Q21',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }, {
            text: 'Non applicable',
        }]
    }
}, {
    question: 'Avez-vous une maladie connue pour diminuer vos défenses immunitaires ?',

    input: {
        type: 'radio',
        qNumber: 'Q22',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        }]
    }
}, {
    question: 'Prenez-vous un traitement immunosuppresseur ? C’est un traitement qui diminue vos défenses contre les infections. Voici quelques exemples : corticoïdes, méthotrexate, ciclosporine, tacrolimus, azathioprine, cyclophosphamide (liste non exhaustive).',

    input: {
        type: 'radio',
        qNumber: 'Q23',
        answer: [{
            text: 'Oui',
        }, {
            text: 'Non',
        },{
            text: 'Ne sait pas',
        }]
    }
}
]