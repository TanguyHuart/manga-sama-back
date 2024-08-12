
const { log } = require("console");
const mangaService = require("../../app/services/mangaAPI");
const { spawn } = require("child_process")


const isbn = [
'9782723433358', 
'9782723489898',
'9782723489904',
'9782723489911',
'9782723489935',
'9782723489942',
'9782723489959',
'9782723492539',
'9782723492553',
'9782723492577',
]

const getManga = async (req, res, next) => {
let i = 0
console.log('coucou');
   setInterval(() => {
    if (i < isbn.length) {
     mangaService.mangaAPI(isbn[i]);
      i++
    }
    else {
      clearInterval()
      next();
    }  
  }, (Math.random()+1 ) * 100000)
    
return next();
}

const gitCommand = () => {
 setTimeout(() => {
  return new Promise((resolve , reject) => {
    const gitAdd = spawn('git', ['add', '.'])
    gitAdd.on('close', () => {
     const gitCommit = spawn('git', ['commit', '-m', 'Mise a jour de main'])
     gitCommit.on('close', () => {
       const gitPush = spawn('git', ['push'])
       gitPush.on('close', () => {
       resolve()
       })
     })
    })
   })
 }, 60000)
 

  
  
}

const otherisbn = [9782723492560,

  9782723492584,
  9782723492591,
  9782723492607,
  9782723494724,
  9782723494731,
  9782723494748,
  9782723494755,
  9782723494762,
  9782723494779,
  9782723494786,
  9782723494793,
  9782723494809,
  9782723494816,
  9782723494823,
  9782723494830,
  9782723494847,
  9782723494854,
  9782723494861,
  9782723498593,
  9782723498609,
  9782723498616,
  9782723498623,
  9782723498630,
  9782723498647,
  9782723498654,
  9782723498661,
  9782723498678,
  9782723498685,]

module.exports = gitCommand;