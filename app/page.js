
export default function Home() {
  return (
    <>
      <div className="text-white h-[44vh]  flex flex-col justify-center items-center " >
        <div className="font-bold text-5xl  flex justify-center items-center gap-2">Buy me a Chai
          <span> <img src="./tea.gif" width={70} className="pb-8" alt="Tea img" /></span></div>
        <p>Discover the rich, aromatic flavors of chai at Get Me A Chai that makes each cup a special experience. Perfect for
          chai lovers everywhere!</p>
        <div>
          <button type="button" className="text-white bg-gradient-to-r mt-8 from-purple-500 to-pink-500 hover:bg-gradient-to-l
         focus:ring-4 focus:outline-none focus:ring-purple-200
            dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>

          <button type="button" className="text-white bg-gradient-to-r mt-8 from-purple-500 to-pink-500 hover:bg-gradient-to-l
         focus:ring-4 focus:outline-none focus:ring-purple-200
            dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read Here</button>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto">
        <h2 className="text-2xl font-bold my-14 text-center">you fans can Buy you a  chai</h2>
        <div className="flex gap-5 justify-around ">
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img src="./fundgroup.gif" width={88} className="rounded-full" alt="Image"/>
            <p className="font-bold">Fund Yourself</p>
            <p>You Fans can Donate you by buying your chai</p>
          </div>
          <div  className="item space-y-3 flex flex-col justify-center items-center">         
            <img src="./fundgroup.gif" width={88} className="rounded-full" alt="Image"/>
            <p className="font-bold">Fund Yourself</p>
            <p className="font-bold mt-26">You Fans can Donate you by buying your chai</p>                 
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img src="./fundgroup.gif" width={88} className="rounded-full " alt="Image"/>
            <p className="font-bold">Fund Yourself</p>
            <p className="font-bold mt-26">You Fans can Donate you by buying your chai</p>  
          </div>
          {/* <div  className="item space-y-3">
            <img src="./fundgroup.gif" width={88} className="rounded-full" alt="Image"/>
            <p className="font-bold">your Fans can Buy Chai </p>
          </div> */}
        </div>
      </div>
      <div className="bg-white h-1 opacity-10 mt-9"></div>

      <div className="text-white pb-10 pt-8 mx-auto flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl pb-8">Learn more about us </h1>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/QtaorVNAwbI?si=ibshOaKrOO1qilI8" 
             title="YouTube video player" frameborder="0" 
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>      
      </div>
     
    </>
  );
}
