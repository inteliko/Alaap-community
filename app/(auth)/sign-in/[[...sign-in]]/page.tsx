import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
   
    <div>
        <h1 className='text-heading3-bold text-light-1 max-xs:hidden' >
           A Community for developer
        </h1>
         <SignIn />
         
    </div>
  ) ;

}