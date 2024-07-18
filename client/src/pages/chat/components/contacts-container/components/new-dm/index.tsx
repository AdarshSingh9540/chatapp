import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../../../../components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../../../../components/ui/dialog";
import { apiClient } from "../../../../../../lib/api-client";
import { SEARCH_CONTACT_ROTES } from "../../../../../../utils/constant";
import { ScrollArea } from "../../../../../../components/ui/scroll-area";
import { Avatar } from "../../../../../../components/ui/avatar";
import { useAppStore } from "../../../../../../store";

// Define the Contact interface
interface Contact {
    _id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    image?: string;
    color?: string;
}

function NewDM() {
    const {setSelectedChatType,setSelectedChatData} =  useAppStore();
    const [searchContact, setSearchContact] = useState<Contact[]>([]);
    const [openNewContact, setOpenNewContact] = useState(false);

    const selectContact = async (searchTerm: string) => {
        try {
            if (searchTerm.length > 0) {
                const response = await apiClient.post(SEARCH_CONTACT_ROTES, { searchTerm }, { withCredentials: true });
                if (response.status === 200 && response.data.contacts) {
                    setSearchContact(response.data.contacts);
                }
            } else {
                setSearchContact([]);
            }
        } catch (err) {
            console.log({ err });
        }
    };

    const selectNewContact = (contact) =>{
        setOpenNewContact(false);
        setSelectedChatType("contact");
        setSelectedChatData(contact);
        console.log(contact)
        setSearchContact([]);

    }

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            onClick={() => {
                                setOpenNewContact(true);
                            }}
                            className="text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 transition-all duration-300"
                        />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
                        Select New Contact
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Dialog open={openNewContact} onOpenChange={setOpenNewContact}>
                <DialogTrigger></DialogTrigger>
                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Please select a contact</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <input
                            onChange={(e) => selectContact(e.target.value)}
                            type="text"
                            placeholder="Search Contacts"
                            className="rounded-lg w-full p-3 bg-[#2c2e3b] border-none"
                        />
                    </div>
                  {
                    searchContact.length>0 &&                     <ScrollArea className="h-[250px]">
                    <div className="flex flex-col gap-5">
                        {searchContact.map((contact) => (
                            <div key={contact._id} className="flex gap-3 items-center cursor-pointer"
                            onClick={() =>selectNewContact(contact)}
                            >
                                <div className="w-12 h-12 relative mr-1">
                                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                        {contact.image ? (
                                            <img src={contact.image} alt="avatar" className="h-full w-full object-cover" />
                                        ) : (
                                            <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center rounded-full justify-center ${contact.color}`}>
                                                {contact.firstName ? contact.firstName.charAt(0) : contact.email.charAt(0)}
                                            </div>
                                        )}
                                    </Avatar>
                                </div>
                                <div className="flex flex-col">
                                    <span>{contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : contact.email}</span>
                                    <span className="text-sm">{contact.email}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                  }
                    {searchContact.length <= 0 && (
                        <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center duration-1000 transition-all">
                            <div className="text-opacity-80 text-white flex flex-col gap-5 items-center lg:text-2xl text-xl mt-5 md:mt-0 lg:mt-0 transition-all duration-300 text-center">
                                <h3 className="font-serif">
                                    Hi <span className="text-purple-500">!</span> Search new
                                    <span className="text-purple-500"> Contact.</span>
                                </h3>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default NewDM;
