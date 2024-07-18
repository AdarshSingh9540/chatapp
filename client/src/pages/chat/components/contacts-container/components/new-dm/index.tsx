import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../../../../components/ui/tooltip"
import { FaPlus } from "react-icons/fa"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Divide } from "lucide-react";
  
function NewDM() {
    const [searchContact,setSearchContact] = useState([]);
 const [ openNewContact, setOpenNewContact] = useState(false);


    const selectContact = async(e)=>{

}   
 

  return (
    <>
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
        <FaPlus
       onClick={() =>{
        setOpenNewContact(true)
       }}
       className="text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 transition-all duration-300 "
        />
    </TooltipTrigger>
    <TooltipContent
    className="bg-[#1c1b1e] border-none mb-2 p-3 text-white"
    >
      Select New Contact
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

<Dialog open={openNewContact} onOpenChange={setOpenNewContact}>
  <DialogTrigger></DialogTrigger>
  <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
    <DialogHeader>
      <DialogTitle> please select a contact</DialogTitle>
      <DialogDescription>
       
      </DialogDescription>
    </DialogHeader>
    <div>
        <input
        onChange={e => selectContact(e.target.value)}
        type="text" placeholder="Search Contacts"  className="rounded-lg w-full p-3 bg-[#2c2e3b] border-none"/>
    </div>
    {
        searchContact.length<=0 && <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center  duration-1000 transition-all">
        <div className="text-opacity-80 text-white flex flex-col gap-5 items-center lg:text-2xl text-xl mt-5 transition-all duration-300 text-center">
            <h3 className="font-serif">
                Hi <span className="text-purple-500">!</span>Search new
                <span className="text-purple-500">Contact.</span> 
               
            </h3>
        </div>
    </div> 
    }
  </DialogContent>
</Dialog>


    </>
  )
}

export default NewDM