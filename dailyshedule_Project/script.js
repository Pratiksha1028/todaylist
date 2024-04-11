
const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.input-box')
const errorLabel = document.querySelector('.error-label')
const progressLabel = document.querySelector('.progress-label')
const progressBar = document.querySelector('.progress-bar')
const progressvalue = document.querySelector('.progress-value')


const allQuotes =[
   'Raise the bar by completing your allGoals !',
   'Well began is half done !',
   'Just a step away, keep going!',
   'WoW! You just completed all the goals, time to chill :D ',
]

const allGoals= JSON.parse(localStorage.getItem('allGoals')) || {
    first: {
        name:'',
        completed : false ,
    },

    second: {
        name:'',
        completed : false ,
    },

    third: {
        name:'',
        completed : false ,
    },
}
let CompletedGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length

progressvalue.style.width = `${(CompletedGoalCount/ inputFields.length )*100}%`
progressvalue.firstElementChild.innerText= `${CompletedGoalCount} / ${inputFields.length }completed`
progressLabel.innerText = allQuotes[ CompletedGoalCount]

checkBoxList.forEach((checkBox)=>{
    checkBox.addEventListener('click',(e)=>{
       const allGoalsAdded =[...inputFields].every(function(input){
       return input.value
       })

       if (allGoalsAdded){
        checkBox.parentElement.classList.toggle('completed')
        const inputId =checkBox.nextElementSibling.id
        allGoals[inputId].completed = ! allGoals[inputId].completed
        CompletedGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length

        progressvalue.style.width = `${(CompletedGoalCount/ inputFields.length )*100}%`
        progressvalue.firstElementChild.innerText= `${CompletedGoalCount} / ${inputFields.length } completed`
        progressLabel.innerText = allQuotes[ CompletedGoalCount]

        localStorage.setItem('allGoals',JSON.stringify(allGoals))

       }
       else {
             progressBar.classList.add('show-error')
            }
        })

    })

inputFields.forEach((input)=>{
    input.value = allGoals[input.id].name

    if (allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }
    input.addEventListener('focus',()=>{
        progressBar.classList.remove('show-error') 
    })
 
    input.addEventListener('input',(e) =>{
       if (allGoals[input.id] && allGoals[input.id].completed) {
        input.value = allGoals[input.id].name
        return
       }
    })
        if ( allGoals[input.id]) {
            allGoals[input.id].name =input.value
         } else{
            allGoals[input.id] = {
                name : input.value,
                completed: false,
            }
          }
       
        localStorage.setItem('allGoals',JSON.stringify(allGoals))
    })
