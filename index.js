const button = document.querySelector('#btn')
const prnt = document.querySelector('#prnt')
const create = document.querySelector('#create')
const write = document.querySelector('#write')
const fileData = 'This is a test file'

// globals 
let dir;
let file;

button.addEventListener('click', async () => {
    // open OS directory picker, user chooses directory
    dir = await window.showDirectoryPicker()
        .catch(e => console.log(e))
    
    // request readwrite permissions
    await dir.requestPermission({ mode : "readwrite" }) 

    // navigate through subdirectories with getDirectoryHandle
    // dir = await dir.getDirectoryHandle('BCIT')
    // dir = await dir.getDirectoryHandle('Level 1')
    // dir = await dir.getDirectoryHandle('COMP 1171')
        .catch((e) => console.log(e))
})

// prints current live directory 
prnt.addEventListener('click', () => {
    console.log(dir);
})

// creates file if it doesn't exist in the current directory
create.addEventListener('click', async () => {
    file = await dir.getFileHandle('Test.txt', { create: true })
    console.log(file)
})

// writes contents of fielData variable to Test.txt on the user's filesystem
write.addEventListener('click', async () => {
    let stream = await file.createWritable()
    await stream.write(fileData)
    await stream.close()
})
