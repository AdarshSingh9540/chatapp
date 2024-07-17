
function EmptyChatContainer() {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
        <div className="text-opacity-80 text-white flex flex-col gap-5 items-center lg:text-4xl text-3xl mt-10 transition-all duration-300 text-center">
            <h3 className="font-serif">
                Hi <span className="text-purple-500">!</span>Welcome to
                <span className="text-purple-500">synchronus</span> Chat App
                <span className="text-purple-500 ">.</span>
            </h3>
        </div>
    </div>
  )
}

export default EmptyChatContainer