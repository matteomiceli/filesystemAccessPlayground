const button = document.querySelector('#btn')
const prnt = document.querySelector('#prnt')
const create = document.querySelector('#create')
const write = document.querySelector('#write')
let fileData;

// globals 
let dir;
let file;

button.addEventListener('click', async () => {
    // open OS directory picker, user chooses director
    console.log('showOpenFilePicker' in window )

    dir = await window.showDirectoryPicker()
        .catch(e => console.log(e))
    
    // request readwrite permissions
    await dir.requestPermission({ mode : "readwrite" }) 

    // navigate through subdirectories with getDirectoryHandle
    dir = await dir.getDirectoryHandle('.kobo')
    dir = await dir.getDirectoryHandle('custom-dict')
    // dir = await dir.getDirectoryHandle('COMP 1171')
        .catch((e) => console.log(e))
})

// prints current live directory 
prnt.addEventListener('click', () => {
    console.log(dir)
})

// creates file if it doesn't exist in the current directory
create.addEventListener('click', async () => {
    [ handle ] = await window.showOpenFilePicker()
    fileData = await handle.getFile();
    file = await dir.getFileHandle('dict-cus.zip', { create: true })
    console.log(fileData)
})

// writes contents of fielData variable to Test.txt on the user's filesystem
write.addEventListener('click', async () => {
    let stream = await file.createWritable()
    await stream.write(fileData)
    await stream.close()
})