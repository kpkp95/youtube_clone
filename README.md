<>
<div className="bg-white  shadow-md  xl:mx-2 p-2  rounded-lg  ">
<div className=" items-center mb-4">
<div className="ml-3">
<p className="text:sm xl:text-xl font-medium">Live Chat</p>
</div>
</div>
<div className=" w-full h-[300px] xl:h-[650px] rounded-lg p-4  flex flex-col-reverse overflow-y-scroll">
<div>
{chatMessages.map((chatMessage, index) => (
<ChatMessage
                timestamp={chatMessage.timestamp}
                name={chatMessage.name}
                key={index}
                msg={chatMessage.message}
              />
))}
</div>
</div>
<form
onSubmit={(e) => {
e.preventDefault();
if (!liveMsg.trim()) return;
dispatch(
addMessage({
name: "T2",
message: liveMsg,
timestamp: new Date().toLocaleTimeString(),
})
);
setLiveMsg("");
}}
className="mt-2 lg:w-[60%] xl:w-full flex items-center" >
<div className="relative">
<button
type="button"
className="bg-gray-200 text-black px-2 xl:px-3 py-2 rounded-full xl:mr-2 hover:bg-gray-300"
onClick={() => setShowEmojiPicker((prev) => !prev)} >
😀
</button>
{showEmojiPicker && (
<div className="absolute bottom-[0] right-0 xl:bottom-12 xl:left-0 z-50">
<Picker onEmojiSelect={handleEmojiSelect} />
</div>
)}
</div>
<input
type="text"
value={liveMsg}
placeholder="Type your message..."
onChange={(e) => setLiveMsg(e.target.value)}
className="flex-1 py-2 px-2 rounded-full bg-gray-100 focus:outline-none"
/>
<button className="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600">
Send
</button>
</form>
</div>
</>
);
};

export default LiveChat;

<<<<<<< HEAD

# my-youtube

# youtube ui clone

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

> > > > > > > f9dff87 (Initial commit)
