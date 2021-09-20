# Testing the filesystem access API
The broswer needs a directory entry point from:
```javascript
dir = await window.showDirectoryPicker()
```
This brings up a window for the user to select which directory the brower has access to. We can assign this entry to a variable--in this case, *dir*. We have access to the subdirectories in *dir* and can iterate through them using:

```javascript
dir = await dir.getDirectoryHandle('subdirectory name')
```
By reassigning *dir* we are now essentially pointing to that point in the filesystem, allowing us to nest deeper into the selected directory. We can add the *create* option to make the directory if it does not exist in the filesystem: 

```javascript
dir = await dir.getDirectoryHandle('subdirectory name', { create: true })
```
We can use this same option to create a file that does not exist in the directory we are pointing to. Instead of using *directoryHandle*, we will use *fileHandle*: 

```javascript
file = await dir.getFileHandle('file name', { create: true })
```
Since we are dealing with a file now and not a directory, we'll asign this newly created file to the *file* variable. To write to this newly created file, we must create a stream. We can then write some kind of data into the file. When we're done, close the stream. 
```javascript
    let stream = await file.createWritable()
    await stream.write(fileData)
    await stream.close()
```