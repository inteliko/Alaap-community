import { SignIn } from "@clerk/nextjs";


export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center px-4">
        <h1 className="text-heading1-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-violet-600 to-violet-400 mb-4 text-3xl md:text-4xl lg:text-5xl">
          Join the Conversation on Alaap
        </h1>

        <p className="text-light-1 text-lg md:text-xl lg:text-2xl text-center"> {/* Center-align the <p> tag */}
          Where Developers You can Share Projects,  Ask Questions & Have Discussions.
        </p>
        <div className="mt-8">
          {/* Other content can go here */}
        </div>
    
        <SignIn />

       
      </div>
    </div>
  );
}
